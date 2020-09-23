import React from 'react';
import PropTypes from 'prop-types';

import { motion } from "framer-motion";


export class FadeInImage extends React.PureComponent {
  static propTypes = {
    animateInitial : PropTypes.object,
    animateEntrance: PropTypes.object
  };

  constructor(props){
    super(props);

    this.state = {
      visible: false,
    };
  };

  _handleImageOnLoad = () => {
    this.setState({
      visible: true
    });
  };

  render(){
    const { animateInitial, animateEntrance, ...props } = this.props;
    const { visible } = this.state;

    const variants = {
      hidden: {
        opacity: 0,
        ...animateInitial,
      },
      visible: {
        opacity: 1,
        ...animateEntrance,
      },
    };

    return(
      <motion.img
        initial={'hidden'}
        animate={visible? 'visible' : 'hidden'}
        onLoad={this._handleImageOnLoad}
        {...{variants}}
        {...props}
      />
    );
  };
};