import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Typography, Box } from '@material-ui/core';
import { FormControl, InputLabel, InputBaseProps, FormHelperText } from '@material-ui/core';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import loginBG     from 'assests/images/login-cover.jpg';
import loudboxLogo from 'assests/svg/loudbox-logo.svg';


export class LoginPage extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
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
    rightImageContainer: {
      display: 'none',
      // set/config bg image
      backgroundImage: `url(${loginBG})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'norepeat',
      backgroundSize: 'cover',
      // show the right image container if there's enough space
      '@media (min-width: 750px) and (max-width: 1250px)': {
        flex: 1,
        display: 'flex'
      },
      '@media (min-width: 1250px)': {
        flex: 2,
        display: 'flex'
      }
    },
    logo: {
      height: '48px',
      width: 'auto',
      marginBottom: '32px',
    },
  });

  _handleOnFormSubmit = () => {

  };

  render(){
    const { styles } = LoginPage;
    return(
      <div className={css(styles.rootContainer)}>
        <div className={css(styles.leftFormContainer)}>
          <Box className={css(styles.formContainer)}>
            <Typography
              variant="h5"
              component="h1"
            >
              Welcome to
            </Typography>
            <img 
              className={css(styles.logo)}
              src={loudboxLogo} 
              alt="LoudBox Logo" 
            />
            <Formik>
              {(params) => (
                <Form className={css(styles.form)}>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                  <button type="submit" disabled={params.isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </Box>
        </div>
        <div className={css(styles.rightImageContainer)}/>
      </div>
    );
  };
};