import React from 'react';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      gradation: 0,
    };

    this.handleChangeGradation = this.handleChangeGradation.bind(this)
    this.handleChangeGradationByRange = this.handleChangeGradationByRange.bind(this)
  }

  handleChangeGradation (event) {
    const { value } = event.target;
    this.setState({
      gradation: value
    });

    this.props.onChangeGradation(value);
  }

  handleChangeGradationByRange (event) {
    document.querySelectorAll('input[type=radio]').forEach(item => item.checked = false)
    this.handleChangeGradation(event);
  }

  render () {
    return (
      <div className="panel">
        <div className="polzunok">
          <input name="gradation" type="range" max="100" min="0" value={this.state.gradation} onChange={this.handleChangeGradationByRange} />
        </div>
        <div className="box-gradation">
          <div className="bg-td"><label><input type="radio" name="gradation" value="0" onChange={this.handleChangeGradation}/>I</label></div>
          <div className="bg-td"><label><input type="radio" name="gradation" value="20" onChange={this.handleChangeGradation}/>II</label></div>
          <div className="bg-td"><label><input type="radio" name="gradation" value="40" onChange={this.handleChangeGradation}/>III</label></div>
          <div className="bg-td"><label><input type="radio" name="gradation" value="60" onChange={this.handleChangeGradation}/>IV</label></div>
          <div className="bg-td"><label><input type="radio" name="gradation" value="80" onChange={this.handleChangeGradation}/>V</label></div>
        </div>
      </div>
    );
  }
}

export default Header;
