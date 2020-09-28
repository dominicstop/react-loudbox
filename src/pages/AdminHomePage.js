import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function AdminHomePage(props){
  return(
    <div>
      <h1>AdminHomePage</h1>
    </div>
  );
};

export default withAuthRedirect(AdminHomePage, 'OnlyAdmin');