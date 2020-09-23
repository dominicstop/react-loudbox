import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import SVG from 'react-inlinesvg';
import { motion, AnimationControls, AnimatePresence } from "framer-motion";
import { Typography, Box, Button, CircularProgress, Link } from '@material-ui/core';
import Scrollbar from 'react-scrollbars-custom';


import * as Yup from 'yup';
import { Formik, Form, withFormik } from 'formik';

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

//#region - Constants

const FieldKeys = {

};

/** formik schema for signup validation */
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
//#endregion

class SignUpFormBase extends React.Component {
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

  render(){
    const { styles } = SignUpFormBase;
    const { values, errors, touched, ...props} = this.props;

    const groupTitleProps = {
      component   : "h3"   ,
      variant     : "body1",
      gutterBottom: true   ,
    };

    const inputProps = {
      bottomSpace: 15,
      // pass down formik props
      onBlur   : props.handleBlur  ,
      onChange : props.handleChange,
      isLoading: props.isSubmitting,
    };
    

    return(
      <Form 
        className={css(styles.form)}
        onSubmit={props.handleSubmit}
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
            disabled={props.isSubmitting}
          >
            {props.isSubmitting
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
};

export const SignUpForm = withFormik({
  // default values
  mapPropsToValues: () => ({ 
  }),
  validationSchema,
})(SignUpFormBase);