import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import AuthStore from 'functions/AuthStore';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminHomePage(props){
  return(
    <div>
      <h1>AdminHomePage</h1>
      <button onClick={() => {
        AuthStore.resetAuth();
        props.history.push('/login');
      }}>
        {'Log Out'}
      </button>
    </div>
  );
};

export default withAuthRedirect(AdminHomePage, 'OnlyAdmin');