import React from 'react';
import Dropzone from "./components/Dropzone";
import Panel from "./components/Panel/Wrapper";

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      file: null,
    };

    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange (file) {
    this.setState({
      file: file,
    });
  }

  render () {
    return (
      <div className="page">
        {this.state.file ? <Panel file={this.state.file} /> : <Dropzone onFileChange={this.handleFileChange} />}
      </div>
    );
  }
}

export default App;
