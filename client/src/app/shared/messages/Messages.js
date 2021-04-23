import React from "react";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageClass: null,
      messageText: null
    };
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.messageType !== this.props.messageType) || (prevProps.messageText !== this.props.messageText)) {
      switch (this.props.messageType) {          
        case 'success':
          this.setState({
            messageClass: "alert alert-success",
            messageText: this.props.messageText
          })
          break;
        case 'error':
          this.setState({
            messageClass: "alert alert-danger",
            messageText: this.props.messageText
          })
          break;
        default:
          this.setState({
            messageClass: null,
            messageText: null
          })
      }      
    }
  }

  render() {
    return ( 
        <div className = {this.state.messageClass} > {this.state.messageText} </div>
    )
  }
}
export default Messages;