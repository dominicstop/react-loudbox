import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls } from "framer-motion";
import { Box, Button, CircularProgress, Link } from '@material-ui/core';
import { IoIosAlert } from "react-icons/io";

import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { FormInputIcon, ICON_KEYS } from 'components/FormInputIcon';

import * as Colors       from 'constants/Colors';
import * as FramerValues from 'constants/FramerValues';


export class LoginForm extends React.Component {
  static propTypes = {
    onFormikFormSubmit  : PropTypes.func,
    onClickCreateAccount: PropTypes.func,
  };

  static styles = StyleSheet.create({
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

    this.animationContolsInputContainer = new AnimationControls();
  };

  componentDidMount(){
    this.animationContolsInputContainer.mount();
  };

  componentWillUnmount(){
    this.animationContolsInputContainer.unmount();
  };

  _handleOnClickCreateAccount = (event) => {
    //disable href behaviour
    event.preventDefault();

    const { onClickCreateAccount } = this.props;
    onClickCreateAccount && onClickCreateAccount(event);
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

  _handleFormikOnSubmit = (values, actions) => {
    const { onFormikFormSubmit } = this.props;
    // guard: onFormikFormSubmit null
    if(!onFormikFormSubmit) return;

    const formActions = {
      // shakes + transitions form back to normal
      triggerFormError: async () => {
        actions.setSubmitting(false);
        this.animationContolsInputContainer.start('visible');
        this.animationContolsInputContainer.start('shake');
      },
      triggerFormLoading: async () => {
        this.animationContolsInputContainer.start('loading');
      },
    };

    onFormikFormSubmit(values, actions, formActions);
  };
  
  // render formik form contents
  _renderForm = (formikProps) => {
    const { values, errors } = formikProps;
    const { styles } = LoginForm;

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
            label={'Email'}
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
            label={'Password'}
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
            {'Create an account'}
          </Link>
        </Box>
      </Form>
    );
  };

  render(){
    return(
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={this._handleFormikOnSubmit}
        {...{validationSchema}}
        {...this.props}
      >
        {this._renderForm}
      </Formik>
    );
  };
};

//#region - Constants
/** animation values */
const VARIANTS = {
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

/** formik schema for login validation */
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Not a valid email address")
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