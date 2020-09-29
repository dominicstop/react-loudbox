import React, { ReactElement } from 'react';
import * as Helpers from 'functions/helpers';


const LOADING_MODE = {
  IDLE   : 'IDLE'   ,
  LOADING: 'LOADING',
  ERROR  : 'ERROR'  ,
};

export function withFetchAPI(WrappedComonent, config){
  const API = config.fetchAPI;
  
  return class extends React.Component {
    constructor(props){
      super(props);

      const cachedData = API.getCached();

      this.state = {
        fetchData       : cachedData.data     ,
        fetchTimestamp  : cachedData.timestamp,
        fetchLoadingMode: LOADING_MODE.IDLE   ,
      };
    };

    componentDidMount(){
      const { fetchTimestamp } = this.state;

      if(!fetchTimestamp){
        this.getFetchData();
      };
    };

    getFetchData = async () => {
      await Helpers.setStateAsync(this, { 
        fetchLoadingMode: LOADING_MODE.LOADING
      });

      const fetchResult = await API.fetch();

      if(fetchResult.isSuccess){
        this.setState({
          fetchData       : fetchResult.data     ,
          fetchTimestamp  : fetchResult.timestamp,
          fetchLoadingMode: LOADING_MODE.IDLE    ,
        });

      } else {
        this.setState({
          fetchLoadingMode: LOADING_MODE.ERROR,
        });
      };
    };

    clearFetchData = () => {
      API.clearStore();
      this.setState({
        fetchData       : null,
        fetchTimestamp  : null,
        fetchLoadingMode: LOADING_MODE.IDLE,
      });
    };

    render(){
      const { fetchData, fetchTimestamp, fetchLoadingMode } = this.state;
      
      return(
        <WrappedComonent
          clearFetchData={this.clearFetchData}
          getFetchData={this.getFetchData}
          {...{fetchData, fetchTimestamp, fetchLoadingMode}}
        />
      );
    };
  };
};