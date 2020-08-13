import React from 'react';

class Dropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleChooseFile () {
    document.getElementById('file-input').click();
  }

  handleFileClick (event) {
    event.stopPropagation();
  }

  handleFileChange (event) {
    this.props.onFileChange(event.target.files[0])
  }

  render() {
    return (
      <div id="dropzone" onClick={this.handleChooseFile} onDrop={event => this.props.onFileChange(event.dataTransfer.files[0])}>
        <span className="b-span dd">СЮДА ПЕРЕТАЩИ</span>
        <span className="s-span">или жмякни</span>
        <input type="file" id="file-input" onClick={this.handleFileClick} onChange={this.handleFileChange} />
      </div>
    );
  }
}

export default Dropzone;
