import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';
import { AllUsersList } from 'api/AllUsersList';
import { withFetchAPI } from 'hoc/withFetchAPI';


function AdminUserManagePage(props){
  return(
    <div>
      <h1>AdminUserManagePage</h1>
      <p>{`fetchData count : ${props.fetchData?.results?.length}`}</p>
      <p>{`fetchLoadingMode: ${props.fetchLoadingMode }`}</p>
      <p>{`fetchTimestamp  : ${props.fetchTimestamp   }`}</p>
      <button onClick={() => {
        props.clearFetchData();
      }}>
        clear
      </button>
    </div>
  );
};

const pageWithAPI = withFetchAPI(AdminUserManagePage, {
  fetchAPI    : AllUsersList,
  fetchOnMount: true,
});

export default withAuthRedirect(pageWithAPI, 'OnlyAdmin');