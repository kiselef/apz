/**
 * Vendor business logic.
 */
export default class ProtocolReader {
  constructor(text) {
    this.splitObjectsParams = [];
    // перед пушем в массив делать валидацию строки, чтобы в конечный результат не попадали невалидные строки
    // либо невалидные строки выводить внизу или в скрывающемся слое
    this.prepare(text).forEach(item => this.splitObjectsParams.push(this.createRow(item)));
  }

  get rows () {
    return this.splitObjectsParams;
  }

  prepare (text) {
    return text.split('Параметр')
      .filter((item , index) => index !== 0)
      .map(item => item.split('\n')
      .filter(item => item !== 0)
      .filter(item => item.match(/№/) || item.match(/-?\d\d?.\d\d\d/))
      .join(' '));
  }

  createRow (arrayOfParsedData) {
    let row = {};
    let stringWithNumberPlusStatus = arrayOfParsedData.match(/( (-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(\w+|[а-я/*]+)\s+((НЕ.+ГОДЕН)||(ГОДЕН))*)|(Н*Е*\s+ГОДЕН)/ui);
    row.number = Number(arrayOfParsedData.match(/№(\s+)*\d+/g)[0].match(/\d+/g)[0]);
    row.name = arrayOfParsedData.match(/( ')\s*.+\s*(' )/)[0].match(/[^']/g).join('').trim();
    row.nominal = stringWithNumberPlusStatus[2]||'';
    row.rangePlus = Number(stringWithNumberPlusStatus[3])||'';
    row.rangeMinus = Number(stringWithNumberPlusStatus[4])||'';
    row.measure = Number(stringWithNumberPlusStatus[5])||'';
    row.deviance = stringWithNumberPlusStatus[6]||'';
    row.pointMeasurment = stringWithNumberPlusStatus[7]||'';
    row.status = stringWithNumberPlusStatus[8]||stringWithNumberPlusStatus[11]||'см.ниже';
    row.percent = this.getPercent(row.deviance, row.rangePlus, row.rangeMinus, row.status);
    row.visible = true;

    return row;
  }

  // TODO: пока будет тут, но что-то нужно сделать
  getPercent (dev, plus , minus, status) {
    if (!dev) {
      return /не/ig.test(status) ?  100 : 0;
    }
    dev = +dev;
    minus = +minus;
    plus = +plus;
    return Math.floor(dev >= 0 ? dev/plus*100 : dev/minus*100);
  }

  validate () {
    console.group('Проверяется следующий массив объектов параметров');
    console.log(this.splitObjectsParams);
    let error = [];
    const validationScheme = {
      number: 'number',
      name: 'string',
      nominal: 'string',
      rangePlus: 'number',
      rangeMinus: 'number',
      measure: 'number',
    };

    this.splitObjectsParams.forEach(item => {
      for (let fieldName in validationScheme) {
        if (typeof item[fieldName] !== validationScheme[fieldName]) {
          error.push(`#${item.number} ${fieldName} ${item[fieldName]}`);
          break;
        }
      }
    });

    const isSuccess = error.length === 0;
    console.log(isSuccess ? 'Well done!! Protocol split of parametrs is good!' : `bad and sad (error: ${JSON.stringify(error)})`);

    return isSuccess;
  }
}
