import React from "react";

function TableRow(props) {
  const {
    number,
    name,
    nominal,
    rangePlus,
    rangeMinus,
    measure,
    deviance,
    status,
    percent,
    visible
  } = props.row;

  function detectedColor(dev, percent, status) {
    dev = +dev;
    let hue = /ГОДЕН/ig.test(status) ?  `140` : `0`;
    if (dev) {
      hue = dev >= 0 ? 140-percent*120/100 : 140-percent*120/100;
    }
    return `hsla(${hue}, 100% , 40%, .4)`;
  }

  return (
    <div className="row" style={{backgroundColor: detectedColor(deviance, percent, status), display: visible ? 'grid' : 'none'}}>
      <div className="td number" title={`Номер : ${number}`}>{number}</div>
      <div className="td name" title={`Имя : ${name}`}>{name}</div>
      <div className="td nominal" title={`Номинал : ${nominal}`}>{nominal}</div>
      <div className="td rangePlus" title={`Допуск в плюс : ${rangePlus}`}>{rangePlus}</div>
      <div className="td rangeMinus" title={`Допуск в минус : ${rangeMinus}`}>{rangeMinus}</div>
      <div className="td measure" title={`Измеренное значение : ${measure}`}>{measure}</div>
      <div className="td deviance" title={`Отклонение : ${deviance}`}>{deviance}</div>
      <div className="td status" title={`Годность : ${status}`}>{status}</div>
    </div>
  );
}

export default TableRow;
