import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function JobsPage(props){
  return(
    <div>
      <h1>JobsPage</h1>
    </div>
  );
};

export default withAuthRedirect(JobsPage, 'OnlyLoggedIn');