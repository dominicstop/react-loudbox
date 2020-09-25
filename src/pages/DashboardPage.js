import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import AuthStore from 'functions/AuthStore';

import * as Colors from 'constants/Colors';


export default class DashboardPage extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    },

    sideBarContainer: {
      backgroundColor: Colors.BLACK[900],
      padding: 15,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: 'blue'
    },
  });

  _renderSidebar(){
    const { styles } = DashboardPage;
    return(
      <nav className={css(styles.sideBarContainer)}>

      </nav>
    );
  };

  render(){
    const { styles } = DashboardPage;
    const props = this.props;

    return(
      <div className={css(styles.rootContainer)}>
        {this._renderSidebar()}
        <div className={css(styles.contentContainer)}>
          <h1>Homepage</h1>
          <button onClick={() => {
            AuthStore.resetAuth();
            props.history.push('/login');
          }}>
            {'Log Out'}
          </button>
        </div>
      </div>
    );
  };
};