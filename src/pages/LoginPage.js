import React from 'react';
import { StyleSheet, css } from 'aphrodite';




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
      backgroundImage: `url(${require('assests/images/login-cover.jpg')})`,
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
  });

  render(){
    const { styles } = LoginPage;
    return(
      <div className={css(styles.rootContainer)}>
        <div className={css(styles.leftFormContainer)}>
          <h1>Hello</h1>
        </div>
        <div className={css(styles.rightImageContainer)}/>
      </div>
    );
  };
};