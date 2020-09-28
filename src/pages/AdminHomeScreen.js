import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminHomeScreen(props){
  return(
    <div>
      <h1>AdminHomeScreen</h1>
    </div>
  );
};

export default withAuthRedirect(AdminHomeScreen, 'OnlyAdmin');