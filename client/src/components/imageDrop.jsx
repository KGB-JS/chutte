var React = require('react');
var Dropzone = require('react-dropzone');

export default class DropzoneDemo extends React.Component{
    onDrop(files) {
      console.log('Received files: ', files);
    }

    render() {
      return (
          <div>
            <Dropzone onDrop={this.onDrop} width={150} height={100}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
      );
    }
};

