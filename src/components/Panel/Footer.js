import React from 'react';

class Footer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      rangeFrom: '',
      rangeTo: '',
      number: '',
    };

    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeRange = this.handleChangeRange.bind(this);
  }

  handleChangeNumber (event) {
    this.setState({
      rangeFrom: '',
      rangeTo: '',
    });

    const value = +event.target.value;
    this.setState({number: value});
    this.props.onChangeNumber(value);
  }

  handleChangeRange (event) {
    this.setState({number: ''});

    const {name, value} = event.target;
    this.setState({
      [name]: value
    });

    const oppositeName = this.getOppositeRangeName(name);
    this.props.onChangeRange({
      [name]: value,
      [oppositeName]: this.state[oppositeName]
    });
  }

  getOppositeRangeName (name) {
    return name === 'rangeFrom' ? 'rangeTo' : 'rangeFrom';
  }

  render() {
    return (
      <div className="footer">
        <div className="cap">Поиск</div>
        <label>Найти параметр:
          <input type="number" value={this.state.number} onChange={this.handleChangeNumber}/>
        </label>
        <span>
            <label>Найти диапазон параметров:
                <input type="number" value={this.state.rangeFrom} name="rangeFrom" onChange={this.handleChangeRange}/>
            </label>
                 -
            <input type="number" value={this.state.rangeTo} name="rangeTo" onChange={this.handleChangeRange}/>
        </span>
      </div>
    );
  }
}

export default Footer;
