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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 80,
      paddingBottom: 80,
    },
    formContainer: {
      width: '320px',
      paddingLeft: 30,
      paddingRight: 30,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formTitle: {
      fontWeight: 'bold',
    },
    formGroup: {
      marginBottom: 40,
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
        WebkitFilter: 'blur(7px)',
        transition: { duration: 2 },
      });
    };
  };

  componentWillUnmount(){
    this.animationContolsImagePrev  .unmount();
    this.animationContolsFormWrapper.unmount();
  };

  _handleFormikOnSubmit = () => {
    
  };

  // render formik form contents
  _renderForm = (formikProps) => {
    const { styles } = SignUpPage;
    const { values, errors, touched } = formikProps;

    const groupTitleProps = {
      component   : "h3"   ,
      variant     : "body1",
      gutterBottom: true   ,
    };

    const inputProps = {
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
          <div className={css(styles.formGroup)}>
            <Typography {...groupTitleProps}>
              {'Personal Information'}
            </Typography>
            <FormInputIcon
              iconmap={IconMap.firstName}
              placeholder={'First Name'}
              id={'firstname'}
              type={"text"}
              name={"firstname"}
              //value={values.email}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.middleLastName}
              placeholder={'Middle Name'}
              id={'middlename'}
              type={"text"}
              name={"middlename"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.middleLastName}
              placeholder={'Last Name'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
          </div>
          <div className={css(styles.formGroup)}>
            <Typography {...groupTitleProps}>
              {'Contact Information'}
            </Typography>
            <FormInputIcon
              iconmap={IconMap.street}
              placeholder={'Street'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.barangay}
              placeholder={'Barangay'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.city}
              placeholder={'City'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.postalCode}
              placeholder={'Postal Code'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.province}
              placeholder={'Province'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.phone}
              placeholder={'Phone Number 1'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.phone}
              placeholder={'Phone Number 2'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
          </div>
          <div className={css(styles.formGroup)}>
            <Typography {...groupTitleProps}>
              {'Account Information'}
            </Typography>
            <FormInputIcon
              iconmap={IconMap.email}
              placeholder={'Email'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
            <FormInputIcon
              iconmap={IconMap.password}
              placeholder={'Password'}
              id={'lastname'}
              type={"text"}
              name={"lastname"}
              //value={values.password}
              //error={errors.password}
              error={false}//errors.email}
              {...inputProps}
            />
          </div>
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
              <motion.div 
                className={css(styles.formContainer)}
              >
                <Typography
                  className={css(styles.formTitle)}
                  component="h1"
                  variant="h5"
                >
                  {'Create an account.'}
                </Typography>
                <Formik
                  //initialValues={{ email: "", password: "" }}
                  onSubmit={this._handleFormikOnSubmit}
                  //{...{validationSchema}}
                >
                  {this._renderForm}
                </Formik>
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

// icons used for the FormInputIcon comp
const IconMap = {
  firstName: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/person.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/person-outline.svg')}/>,
  },
  middleLastName: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/people.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  },
  middleLastName: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/people.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  },
  street: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/home.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/home-outline.svg')}/>,
  },
  barangay: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/location.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/location-outline.svg')}/>,
  },
  city: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/business.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/business-outline.svg')}/>,
  },
  postalCode: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/mail-open.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/mail-open-outline.svg')}/>,
  },
  province: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/map.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/map-outline.svg')}/>,
  },
  phone: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/call.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/call-outline.svg')}/>,
  },
  email: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/mail.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/mail-outline.svg')}/>,
  },
  password: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/key.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/key-outline.svg')}/>,
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