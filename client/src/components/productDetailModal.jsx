import React from 'react';
import {Popover, Tooltip, OverlayTrigger, Button, Modal} from 'react-bootstrap';
import ProductDetail from './productDetail';

class ProductDetailModal extends React.Component {
  constructor(props){
    super(props);
    this.state = { showModal: false };
  }

  close(){
    this.setState({ showModal: false });
    this.props.resetBuyMsg();
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
          Buy Now!
        </Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Item Checkout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProductDetail item={this.props.items}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};



export default ProductDetailModal;
