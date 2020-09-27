import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function BidsPage(props){
  return(
    <div>
      <h1>BidsPage</h1>
    </div>
  );
};

export default withAuthRedirect(BidsPage, 'OnlyLoggedIn');