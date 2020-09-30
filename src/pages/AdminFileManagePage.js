import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { withAuthRedirect } from 'hoc/withAuthRedirect';
import { FileManagement } from 'api/FileManagement';
import * as Helpers from 'functions/helpers';
import { withFetchAPI } from 'hoc/withFetchAPI';


const LOADING_MODE = {
  IDLE   : 'IDLE'   ,
  LOADING: 'LOADING',
  ERROR  : 'ERROR'  ,
};

class AdminFileManagePage extends React.Component {
  render(){
    const { fetchData, fetchTimestamp, fetchLoadingMode } = this.props;
    return(
      <div>
        <h1>AdminFileManagePage</h1>
        <p>{`fetchData files count : ${fetchData?.length}`}</p>
        <p>{`fetchLoadingMode: ${fetchLoadingMode }`}</p>
        <p>{`fetchTimestamp  : ${fetchTimestamp   }`}</p>
        <button onClick={() => {
          this.props.clearFetchData();
        }}>
          clear
        </button>
      </div>
    );
  };
};


const pageWithAPI = withFetchAPI(AdminFileManagePage, {
  fetchAPI    : FileManagement,
  fetchOnMount: true,
});

export default withAuthRedirect(pageWithAPI, 'OnlyAdmin');
