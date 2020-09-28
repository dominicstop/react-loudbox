import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminFileManagePage(props){
  return(
    <div>
      <h1>AdminFileManagePage</h1>
    </div>
  );
};

export default withAuthRedirect(AdminFileManagePage, 'OnlyAdmin');