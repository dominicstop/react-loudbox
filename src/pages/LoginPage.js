import React from 'react';
import { StyleSheet, css } from 'aphrodite';

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
    rightImageContainer: {
      display: 'none',
      // set/config bg image
      backgroundImage: `url(${loginBG})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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

  render(){
    const { styles } = LoginPage;
    return(
      <div className={css(styles.rootContainer)}>
        <div className={css(styles.leftFormContainer)}>
          <div>
            <img 
              className={css(styles.logo)}
              src={loudboxLogo} 
              alt="LoudBox Logo" 
            />
          </div>
        </div>
        <div className={css(styles.rightImageContainer)}/>
      </div>
    );
  };
};