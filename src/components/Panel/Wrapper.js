import React from 'react';
import Header from "./Header";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Footer from "./Footer";
import ProtocolReader from "../../services/ProtocolReader";

class Wrapper extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      rows: [],
    };

    this.handleChangeGradation = this.handleChangeGradation.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeRange = this.handleChangeRange.bind(this);
  }

  handleChangeGradation (minPercent) {
    const newRows = this.state.rows.map(row => {
      row.visible = row.percent >= minPercent;
      return row;
    });

    this.setState({
      rows: newRows
    });
  }

  handleChangeNumber (number) {
    const showAll = number === 0;
    const newRows = this.state.rows.map(row => {
      row.visible = showAll || row.number === number;
      return row;
    });

    this.setState({
      rows: newRows
    });
  }

  handleChangeRange (range) {
    const rangeFrom = +range.rangeFrom;
    const rangeTo = +range.rangeTo;
    const rangeToBiggerRangeFrom = rangeTo > rangeFrom;

    function withRangeTo (number) {
      return rangeToBiggerRangeFrom ? number <= rangeTo : true;
    }

    const newRows = this.state.rows.map(row => {
      row.visible = row.number >= rangeFrom && withRangeTo(row.number);
      return row;
    });

    this.setState({
      rows: newRows
    });
  }

  componentDidMount () {
    // эту обработку, вероятно, отсюда вытащить выше, а во wrapper передавать готовые строки?
    const fReader = new FileReader();
    fReader.readAsText(this.props.file , 'windows-1251');
    fReader.onload = () => {
      const pReader = new ProtocolReader(fReader.result);
      this.setState({rows: pReader.rows});
    };
  }

  render () {
    return (
      <div className="table">
        <Header onChangeGradation={this.handleChangeGradation}/>
        <TableHeader/>
        <TableBody rows={this.state.rows}/>
        <Footer onChangeNumber={this.handleChangeNumber} onChangeRange={this.handleChangeRange}/>
      </div>
    );
  }
}

export default Wrapper;
