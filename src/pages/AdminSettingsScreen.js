import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminSettingsScreen(props){
  return(
    <div>
      <h1>AdminSettingsScreen</h1>
    </div>
  );
};

export default withAuthRedirect(AdminSettingsScreen, 'OnlyAdmin');