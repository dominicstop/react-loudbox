import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls, AnimatePresence } from "framer-motion";
import { Typography, Box, Button, CircularProgress, Link } from '@material-ui/core';
import Scrollbar from 'react-scrollbars-custom';


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
      backgroundColor: 'white',
    },
    formWrapper: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    formContainer: {
      width: '320px',
      paddingTop: 72,
      paddingBottom: 80,
      textAlign: 'center',
      alignItems: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
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
      mountLeftImage: false,
    };

    // workaround to use `useAnimation` in class comps
    this.animationContolsImagePrev     = new AnimationControls();
    this.animationContolsFormContainer = new AnimationControls();
  };

  componentDidMount = async () => {
    this.animationContolsImagePrev    .mount();
    this.animationContolsFormContainer.mount();

    // start entrance animation for left form
    this.animationContolsFormContainer.start('visible');

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
        WebkitFilter: 'blur(7px)',
        transition: { duration: 2 },
      });
    };
  };

  componentWillUnmount(){
    this.animationContolsImagePrev    .unmount();
    this.animationContolsFormContainer.unmount();
  };

  _handleFormikOnSubmit = () => {
    
  };

  // render formik form contents
  _renderForm = (formikProps) => {
    const { styles } = SignUpPage;
    const { values, errors, touched } = formikProps;

    const sharedProps = {
      bottomSpace: 15,
      // pass down formik props
      onBlur   : formikProps.handleBlur  ,
      onChange : formikProps.handleChange,
      isLoading: formikProps.isSubmitting,
    };

    return(
      <Form 
        className={css(styles.form)}
        onSubmit={formikProps.handleSubmit}
      >
        <motion.div
          //variants={VARIANTS.inputContainer}
          animate={this.animationContolsInputContainer}
        >
          <FormInputIcon
            //iconmap={IconMap.email}
            placeholder={'First Name'}
            id={'firstname'}
            type={"text"}
            name={"firstname"}
            //value={values.email}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Middle Name'}
            id={'middlename'}
            type={"text"}
            name={"middlename"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Last Name'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />

          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Street'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Barangay'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'City'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Postal Code'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Province'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Phone Number 1'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Phone Number 2'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />

          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Email'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
          <FormInputIcon
            //iconmap={IconMap.password}
            placeholder={'Password'}
            id={'lastname'}
            type={"text"}
            name={"lastname"}
            //value={values.password}
            //error={errors.password}
            error={false}//errors.email}
            {...sharedProps}
          />
        </motion.div>
        <Box className={css(styles.formButtonContainer)}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            disabled={formikProps.isSubmitting}
          >
            {formikProps.isSubmitting
              ? <CircularProgress size={30}/> 
              : 'CREATE ACCOUNT'
            }
          </Button>
          <Link
            href={'/signup'}
            onClick={this._handleOnClickCreateAccount}
          >
            {'Back to Sign In'}
          </Link>
        </Box>
      </Form>
    );
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
            <div className={css(styles.formWrapper)}>
              <motion.div 
                className={css(styles.formContainer)}
                variants={VARIANTS.formContainer}
                animate={this.animationContolsFormContainer}
                initial={"hidden"}
              >
                <Formik
                  //initialValues={{ email: "", password: "" }}
                  onSubmit={this._handleFormikOnSubmit}
                  //{...{validationSchema}}
                >
                  {this._renderForm}
                </Formik>
              </motion.div>
            </div>
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
      WebkitFilter: 'blur(7px)',
    },
    visibleTrans: {
      opacity: 1,
      WebkitFilter: 'blur(0px)',
      transition: { duration: 2 },
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