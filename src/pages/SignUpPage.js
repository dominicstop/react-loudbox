import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls, AnimatePresence } from "framer-motion";
import { Typography, Box, Button, CircularProgress, Link } from '@material-ui/core';
import Scrollbar from 'react-scrollbars-custom';


import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { FormInputIcon, ICON_KEYS } from 'components/FormInputIcon';
import { FadeInImage } from 'components/FadeInImage';

import { login } from 'api/Auth';
import { ROUTES } from 'constants/Routes';

import loginBG     from 'assests/images/login-cover.jpg';
import signupBG    from 'assests/images/register-cover.jpg';
import loudboxLogo from 'assests/svg/loudbox-logo.svg';

import * as Helpers      from 'functions/helpers';
import * as Colors       from 'constants/Colors';
import * as FramerValues from 'constants/FramerValues';
import { SignUpForm } from 'forms/SIgnUpForm';


export default class SignUpPage extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    },
    leftImageContainer: {
      display: 'none',
      overflow: 'hidden',
      position: 'relative',
      // show the right image container if there's enough space
      '@media (min-width: 750px) and (max-width: 1250px)': {
        flex: 1,
        display: 'flex'
      },
      '@media (min-width: 1250px)': {
        flex: 1.5,
        display: 'flex'
      },
    },
    leftImage: {
      width: '100%',
      height: '100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'norepeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${signupBG})`,
    },
    leftImagePrev: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundPosition: 'center',
      backgroundRepeat: 'norepeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${loginBG})`,
    },
    logo: {
      height: 48,
      width: 'auto',
    },
    formTitle: {
      fontWeight: 600,
      fontSize: 28,
      marginBottom: 40,
    },
    rightFormContainer: {
      flex: 1,
      display: 'flex',
      backgroundColor: 'white',
    },
    formWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 80,
      paddingBottom: 100,
    },
    formContainer: {
      width: '320px',
      paddingLeft: 30,
      paddingRight: 30,
    },
    
  });

  constructor(props){
    super(props);

    // get props from prev page
    const { fromPath } = props.location.state;

    this.state = {
      isLoginPrevPath: (fromPath == ROUTES.LOGIN),
      mountLeftImage: false,
    };

    // workaround to use `useAnimation` in class comps
    this.animationContolsImagePrev   = new AnimationControls();
    this.animationContolsFormWrapper = new AnimationControls();
  };

  componentDidMount = async () => {
    this.animationContolsImagePrev    .mount();
    this.animationContolsFormWrapper.mount();

    // start entrance animation for left form
    this.animationContolsFormWrapper.start('visible');

    const { location, history } = this.props;
    const { isLoginPrevPath   } = this.state;

    // clear fromPath from router so the animation does not trigger on reload
    history.replace(location.pathname, { fromPath: null });

    // wait for the cover image to load first
    await SignUpHelpers.preloadSignupBG();
    // then show the cover image
    this.setState({ mountLeftImage: true });

    if(isLoginPrevPath){
      // if the prev image is still mounted, remove it
      SignUpHelpers.removePrevImage();

      // since login was the prev path, we are trans. so hide the prev image 
      this.animationContolsImagePrev.start({
        opacity: 0,
        transition: { duration: 3 },
      });
    };
  };

  componentWillUnmount(){
    this.animationContolsImagePrev  .unmount();
    this.animationContolsFormWrapper.unmount();
  };

  _handleFormikOnSubmit = () => {
    alert();
  };

  render(){
    const { styles } = SignUpPage;
    const state = this.state;

    const leftImageProps = (state.isLoginPrevPath? {
      initial: 'hiddenTrans',
      animate: 'visibleTrans'
    }:{
      initial: 'hidden',
      animate: 'visible'
    });

    return(
      <motion.div className={css(styles.rootContainer)}>
        <motion.div 
          ref={r => this.leftImageContainer = r}
          className={css(styles.leftImageContainer)}
        >
          {(state.mountLeftImage) && (
            <motion.div 
              className={css(styles.leftImage)}
              variants={VARIANTS.leftImage}
              {...leftImageProps}
            />
          )}
          {state.isLoginPrevPath && (
            <motion.div 
              animate={this.animationContolsImagePrev}
              className={css(styles.leftImagePrev)}
            />
          )}
        </motion.div>
          <Scrollbar className={css(styles.rightFormContainer)}>
            <motion.div  
              className={css(styles.formWrapper)}
              variants={VARIANTS.formContainer}
              animate={this.animationContolsFormWrapper}
              initial={"hidden"}
            >
              <FadeInImage
                className={css(styles.logo)}
                src={loudboxLogo} 
                alt={"LoudBox Logo"}
              />
              <h1 className={css(styles.formTitle)}>
                {'Create an Account'}
              </h1>
              <motion.div 
                className={css(styles.formContainer)}
              >
                <SignUpForm
                  onFormSubmit={this._handleFormikOnSubmit}
                  //{...{validationSchema}}
                />
              </motion.div>
            </motion.div>
          </Scrollbar>
      </motion.div>
    );
  };
};

//#region - Constants & Helpers
const VARIANTS = {
  leftImage: {
    hiddenTrans: {
      opacity: 0,
    },
    visibleTrans: {
      opacity: 1,
      transition: { duration: 3 },
    },
    hidden: {
      x: -100, 
      opacity: 0,
      scale: 1.25,
      WebkitFilter: 'blur(7px)',
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      WebkitFilter: 'blur(0px)',
      transition: { ease: "easeInOut", duration: 2 },
    },
  },
  formContainer: {
    hidden: { 
      y: 50,
      opacity: 0,
      transition: { ease: 'easeInOut', duration: 0.3 },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: 'easeInOut', duration: 0.5, delay: 0.5 },
    },
  },
};

class SignUpHelpers {
  static preloadSignupBG(){
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.src = require('assests/images/register-cover.jpg');
      img.onload = () => resolve(img);
      img.onerror = reject;
    })
  };

  static removePrevImage(){
    const prevImage = document.getElementById('right-shared-element-image');
    prevImage && prevImage.remove();
  };
};
//#endregion