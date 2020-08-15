import React from 'react';

function Dropzone (props) {
  function handleChooseFile () {
    document.getElementById('file-input').click();
  }

  function handleFileClick (event) {
    event.stopPropagation();
  }

  function handleFileChange (event) {
    props.onFileChange(event.target.files[0])
  }

  function handleDrop (event) {
    event.preventDefault();
    event.stopPropagation();
    
    props.onFileChange(event.dataTransfer.files[0]);
  }

  return (
    <div id="dropzone" onClick={handleChooseFile} onDragOver={handleDrop} onDrop={handleDrop}>
      <span className="b-span dd">СЮДА ПЕРЕТАЩИ</span>
      <span className="s-span">или жмякни</span>
      <input type="file" id="file-input" onClick={handleFileClick} onChange={handleFileChange} />
    </div>
  );
}

export default Dropzone;
