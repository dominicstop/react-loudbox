import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function SettingsPage(props){
  return(
    <div>
      <h1>SettingsPage</h1>
    </div>
  );
};

export default withAuthRedirect(SettingsPage, 'OnlyLoggedIn');