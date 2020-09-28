import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function FileManagerPage(props){
  return(
    <div>
      <h1>FileManagerPage</h1>
    </div>
  );
};

export default withAuthRedirect(FileManagerPage, 'OnlyUser');