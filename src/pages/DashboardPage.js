import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Drawer } from '@material-ui/core';

import AuthStore from 'functions/AuthStore';

import * as Colors from 'constants/Colors';
import { ROUTES_HOME } from 'constants/Routes';
import { HomePageSideBar } from 'components/HomePage/HomePageSidebar';



export default class DashboardPage extends React.Component {
  static styles = StyleSheet.create({
    rootContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: 'blue'
    },
  });

  render(){
    const { styles } = DashboardPage;
    const props = this.props;

    return(
      <div className={css(styles.rootContainer)}>
        <HomePageSideBar/>
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