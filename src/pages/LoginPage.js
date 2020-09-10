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
      backgroundColor: 'red',
    },
    rightImageContainer: {
      flex: 1,
      display: 'flex',
      backgroundColor: 'blue',
      '@media (max-width: 1000px)': {
        display: 'none'
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
        <div className={css(styles.rightImageContainer)}>
          <h1>Hello World</h1>
        </div>
      </div>
    );
  };
};