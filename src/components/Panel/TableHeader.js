import React from "react";

function TableHeader() {
  return (
    <div className="table-cap row">
      <div className="td number">№</div>
      <div className="td name"> Параметр</div>
      <div className="td nominal">Номинал</div>
      <div className="td rangePlus">Допуск +</div>
      <div className="td rangeMinus">Допуск -</div>
      <div className="td measure">Измеренное</div>
      <div className="td deviance">Отклонение</div>
      <div className="td status">Годность</div>
    </div>
  );
}

export default TableHeader;
