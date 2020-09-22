import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls, AnimatePresence } from "framer-motion";
import { Typography, Box, Button, CircularProgress, Link } from '@material-ui/core';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { FormInputIcon, ICON_KEYS } from 'components/FormInputIcon';
import { login } from 'api/Auth';
import { ROUTES } from 'constants/Routes';

import loginBG     from 'assests/images/login-cover.jpg';
import signupBG    from 'assests/images/register-cover.jpg';
import loudboxLogo from 'assests/svg/loudbox-logo.svg';

import * as Helpers      from 'functions/helpers';
import * as Colors       from 'constants/Colors';
import * as FramerValues from 'constants/FramerValues';

class SignUpHelpers {
  static preloadSignupBG(){
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.src = require('assests/images/register-cover.jpg');
      img.onload = () => resolve(img);
      img.onerror = reject;
    })
  };
};

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
        flex: 2,
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
      height: '48px',
      width: 'auto',
      marginTop: 10,
      marginBottom: '32px',
    },
    rightFormContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 25,
    },
    formContainer: {
      height: 'auto',
      width: '320px',
      paddingTop: '64px',
      paddingBottom: '64px',
      textAlign: 'center',
      backgroundColor: 'white',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formInput: {
      borderRadius: 4,
      marginBottom: 15,
      padding: '10px 12px',
    },
    formButtonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    formErrorContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
    },
    formErrorIcon: {
      marginRight: 5,
      color: Colors.RED[400],
      fontSize: 17,
    },
    formError: {
      flex: 1,
      textAlign: 'left',
      color: Colors.RED[900],
    },
  });

  constructor(props){
    super(props);

    // get props from prev page
    const { fromPath } = props.location.state;

    this.state = {
      isLoginPrevPath: (fromPath == ROUTES.LOGIN),
    };

    // todo: remov
    console.log('location - construnctor', props.location);
    console.log('history', props.history);
    console.log('isLoginPrevPath: ', (fromPath == ROUTES.LOGIN));

    // workaround to use `useAnimation` in class comps
    this.animationContolsImagePrev = new AnimationControls();
  };

  componentDidMount = async () => {
    this.animationContolsImagePrev.mount();

    const { location, history } = this.props;
    const { isLoginPrevPath } = this.state;

    // clear fromPath from router so the animation does not trigger on reload
    history.replace(location.pathname, { fromPath: null });

    const prevImage = document.getElementById('right-shared-element-image');
    prevImage && prevImage.remove();

    //const imageSrc = await import('assests/images/register-cover.jpg');
    //alert(JSON.stringify(imageSrc));

    
    await SignUpHelpers.preloadSignupBG();
    if(isLoginPrevPath){
      // since login was the prev path, we are trans. so hide the prev image first
      this.animationContolsImagePrev.start({ opacity: 0 });
    } else {

    };


    return;
     //get window dimensions
    const windowWidth  = window.innerWidth;
    


    //get 'right image' dimensions
    const { width: imageWidth } = 
      this.leftImageContainer.getBoundingClientRect();

    // place 'right image' on top 
    //this.rightImageContainerRef.style.zIndex = 99;

    //const sharedImage = this.props.location.state.sharedImage;
    //console.log(sharedImage);
    //this.leftImage.style.backgroundImage = sharedImage;

    this.animationContolsImagePrev.start({
      //translateX: [((windowWidth - imageWidth) / 2), 0],
      transition: { ease: 'easeInOut', duration: 0.75 },
    });
  };

  componentWillUnmount(){
    this.animationContolsImagePrev.unmount();
  };

  render(){
    const { styles } = SignUpPage;
    const { location } = this.props;
    const { isLoginPrevPath } = this.state;

    console.log('location - render', location);


    return(
      <motion.div className={css(styles.rootContainer)}>
        <motion.div 
          ref={r => this.leftImageContainer = r}
          className={css(styles.leftImageContainer)}
        >
          <motion.div 
            className={css(styles.leftImage)}
          />
          {isLoginPrevPath && (
            <motion.div 
              animate={this.animationContolsImagePrev}
              className={css(styles.leftImagePrev)}
            />
          )}
        </motion.div>
        <motion.div className={css(styles.rightFormContainer)}>
          <div className={css(styles.formContainer)}>
            {/** INSERT FORMIK FORM */}
          </div>
        </motion.div>
      </motion.div>
    );
  };
};