import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import { motion, AnimatePresence } from "framer-motion"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import { IoIosAlert } from "react-icons/io";

import * as Colors from 'constants/Colors';

export const ICON_KEYS = {
  active  : 'active'  ,
  inactive: 'inactive',
};

// state machine modes for input
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
      borderColor: Colors.RED[900],
      backgroundColor: Colors.RED[50],
    },
    [INPUT_STATE.INITIAL]: {
      borderColor: Colors.BLACK[500],
      backgroundColor: 'white',
    },
    [INPUT_STATE.BLURRED]: {
      borderColor: Colors.BLUE[500],
      backgroundColor: Colors.BLUE[50],
    },
    [INPUT_STATE.FOCUSED]: {
      borderColor: Colors.BLACK[900],
      backgroundColor: 'white',
    },
    [INPUT_STATE.LOADING]: {
      borderColor: Colors.BLACK[500],
      backgroundColor: 'white',
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
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 25,
      marginLeft: 5,
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
      padding: '5px 10px 5px 35px',
      backgroundColor: 'transparent !important'
    },
    errorContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 5,
    },
    errorIcon: {
      marginRight: 5,
      color: Colors.RED[400],
      fontSize: 17,
    },
    error: {
      flex: 1,
      textAlign: 'left',
      color: Colors.RED[900],
    },
  });

  static deriveStateFrom({props, state}){
    return (
      props.isLoading ? INPUT_STATE.LOADING :
      state.initial   ? INPUT_STATE.INITIAL :
      state.isFocused ? INPUT_STATE.FOCUSED : 
      props.error     ? INPUT_STATE.ERROR   : INPUT_STATE.BLURRED
    );
  };

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

    const prevFormState = FormInputIcon.deriveStateFrom({props: prevProps, state: prevState});
    const nextFormState = FormInputIcon.deriveStateFrom({props: nextProps, state: nextState});

    return (
      (prevFormState       != nextFormState      ) ||
      (prevProps.value     != nextProps.value    ) ||
      (prevState.initial   != nextState.initial  ) ||
      (prevState.isFocused != nextState.isFocused) 
    );
  };

  deriveStateFromProps(){
    return FormInputIcon.deriveStateFrom({
      props: this.props,
      state: this.state,
    });
  };

  deriveValuesFromState(){
    const inputState = this.deriveStateFromProps();
    
    switch (inputState) {
      case INPUT_STATE.ERROR: return {
        iconColor: Colors.RED[900],
      };
      case INPUT_STATE.BLURRED: return {
        iconColor: Colors.BLUE[500],
      };
      case INPUT_STATE.INITIAL: return {
        iconColor: Colors.GREY[700],
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
        {false && ( // debug
          <div>
            <p>{inputState}</p>
            <p>{`isFocused: ${isFocused} \ntouched: ${props.touched}} \n initial : ${this.state.initial}`}</p>
          </div>
        )}
        <motion.div 
          className={css(styles.inputContainer)}
          variants={VARIANTS.inputContainer}
          animate={inputState}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          {this._renderFormIcon()}
          <Field {...props}
            className={css(styles.input)}
            onFocus={this._handleFieldOnFocus}
            onBlur={this._handleFieldOnBlur}
          />
        </motion.div>
        <motion.div
          className={css(styles.errorContainer)}
          animate={hasError? 'visible' : 'hidden'}
          variants={VARIANTS.errorContainer}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
        >
          <IoIosAlert className={css(styles.errorIcon)}/>
          <label className={css(styles.error)}>
            {props.error}
          </label>
        </motion.div>
      </div>
    );
  };
};
