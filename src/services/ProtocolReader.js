export default class ProtocolReader {
  constructor(text) {
    this.splitObjectsParams = [];
    // перед пушем в массив делать валидацию строки, чтобы в конечный результат не попадали невалидные строки
    // либо невалидные строки выводить внизу или в скрывающемся слое
    this.prepare(text).forEach(item => this.splitObjectsParams.push(this.createObjectParameter(item)));
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

  createObjectParameter (arrayItem) {
    let objectParametr = {};
    let stringWithNumberPlusStatus = arrayItem.match(/( (-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(\w+|[а-я/*]+)\s+((НЕ.+ГОДЕН)||(ГОДЕН))*)|(Н*Е*\s+ГОДЕН)/ui);
    objectParametr.number = Number(arrayItem.match(/№(\s+)*\d+/g)[0].match(/\d+/g)[0]);
    objectParametr.name = arrayItem.match(/( ')\s*.+\s*(' )/)[0].match(/[^']/g).join('').trim();
    objectParametr.nominal = stringWithNumberPlusStatus[2]||'';
    objectParametr.rangePlus = Number(stringWithNumberPlusStatus[3])||'';
    objectParametr.rangeMinus = Number(stringWithNumberPlusStatus[4])||'';
    objectParametr.measure = Number(stringWithNumberPlusStatus[5])||'';
    objectParametr.deviance = stringWithNumberPlusStatus[6]||'';
    objectParametr.pointMeasurment = stringWithNumberPlusStatus[7]||'';
    objectParametr.status = stringWithNumberPlusStatus[8]||stringWithNumberPlusStatus[11]||'см.ниже';
    objectParametr.percent = this.getPercent(objectParametr.deviance, objectParametr.rangePlus, objectParametr.rangeMinus, objectParametr.status);
    objectParametr.visible = true;

    return objectParametr;
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
