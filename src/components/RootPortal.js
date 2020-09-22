import React from 'react';
import ReactDOM from 'react-dom';


export const portalRoot = document.getElementById("root-portal");

export class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  };

  componentDidMount = () => {
    portalRoot.appendChild(this.el);
  };

  componentWillUnmount = () => {
    portalRoot.removeChild(this.el);
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  };
};