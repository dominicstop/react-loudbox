import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import { motion, AnimatePresence } from "framer-motion"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import * as Colors from 'constants/Colors';

export const ICON_KEYS = {
  active  : 'active'  ,
  inactive: 'inactive',
};

const INPUT_STATE = {
  ERROR  : 'ERROR'  ,
  INITIAL: 'INITIAL',
  BLURRED: 'BLURRED',
  FOCUSED: 'FOCUSED',
  LOADING: 'LOADING',
};

const VARIANTS = {
  inputContainer: {
    [INPUT_STATE.ERROR]: {
      borderColor: Colors.RED[900]
    },
    [INPUT_STATE.INITIAL]: {
      borderColor: Colors.BLACK[500]
    },
    [INPUT_STATE.BLURRED]: {
      borderColor: Colors.BLACK[500]
    },
    [INPUT_STATE.FOCUSED]: {
      borderColor: Colors.BLACK[900]
    },
    [INPUT_STATE.LOADING]: {
      borderColor: Colors.BLACK[500]
    },
  },
  errorContainer: {
    hidden: {
      height : 0,
      opacity: 0,
      y      : 5,
    },
    visible: {
      height : 'auto',
      opacity: 1,
      y      : 0,
    },
  },
};

export class FormInputIcon extends React.Component {
  static propTypes = {
    iconmap: PropTypes.object,
  }; 

  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 25,
    },
    inputContainer: {
      display: 'flex',
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'row',
      padding: 2,
      outline: 'none',
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 5,
      borderStyle: 'solid',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 25,
      marginLeft: 10,
    },
    iconMotion: {
      display: 'flex',
      position: 'absolute',
    },
    icon: {
      display: 'flex',
      height: 'auto',
      width: 20,
    },
    input: {
      flex: 1,
      borderColor: 'transparent',
      outline: 'none',
      padding: '8px 10px',
      backgroundColor: 'transparent !important'
    },
    errorContainer: {
      marginTop: 7,
    },
  });

  constructor(props){
    super(props);

    this.state = {
      initial  : true ,
      isFocused: false,
    };
  };

  shouldComponentUpdate(nextProps, nextState){
    const prevProps = this.props;
    const prevState = this.state;

    return (
      prevProps.initial   != nextProps.initial ||
      prevState.isFocused != prevState.isFocused 
    );


  };

  deriveStateFromProps(){
    const props = this.props;
    const state = this.state;
    
    const temp = (
      props.isLoading ? INPUT_STATE.LOADING :
      state.initial   ? INPUT_STATE.INITIAL :
      state.isFocused ? INPUT_STATE.FOCUSED : 
      props.error     ? INPUT_STATE.ERROR   : INPUT_STATE.BLURRED
    );

    console.log(`id: ${props.id}` , {
      inputState : temp           ,
      isLoading  : props.isLoading,
      touched    : props.touched  ,
      error      : props.error    ,
    });


    return temp;
  };

  deriveValuesFromState(){
    const inputState = this.deriveStateFromProps();
    
    switch (inputState) {
      case INPUT_STATE.ERROR: return {
        iconColor: Colors.RED[900],
      };
      case INPUT_STATE.BLURRED: return {
        iconColor: Colors.GREY[500],
      };
      case INPUT_STATE.INITIAL: return {
        iconColor: Colors.GREY[500],
      };
      case INPUT_STATE.FOCUSED: return {
        iconColor: Colors.GREY[900],
      };
      case INPUT_STATE.LOADING: return {
        iconColor: Colors.GREY[500],
      };
    };
  };

  _handleFieldOnFocus = (params) => {
    const { initial } = this.state;

    this.setState({
      isFocused: true,
      ...(initial && { initial: false })
    });

    const { onFocus } = this.props;
    onFocus && onFocus(params)
  };

  _handleFieldOnBlur = (params) => {
    this.setState({ isFocused: false });

    const { onBlur } = this.props;
    onBlur && onBlur(params)
  };

  _renderFormIcon(){
    const { styles } = FormInputIcon;
    const { isFocused } = this.state;
    const { iconmap } = this.props;

    const inputState = this.deriveStateFromProps();
    const { iconColor } = this.deriveValuesFromState();

    const sharedIconProps = {
      className: css(styles.icon),
      fill     : iconColor,
      stroke   : iconColor,
    };

    const iconActive   = React.cloneElement(iconmap[ICON_KEYS.active  ], sharedIconProps);
    const iconInactive = React.cloneElement(iconmap[ICON_KEYS.inactive], sharedIconProps);

    return(
      <div className={css(styles.iconContainer)}>
        <motion.div
          className={css(styles.iconMotion)}
          animate={{ opacity: isFocused ? 1 : 0 }}
          initial={false}
        >
          {iconActive}
        </motion.div>
        <motion.div
          className={css(styles.iconMotion)}
          animate={{ opacity: isFocused ? 0 : 1 }}
          initial={true}
        >
          {iconInactive}
        </motion.div>
      </div>
    );
  };

  render(){
    const { styles } = FormInputIcon;
    const { isFocused } = this.state;
    const { isLoading, ...props } = this.props;

    const inputState = this.deriveStateFromProps();

    const hasError = (inputState == INPUT_STATE.ERROR);

    return(
      <div className={css(styles.rootContainer)}>
        {false && (
          <div>
            <p>{inputState}</p>
            <p>{`isFocused: ${isFocused} \ntouched: ${props.touched}} \n initial : ${this.state.initial}`}</p>
          </div>
        )}
        <motion.div 
          className={css(styles.inputContainer)}
          variants={VARIANTS.inputContainer}
          animate={inputState}
          transition={{ duration: 0.3 }}
        >
          {this._renderFormIcon()}
          <Field {...props}
            className={css(styles.input)}
            onFocus={this._handleFieldOnFocus}
            onBlur={this._handleFieldOnBlur}
          />
        </motion.div>
        <motion.div
          animate={hasError? 'visible' : 'hidden'}
          variants={VARIANTS.errorContainer}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
          className={css(styles.errorContainer)}
        >
          <ErrorMessage name={props.name}/>
        </motion.div>
      </div>
    );
  };
};

