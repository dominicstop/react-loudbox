import * as Endpoints from 'constants/Endpoints';
import { RegisterModel } from 'models/RegisterPayload';



export class Register {

  static async register(){
    try {
      // first, query login API if login is valid
      const response = await fetch(Endpoints.registerURL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json',  },
        body: {
          ...RegisterModel.factory({
            id: '123'
          })
        }
      });

      console.log('register response raw', response);


      // then parse response and check if login success
      const json      = await response.json();

      console.log('register response json', json);

    } catch(error){
      console.log('register error', error);
    };
  };
};