import React from 'react';

import AuthStore from 'functions/AuthStore';

export default function HomePage(props){
  return(
    <div>
      <h1>Homepage</h1>
      <button onClick={() => {
        AuthStore.resetAuth();
        props.history.push('/login');
      }}>
        Log Out
      </button>
    </div>
  );
};