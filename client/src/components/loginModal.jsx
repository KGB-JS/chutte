import React from 'react';
import {Popover, Tooltip, OverlayTrigger, Button, Modal} from 'react-bootstrap';

class Trigger extends React.Component {
  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  close(){
    this.setState({ showModal: false });
  }

  open(){
    this.setState({ showModal: true });
  }

  render() {
    let popover = <Popover title="popover">PopOver</Popover>
    let tooltip = <Tooltip id="wow">wow</Tooltip>;

    return (
      <div>
        <Button bsStyle="primary"
          bsSize="large"
          onClick={this.open.bind(this)}>

          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>This is text</p>
            <p>This is text</p>
            <p>This is text</p>
            <p>This is text</p>
            <p>This is text</p>
            <p>This is text</p>
            <p>This is text</p>
            <p>This is text</p>
          
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default Trigger;
