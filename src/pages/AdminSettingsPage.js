import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminSettingsPage(props){
  return(
    <div>
      <h1>AdminSettingsPage</h1>
    </div>
  );
};

export default withAuthRedirect(AdminSettingsPage, 'OnlyAdmin');