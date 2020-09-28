import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminJobManagePage(props){
  return(
    <div>
      <h1>AdminJobManagePage</h1>
    </div>
  );
};

export default withAuthRedirect(AdminJobManagePage, 'OnlyAdmin');