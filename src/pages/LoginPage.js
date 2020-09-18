import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls } from "framer-motion";


import { Typography, Box, Button, CircularProgress, Link } from '@material-ui/core';
import { FormControl, InputLabel, InputBaseProps, FormHelperText } from '@material-ui/core';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormInputIcon, ICON_KEYS } from 'components/FormInputIcon';

import loginBG     from 'assests/images/login-cover.jpg';
import loudboxLogo from 'assests/svg/loudbox-logo.svg';

import * as Helpers      from 'functions/helpers';
import * as FramerValues from 'constants/FramerValues';

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
      opacity: 0,
      y: 50,
    },
    visible: {
      y: 0,
      opacity: 1
    },
  },
  rightImage: {
    hidden: { 
      opacity: 0,
      scale: 1.25,
      WebkitFilter: 'blur(7px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      WebkitFilter: 'blur(0px)',
    },
  },
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
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

export class LoginPage extends React.Component {
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
      flex: 1,
      backgroundImage: `url(${loginBG})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'norepeat',
      backgroundSize: 'cover',
    },
    logo: {
      height: '48px',
      width: 'auto',
      marginBottom: '32px',
    },
    leftFormContainer: {
      flex: 1,
      display: 'flex',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      height: 'auto',
      width: '320px',
      paddingTop: '64px',
      paddingBottom: '64px',
      textAlign: 'center',
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
  });

  constructor(props){
    super(props);

    this.state = {
      loginState: LOGIN_STATE.INITIAL,
    };

    // workaround to use `useAnimation` in class comps
    this.formAnimationContols = new AnimationControls();
  };
  

  componentDidMount = async () => {
    this.formAnimationContols.mount();
  };

  componentWillMount(){
    this.formAnimationContols.unmount();
  };

  _handleOnClickSubmit = (formikProps) => {
    const errorCount = Object.keys(formikProps.errors).length;
    const hasErrors  = (errorCount > 0);

    if(hasErrors){
      // shake form
      this.formAnimationContols.start(FramerValues.shake);
    };
  };

  _handleFormikOnSubmit = async (values, actions) => {
    await Helpers.timeout(2000);
    console.log("Logging in", values);

    actions.setSubmitting(false);
    this.formAnimationContols.start(FramerValues.shake);
  };

  _renderForm = (formikProps) => {
    const { values, errors, touched } = formikProps;
    const { styles } = LoginPage;

    return(
      <Form 
        className={css(styles.form)}
        onSubmit={formikProps.handleSubmit}
      >
        <motion.div animate={this.formAnimationContols}>
          <FormInputIcon
            iconmap={IconMap.email}
            placeholder={'Email'}
            id={'email'}
            type={"email"}
            name={"email"}
            value={values.email}
            error={errors.email}
            touched={touched.email}
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
            touched={touched.password}
            isLoading={formikProps.isSubmitting}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />
        </motion.div>
        <Box className={css(styles.formButtonContainer)}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            disabled={formikProps.isSubmitting}
            // workaround because submit isnt trigerred when there are form errors
            onClick={() => { this._handleOnClickSubmit(formikProps) }}
          >
            {formikProps.isSubmitting
              ? <CircularProgress/> 
              : 'LOGIN' 
            }
          </Button>
          <Link href="/register">
            Create an account
          </Link>
        </Box>
      </Form>
    );
  };

  render(){
    const { styles } = LoginPage;
    return(
      <div className={css(styles.rootContainer)}>
        <div className={css(styles.leftFormContainer)}>
          <motion.div 
            className={css(styles.formContainer)}
            variants={VARIANTS.formContainer}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.3 }}
            initial={"hidden"}
            animate={"visible"}
          >
            <Typography
              variant="h5"
              component="h1"
            >
              {'Welcome to '}
            </Typography>
            <motion.img 
              className={css(styles.logo)}
              src={loudboxLogo} 
              alt={"LoudBox Logo"}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 0.75, delay: 4, repeatDelay: 4, ease: "backIn" }}
            />
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={this._handleFormikOnSubmit}
              {...{validationSchema}}
            >
              {this._renderForm}
            </Formik>
          </motion.div>
        </div>
        <div className={css(styles.rightImageContainer)}>
          <motion.div 
            className={css(styles.rightImage)}
            variants={VARIANTS.rightImage}
            transition={{ ease: "easeInOut", duration: 2, delay: 1.25 }}
            initial={"hidden"}
            animate={"visible"}
          />
        </div>
      </div>
    );
  };
};