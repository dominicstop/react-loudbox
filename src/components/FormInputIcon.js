import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import { motion } from "framer-motion"
import { Field } from 'formik';
import { IoIosAlert } from "react-icons/io";

import * as Colors from 'constants/Colors';

//#region --- Constants 
/** enum property keys for iconmap prop
* @readonly
* @enum {string}
*/
export const ICON_KEYS = {
  /** Icon when in focus */ active  : 'active'  ,
  /** Icon when blurred  */ inactive: 'inactive',
};

/** state machine enums for input
* @readonly
* @enum {string}
*/
const INPUT_MODE = {
  /** Input error/invalid */ ERROR  : 'ERROR'  ,
  /** No Interactions yet */ INITIAL: 'INITIAL',
  /** Input not in focus  */ BLURRED: 'BLURRED',
  /** Input is focused    */ FOCUSED: 'FOCUSED',
  /** The form is loading */ LOADING: 'LOADING',
};

// framer motion animation keyframes/state
const VARIANTS = {
  inputContainer: {
    [INPUT_MODE.ERROR]: {
      borderColor: Colors.RED[900],
      backgroundColor: Colors.RED[50],
    },
    [INPUT_MODE.INITIAL]: {
      borderColor: Colors.BLACK[500],
      backgroundColor: 'white',
    },
    [INPUT_MODE.BLURRED]: {
      borderColor: Colors.BLUE[500],
      backgroundColor: Colors.BLUE[50],
    },
    [INPUT_MODE.FOCUSED]: {
      borderColor: Colors.BLACK[900],
      backgroundColor: 'white',
    },
    [INPUT_MODE.LOADING]: {
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

//#endregion 

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

  static deriveModeFrom({props, state}){
    return (
      props.isLoading ? INPUT_MODE.LOADING :
      state.initial   ? INPUT_MODE.INITIAL :
      state.isFocused ? INPUT_MODE.FOCUSED : 
      props.error     ? INPUT_MODE.ERROR   : INPUT_MODE.BLURRED
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

    const prevInputState = FormInputIcon.deriveModeFrom({props: prevProps, state: prevState});
    const nextInputState = FormInputIcon.deriveModeFrom({props: nextProps, state: nextState});

    return (
      (prevInputState      != nextInputState     ) ||
      (prevProps.value     != nextProps.value    ) ||
      (prevState.initial   != nextState.initial  ) ||
      (prevState.isFocused != nextState.isFocused) 
    );
  };

  deriveModeFromProps(){
    return FormInputIcon.deriveModeFrom({
      props: this.props,
      state: this.state,
    });
  };

  deriveValuesFromMode(){
    const inputState = this.deriveModeFromProps();
    
    switch (inputState) {
      case INPUT_MODE.ERROR: return {
        iconColor: Colors.RED[900],
      };
      case INPUT_MODE.BLURRED: return {
        iconColor: Colors.BLUE[500],
      };
      case INPUT_MODE.INITIAL: return {
        iconColor: Colors.GREY[700],
      };
      case INPUT_MODE.FOCUSED: return {
        iconColor: Colors.GREY[900],
      };
      case INPUT_MODE.LOADING: return {
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

  // the animated icon on the left of the input
  _renderFormIcon(){
    const { styles } = FormInputIcon;
    const { isFocused } = this.state;
    const { iconmap } = this.props;

    const { iconColor } = this.deriveValuesFromMode();

    const sharedIconProps = {
      className: css(styles.icon),
      fill     : iconColor,
      stroke   : iconColor,
    };

    // inject props to the svg icons
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

    const inputState = this.deriveModeFromProps();

    const hasError     = (inputState == INPUT_MODE.ERROR);
    const hasErrorText = (hasError && (typeof error === 'string'));

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
          animate={hasErrorText? 'visible' : 'hidden'}
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

