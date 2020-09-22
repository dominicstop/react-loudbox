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
      borderColor: Colors.BLACK[400],
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

/** component that renders formik field with an animated left svg icon.*/
export class FormInputIcon extends React.Component {
  static propTypes = {
    iconmap    : PropTypes.object,
    bottomSpace: PropTypes.number,
    error      : PropTypes.oneOf([
      PropTypes.bool  , // trigger error color only
      PropTypes.string, // trigger error color + message
    ]),
  }; 

  static defaultProps = {
    bottomSpace: 30,
  };

  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
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
      padding: '5px 10px 5px 10px',
      backgroundColor: 'transparent !important',
      fontSize: 16,
    },
    inputIconSpace: {
      paddingLeft: 35,
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

  // based on the current props/state, return a INPUT_MODE value
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
      iconLoadedActive  : false,
      iconLoadedInactive: false,
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
      (prevProps.error     != nextProps.error    ) ||
      (prevState.initial   != nextState.initial  ) ||
      (prevState.isFocused != nextState.isFocused) ||
      (prevState.iconLoadedActive   != nextState.iconLoadedActive  ) ||
      (prevState.iconLoadedInactive != nextState.iconLoadedInactive)
    );
  };

  deriveModeFromProps(){
    return FormInputIcon.deriveModeFrom({
      props: this.props,
      state: this.state,
    });
  };

  // return values based on the current INPUT_MODE
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
        iconColor: Colors.GREY[500],
      };
      case INPUT_MODE.FOCUSED: return {
        iconColor: Colors.GREY[900],
      };
      case INPUT_MODE.LOADING: return {
        iconColor: Colors.GREY[500],
      };
    };
  };

  // check if icons were provided
  hasIcons(){
    const { iconmap } = this.props;
    if(!iconmap) return false;

    return(
      iconmap[ICON_KEYS.active  ] &&
      iconmap[ICON_KEYS.inactive]
    );
  };

  // input received focus
  _handleFieldOnFocus = (params) => {
    const { initial } = this.state;

    this.setState({
      isFocused: true,
      ...(initial && { initial: false })
    });

    const { onFocus } = this.props;
    onFocus && onFocus(params)
  };

  // input lost focus
  _handleFieldOnBlur = (params) => {
    this.setState({ isFocused: false });

    const { onBlur } = this.props;
    onBlur && onBlur(params)
  };

  // the animated icon on the left of the input
  _renderFormIcon(){
    const { styles } = FormInputIcon;
    const { iconmap } = this.props;
    const { isFocused, ...state } = this.state;

    // guard: dont render if no icons
    if(!this.hasIcons()) return null;

    const { iconColor } = this.deriveValuesFromMode();
    const sharedIconProps = {
      className: css(styles.icon),
      fill     : iconColor,
      stroke   : iconColor,
    };

    const iconsLoaded = (
      state.iconLoadedInactive &&
      state.iconLoadedActive
    );

    const animations = {
      inactive: {
        opacity: (
          !iconsLoaded? 0 : 
          isFocused   ? 0 : 1
        ),
      },
      active: {
        opacity: (
          !iconsLoaded? 0 : 
          isFocused   ? 1 : 0
        ),
      },
    };

    const activeIcon = React.cloneElement(iconmap[ICON_KEYS.active], {
      ...sharedIconProps,
      onLoad: () => { this.setState({ iconLoadedActive: true }) }
    });

    const inactiveIcon = React.cloneElement(iconmap[ICON_KEYS.inactive], {
      ...sharedIconProps,
      onLoad: () => { this.setState({ iconLoadedInactive: true }) }
    });

    return(
      <div className={css(styles.iconContainer)}>
        <motion.div
          className={css(styles.iconMotion)}
          animate={animations.active}
          initial={false}
        >
          {activeIcon}
        </motion.div>
        <motion.div
          className={css(styles.iconMotion)}
          animate={animations.inactive}
          initial={{ opacity: 0 }}
        >
          {inactiveIcon}
        </motion.div>
      </div>
    );
  };

  render(){
    const { styles } = FormInputIcon;
    const { isLoading, bottomSpace, ...props } = this.props;

    const hasIcons   = this.hasIcons();
    const inputState = this.deriveModeFromProps();

    // check if there's an error and check if the error has a msg
    const hasError     = (inputState == INPUT_MODE.ERROR);
    const hasErrorText = (hasError && (typeof props.error === 'string'));

    return(
      <div 
        className={css(styles.rootContainer)}
        style={{marginBottom: bottomSpace}}
      >
        {false && ( // debug
          <div>
            <p>{inputState}</p>
            <p>{`error: ${props.error} \hasError: ${hasError}} \n hasErrorText : ${hasErrorText}`}</p>
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
            className={css(styles.input, hasIcons && styles.inputIconSpace)}
            onFocus={this._handleFieldOnFocus}
            onBlur={this._handleFieldOnBlur}
          />
        </motion.div>
        <motion.div
          className={css(styles.errorContainer)}
          initial={'hidden'}
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

