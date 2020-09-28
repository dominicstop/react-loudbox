import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminFileManageScreen(props){
  return(
    <div>
      <h1>AdminFileManageScreen</h1>
    </div>
  );
};

export default withAuthRedirect(AdminFileManageScreen, 'OnlyAdmin');