import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';


function CalendarPage(props){
  return(
    <div>
      <h1>CalendarPage</h1>
    </div>
  );
};

export default withAuthRedirect(CalendarPage, 'OnlyUser');
