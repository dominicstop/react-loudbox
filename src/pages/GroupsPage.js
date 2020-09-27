import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function GroupsPage(props){
  return(
    <div>
      <h1>GroupsPage</h1>
    </div>
  );
};

export default withAuthRedirect(GroupsPage, 'OnlyLoggedIn');
