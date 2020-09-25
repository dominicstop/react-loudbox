import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { motion, AnimationControls } from "framer-motion";
import { Typography } from '@material-ui/core';

import { FadeInImage } from 'components/FadeInImage';
import { portalRoot } from 'components/RootPortal';
import { LoginForm } from 'forms/LoginForm';

import { AuthLogin } from 'api/Auth';
import { PreloadPages } from 'functions/PreloadPages';
import { LoginPayload } from 'models/LoginPayload';
import { ROUTES } from 'constants/Routes';

import * as Helpers from 'functions/helpers';

import loginBG     from 'assests/images/login-cover.jpg';
import loudboxLogo from 'assests/svg/loudbox-logo.svg';


export default class LoginPage extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    },
    rightImageContainer: {
      display: 'none',
      overflow: 'hidden',
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
    rightImage: {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${loginBG})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'norepeat',
      backgroundSize: 'cover',
    },
    rightImageOverlaySharedElement: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      //width: 100,
      zIndex: 999,
      backgroundImage: `url(${loginBG})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'norepeat',
      backgroundSize: 'cover',
    },
    logo: {
      height: '48px',
      width: 'auto',
    },
    logoContainer: {
      marginTop: 10,
      marginBottom: '32px',
    },
    leftFormContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      height: 'auto',
      width: '320px',
      paddingTop: 64,
      paddingBottom: 64,
      paddingLeft: 30,
      paddingRight: 30,
      textAlign: 'center',
      backgroundColor: 'white',
    },
  });

  constructor(props){
    super(props);

    this.state = {
      mountRightImage: false,
    };

    this.isRightImageAnimatingIn = true;

    // workaround to use `useAnimation` in class comps
    this.animationContolsRootContainer  = new AnimationControls();
    this.animationContolsFormContainer  = new AnimationControls();
    this.animationContolsImageContainer = new AnimationControls();
  };

  componentDidMount = async () => {
    this.animationContolsRootContainer .mount();
    this.animationContolsFormContainer .mount();
    this.animationContolsImageContainer.mount();

    // start entrance animation for left form
    this.animationContolsFormContainer.start('visible');

    // wait for the right 'cover' image to load before showing it
    await Helpers.preloadImage(require('assests/images/login-cover.jpg'));
    this.setState({ mountRightImage: true });
  };

  componentWillUnmount(){
    this.animationContolsRootContainer .unmount();
    this.animationContolsFormContainer .unmount();
    this.animationContolsImageContainer.unmount();
  };

  _handleOnClickCreateAccount = async () => {
    const { history, location } = this.props;

    //get window dimensions
    const windowWidth  = window.innerWidth;

    const { width: formWidth } = 
      this.leftFormContainerRef.getBoundingClientRect();

    //get 'right image' dimensions
    const { width: imageWidth } = 
      this.rightImageContainerRef.getBoundingClientRect();

    await Promise.all([
       PreloadPages.preloadPage(ROUTES.SIGNUP),
       this.animationContolsFormContainer.start({
         translateX: -formWidth,
         opacity: 0,
         scale: 1.2,
         transition: { ease: 'easeInOut', duration: 0.6 },
       }),
       this.animationContolsImageContainer.start({
         // move the image to the left
         translateX: -(windowWidth - imageWidth),
         transition: { ease: 'easeInOut', duration: 0.75 },
       }),
       // wait if the right image is still animating in
       this.isRightImageAnimatingIn && Helpers.promiseWithTimeout({
         ms: 1500, shouldReject: false, 
         promise: new Promise(resolve => {
          this.onAnimationCompleteRightImage = resolve;
        })
       }) 
    ]);

    // fix for the flickering
    LoginPageHelpers.appendSharedElementImage(this.rightImageContainerRef);

    history.push('/signup', { fromPath: location.pathname });
  };

  // gets called when the login form is submitted
  _handleFormikOnSubmit = async (values, actions, formActions) => {
    const { history } = this.props;

    try {
      // get the form values from formik
      const loginCredentials = LoginPayload.factory({
        username: values?.email    ?? '',
        password: values?.password ?? '',
      });

      // transition to logging in animation
      // and POST to login api
      const [loginResult] = await Promise.all([
        AuthLogin.login(loginCredentials),
        formActions.triggerFormLoading(),
      ]);

      if(loginResult.isSuccess){
        // fade out page
        // temp: use AnimatePresense in the future
        await this.animationContolsRootContainer.start({
          opacity: 0,
          transition: { duration: 0.5 },
        });

        // go to home page
        history.push(ROUTES.HOME);

      } else {
        // login failed, show error + shake form
        formActions.triggerFormError();
        actions.setErrors({
          email    : true, 
          password : true,
          formError: loginResult.error.errorMessage,
        });
      };

    } catch (error) {
      console.log('login error', error);
      formActions.triggerFormError();
      actions.setErrors({
        email    : true, 
        password : true,
        formError: 'An unexpected error has occured',
      });
    };
  };

  render(){
    const { styles } = LoginPage;
    const state = this.state;

    return(
      <motion.div 
        className={css(styles.rootContainer)}
        animate={this.animationContolsRootContainer}
      >
        <div
          ref={r => this.leftFormContainerRef = r }
          className={css(styles.leftFormContainer)}
        >
          <motion.div 
            className={css(styles.formContainer)}
            variants={VARIANTS.formContainer}
            animate={this.animationContolsFormContainer}
            initial={"hidden"}
          >
            <Typography
              variant="h5"
              component="h1"
            >
              {'Welcome to '}
            </Typography>
            <motion.div
              className={css(styles.logoContainer)}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 0.75, delay: 6, repeatDelay: 4, ease: "backIn" }}
            >
              <FadeInImage 
                className={css(styles.logo)}
                src={loudboxLogo} 
                alt={"LoudBox Logo"}
              />
            </motion.div>
            <LoginForm
              onClickCreateAccount={this._handleOnClickCreateAccount}
              onFormikFormSubmit={this._handleFormikOnSubmit}
            />
          </motion.div>
        </div>
        <motion.div 
          ref={r => this.rightImageContainerRef = r}
          className={css(styles.rightImageContainer)}
          initial={{ translateX: 0 }}
          animate={this.animationContolsImageContainer}
        >
          {state.mountRightImage && (
            <motion.div 
              className={css(styles.rightImage)}
              variants={VARIANTS.rightImage}
              initial={"hidden"}
              animate={'visible'}
              onAnimationComplete={() => {
                this.isRightImageAnimatingIn = false;
                this.onAnimationCompleteRightImage && 
                  this.onAnimationCompleteRightImage();
              }}
            />
          )}
        </motion.div>
      </motion.div>
    );
  };
};

//#region - Constants + Helpers
/** animation values */
const VARIANTS = {
  formContainer: {
    hidden: { 
      translateY: 50,
      opacity: 0,
      transition: { ease: 'easeInOut', duration: 0.3 },
    },
    visible: {
      translateY: 0,
      opacity: 1,
      transition: { ease: 'easeInOut', duration: 0.5, delay: 0.5 },
    },
  },
  rightImage: {
    hidden: {
      translateX: 100, 
      opacity: 0,
      scale: 1.25,
      WebkitFilter: 'blur(7px)',
    },
    visible: {
      translateX: 0,
      opacity: 1,
      scale: 1,
      WebkitFilter: 'blur(0px)',
      transition: { ease: "easeInOut", duration: 2, delay: 1.25 },
    },
  },
};

class LoginPageHelpers {
  /**
   * when tranitioning to the signup page for the first time, 
   * sometimes the image will flicker in/out for a few ms bc 
   * the image hasn't been cached yet.
   * 
   * This func recreates the image outside of the comp hiearchy
   * and positions it on top as an overlay for a few ms then quickly
   * removes it.
   */
  static appendSharedElementImage(rightImageContainerRef){
    // guard: early exit if null
    if(!rightImageContainerRef) return;

    const { styles } = LoginPage;
    const div = document.createElement("div");

    div.id = 'right-shared-element-image';
    div.className = css(styles.rightImageOverlaySharedElement);

    const { width } = rightImageContainerRef.getBoundingClientRect();
    div.style.width = `${width}px`;

    portalRoot.appendChild(div);

    setTimeout(() => { 
      if(document.contains(div)){
        portalRoot.removeChild(div);
      };
    }, 3000);
  };
};
//#endregion