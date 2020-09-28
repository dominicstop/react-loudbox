import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminUserManageScreen(props){
  return(
    <div>
      <h1>AdminUserManageScreen</h1>
    </div>
  );
};

export default withAuthRedirect(AdminUserManageScreen, 'OnlyAdmin');