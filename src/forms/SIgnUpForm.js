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
import { YupSchemas } from 'constants/YupSchemas';


export class SignUpForm extends React.Component {
  static styles = StyleSheet.create({
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

    this.initialValues = 
      SignUpFormHelpers.getFormDefaultValues();
  };

  _renderForm(formikProps){
    const { styles } = SignUpForm;
    const { getFieldProps } = SignUpFormHelpers;

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
          //animate={this.animationContolsInputContainer}
        >
          <div className={css(styles.formGroup)}>
            <Typography {...groupTitleProps}>
              {'Personal Information'}
            </Typography>
            <FormInputIcon
              placeholder={'First Name'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.firstName, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Middle Name'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.middleName, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Last Name'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.lastName, formikProps)}
              {...inputProps}
            />
          </div>
          <div className={css(styles.formGroup)}>
            <Typography {...groupTitleProps}>
              {'Contact Information'}
            </Typography>
            <FormInputIcon
              placeholder={'Street'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.street, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Barangay'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.barangay, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'City'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.city, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Postal Code'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.postalCode, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Province'}
              name={"lastname"}
              {...getFieldProps(SignUpFormKeys.province, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Phone Number 1'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.phone1, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Phone Number 2'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.phone2, formikProps)}
              {...inputProps}
            />
          </div>
          <div className={css(styles.formGroup)}>
            <Typography {...groupTitleProps}>
              {'Account Information'}
            </Typography>
            <FormInputIcon
              placeholder={'Email'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.email, formikProps)}
              {...inputProps}
            />
            <FormInputIcon
              placeholder={'Password'}
              type={"text"}
              {...getFieldProps(SignUpFormKeys.password, formikProps)}
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
            //onClick={this._handleOnClickCreateAccount}
          >
            {'Back to Sign In'}
          </Link>
        </Box>
      </Form>
    );
  };

  render(){
    const { ...props } = this.props;

    return(
      <Formik
        initialValues={this.initialValues}
        render={this._renderForm}
        {...{validationSchema}}
        {...props}
      />
    );
  };
};


//#region - Constants
/** keys representing each field in the `SignUpForm`  */
export const SignUpFormKeys = {
  firstName : 'firstName' ,
  middleName: 'middleName',
  lastName  : 'lastName'  ,
  street    : 'street'    ,
  barangay  : 'barangay'  ,
  city      : 'city'      ,
  postalCode: 'postalCode',
  province  : 'province'  ,
  phone1    : 'phone1'    ,
  phone2    : 'phone2'    ,
  email     : 'email'     ,
  password  : 'password'  ,
};

/** icons used for the FormInputIcon comp */
const IconMap = {
  [SignUpFormKeys.firstName]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/person.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/person-outline.svg')}/>,
  },
  [SignUpFormKeys.middleName]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/people.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  },
  [SignUpFormKeys.lastName]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/people.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/people-outline.svg')}/>,
  },
  [SignUpFormKeys.street]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/home.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/home-outline.svg')}/>,
  },
  [SignUpFormKeys.barangay]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/location.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/location-outline.svg')}/>,
  },
  [SignUpFormKeys.city]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/business.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/business-outline.svg')}/>,
  },
  [SignUpFormKeys.postalCode]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/mail-open.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/mail-open-outline.svg')}/>,
  },
  [SignUpFormKeys.province]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/map.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/map-outline.svg')}/>,
  },
  [SignUpFormKeys.phone1]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/call.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/call-outline.svg')}/>,
  },
  [SignUpFormKeys.phone2]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/call.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/call-outline.svg')}/>,
  },
  [SignUpFormKeys.email]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/mail.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/mail-outline.svg')}/>,
  },
  [SignUpFormKeys.password]: {
    [ICON_KEYS.active  ]: <SVG src={require('assests/ionicons/key.svg'        )}/>,
    [ICON_KEYS.inactive]: <SVG src={require('assests/ionicons/key-outline.svg')}/>,
  },
};

/** formik schema for signup validation */
const validationSchema = Yup.object().shape({
  [SignUpFormKeys.firstName ]: YupSchemas.shortStringRequired,
  [SignUpFormKeys.middleName]: YupSchemas.shortStringRequired,
  [SignUpFormKeys.lastName  ]: YupSchemas.shortStringRequired,
  [SignUpFormKeys.street    ]: YupSchemas.shortStringRequired,
  [SignUpFormKeys.barangay  ]: YupSchemas.shortStringRequired,
  [SignUpFormKeys.city      ]: YupSchemas.shortStringRequired,
  [SignUpFormKeys.province  ]: YupSchemas.shortStringRequired,
  [SignUpFormKeys.phone1    ]: YupSchemas.phoneNumber,
  [SignUpFormKeys.phone2    ]: YupSchemas.phoneNumber,
  // custom schemas ------------
  [SignUpFormKeys.postalCode]: (
    Yup.number()
      .required("Required")
      .max(100, "Too many characters")
  ),
  [SignUpFormKeys.email]: (
    Yup.string()
      .email("Not a valid email address")
      .required("Required")
  ),
  [SignUpFormKeys.password]: (
    Yup.string()
      .required("No password provided.")
      .min(9, "Password is too short - should be 8 chars minimum.")
  ),
});

export class SignUpFormHelpers {
  /** get the field props based on the key */
  static getFieldProps(key, props){
    return {
      iconmap: IconMap[key],
      id     : key,
      name   : key,
      value  : props.values?.[key],
      error  : props.errors?.[key],
    };
  };

  static getFormDefaultValues(){
    const reducer = 
      (acc = {}, curr) => ({[curr]: '', ...acc});

    return Object
      .keys(SignUpFormKeys)
      .reduce(reducer, {});
  };
};
//#endregion