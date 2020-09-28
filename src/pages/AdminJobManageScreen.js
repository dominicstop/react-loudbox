import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminJobManageScreen(props){
  return(
    <div>
      <h1>AdminJobManageScreen</h1>
    </div>
  );
};

export default withAuthRedirect(AdminJobManageScreen, 'OnlyAdmin');