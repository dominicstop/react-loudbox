import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { CircularProgress } from '@material-ui/core';


export class LoadingPage extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  render(){
    const { styles } = LoadingPage;

    return(
      <div className={css(styles.rootContainer)}>
        <CircularProgress/>
      </div>
    );
  };
};