import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function ProfilePage(props){
  return(
    <div>
      <h1>ProfilePage</h1>
    </div>
  );
};

export default withAuthRedirect(ProfilePage, 'OnlyLoggedIn');