import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls } from "framer-motion";
import { Typography, Box, Button, CircularProgress, Link } from '@material-ui/core';
import { IoIosAlert } from "react-icons/io";

import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { AuthLogin } from 'api/Auth';
import { FadeInImage } from 'components/FadeInImage';
import { FormInputIcon, ICON_KEYS } from 'components/FormInputIcon';
import { LoginPayload } from 'models/LoginPayload';

import { ROUTES } from 'constants/Routes';
import { PreloadPages } from 'functions/PreloadPages';


import * as Helpers      from 'functions/helpers';
import * as Colors       from 'constants/Colors';
import * as FramerValues from 'constants/FramerValues';

import loginBG     from 'assests/images/login-cover.jpg';
import loudboxLogo from 'assests/svg/loudbox-logo.svg';


//#region - Constants
const LOGIN_STATE = {
  INITIAL : 'INITIAL', // intial form state
  INVALID : 'INVALID', // invalid email/password
  LOADING : 'LOADING', // waiting for server resp
  SUCCESS : 'SUCCESS', // login granted
  REJECTED: 'INVALID', // login rejected
  ERROR   : 'ERROR'  , // login error
};

const VARIANTS = {
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
  rightImage: {
    hidden: {
      x: 100, 
      opacity: 0,
      scale: 1.25,
      WebkitFilter: 'blur(7px)',
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      WebkitFilter: 'blur(0px)',
      transition: { ease: "easeInOut", duration: 2, delay: 1.25 },
    },
  },
  inputContainer: {
    visible: {
      opacity: 1
    },
    loading: {
      opacity: 0.5
    },
    shake: FramerValues.shake,
  },
  formError: {
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(9, "Password is too short - should be 8 chars minimum.")
});

// icons used for the FormInputIcon comp
const IconMap = {
  email: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/mail.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/mail-outline.svg')}/>,
  },
  password: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/key.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/key-outline.svg')}/>,
  },
};
//#endregion


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
        flex: 2,
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

    this.state = {
      loginState: LOGIN_STATE.INITIAL,
      mountRightImage: false,
    };

    // workaround to use `useAnimation` in class comps
    this.animationContolsRootContainer  = new AnimationControls();
    this.animationContolsFormContainer  = new AnimationControls();
    this.animationContolsImageContainer = new AnimationControls();
    this.animationContolsInputContainer = new AnimationControls();
  };

  componentDidMount = async () => {
    this.animationContolsRootContainer .mount();
    this.animationContolsFormContainer .mount();
    this.animationContolsImageContainer.mount();
    this.animationContolsInputContainer.mount();

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
    this.animationContolsInputContainer.unmount();
  };

  _handleOnClickCreateAccount = async (event) => {
    const { history } = this.props;

    //disable href behaviour
    event.preventDefault();

    //get window dimensions
    const windowWidth  = window.innerWidth;

    const { width: formWidth } = 
      this.leftFormContainerRef.getBoundingClientRect();

    //get 'right image' dimensions
    const { width: imageWidth } = 
      this.rightImageContainerRef.getBoundingClientRect();

    // place 'right image' on top 
    //this.rightImageContainerRef.style.zIndex = 99;

    await Promise.all([
       PreloadPages.preloadPage(ROUTES.SIGNUP),
       this.animationContolsFormContainer.start({
         translateX: -formWidth,
         opacity: 0,
         scale: 0.8,
         transition: { ease: 'easeInOut', duration: 0.7 },
       }),
       this.animationContolsImageContainer.start({
         // move the image to the left
         translateX: -(windowWidth - imageWidth),
         //opacity: [1, 1, 0],
         transition: { ease: 'easeInOut', duration: 0.75 },
       }),
    ]);

    history.push('/signup', {});
  };

  // gets called when the login button is pressed
  _handleOnClickSubmit = (formikProps) => {
    const errorCount = Object.keys(formikProps.errors).length;
    const hasErrors  = (errorCount > 0);

    if(hasErrors){
      // shake form
      this.animationContolsInputContainer.start('shake');
    };
  };

  // gets called when the login form is submitted
  _handleFormikOnSubmit = async (values, actions) => {
    const { history } = this.props;

    // shakes + transitions form back to normal
    const triggerErrorAnimation = () => {
      actions.setSubmitting(false);
      this.animationContolsInputContainer.start('visible');
      this.animationContolsInputContainer.start('shake');
    };

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
        this.animationContolsInputContainer.start('loading'),
      ]);

      if(loginResult.isSuccess){
        // fade out page
        // temp: use AnimatePresense in the future
        await this.animationContolsRootContainer.start({
          opacity: 0,
          transition: { duration: 0.5 },
        });

        // go to home page
        history.push('/home');

      } else {
        // login failed, show error + shake form
        triggerErrorAnimation();
        actions.setErrors({
          email    : true, 
          password : true,
          formError: loginResult.error.errorMessage,
        });
      };

    } catch (error) {
      console.log('login error', error);
      triggerErrorAnimation();
      actions.setErrors({
        email    : true, 
        password : true,
        formError: 'An unexpected error has occured',
      });
    };
  };

  // render formik form contents
  _renderForm = (formikProps) => {
    const { values, errors, touched } = formikProps;
    const { styles } = LoginPage;

    return(
      <Form 
        className={css(styles.form)}
        onSubmit={formikProps.handleSubmit}
      >
        <motion.div
          variants={VARIANTS.inputContainer}
          animate={this.animationContolsInputContainer}
        >
          <FormInputIcon
            iconmap={IconMap.email}
            placeholder={'Email'}
            id={'email'}
            type={"email"}
            name={"email"}
            value={values.email}
            error={errors.email}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />
          <FormInputIcon
            iconmap={IconMap.password}
            placeholder={'Password'}
            id={'password'}
            type={"password"}
            name={"password"}
            value={values.password}
            error={errors.password}
            isLoading={formikProps.isSubmitting}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />
        </motion.div>
        <motion.div
          className={css(styles.formErrorContainer)}
          animate={errors.formError? 'visible' : 'hidden'}
          variants={VARIANTS.formError}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
        >
          <IoIosAlert className={css(styles.formErrorIcon)}/>
          <label className={css(styles.formError)}>
            {errors.formError}
          </label>
        </motion.div>
        <Box className={css(styles.formButtonContainer)}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            disabled={formikProps.isSubmitting}
            // workaround because submit isnt trigerred when there 
            // are form errors
            onClick={() => { this._handleOnClickSubmit(formikProps) }}
          >
            {formikProps.isSubmitting
              ? <CircularProgress size={30}/> 
              : 'LOGIN'
            }
          </Button>
          <Link
            href={'/signup'}
            onClick={this._handleOnClickCreateAccount}
          >
            Create an account
          </Link>
        </Box>
      </Form>
    );
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
                //animateInitial={{ y: 0 }}
                //animateEntrance={{ y: 0, transition: { ease: 'easeInOut', duration: 0.3 }}}
                src={loudboxLogo} 
                alt={"LoudBox Logo"}
              />
            </motion.div>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={this._handleFormikOnSubmit}
              {...{validationSchema}}
            >
              {this._renderForm}
            </Formik>
          </motion.div>
        </div>
        <motion.div 
          ref={r => this.rightImageContainerRef = r}
          className={css(styles.rightImageContainer)}
          initial={{ translateX: 0 }}
          animate={this.animationContolsImageContainer}
        >
          {this.state.mountRightImage && (
            <motion.div 
              className={css(styles.rightImage)}
              variants={VARIANTS.rightImage}
              initial={"hidden"}
              animate={'visible'}
            />
          )}
        </motion.div>
      </motion.div>
    );
  };
};