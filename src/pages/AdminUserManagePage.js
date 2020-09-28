import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminUserManagePage(props){
  return(
    <div>
      <h1>AdminUserManagePage</h1>
    </div>
  );
};

export default withAuthRedirect(AdminUserManagePage, 'OnlyAdmin');