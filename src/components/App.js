import React from 'react';
import { Account } from './accounts/Accounts'
import Theme from './Theme';

// import { Provider } from 'react-redux'
// import store from '../store'

// import Singup from './accounts/Singup';
// import Login from './accounts/Login'
// import Status from './accounts/Status';
// import Settings from './accounts/Settings';
// import ForgotPassword from './accounts/ForgotPassword';
// import Attributes from './accounts/Attributes';
// import RandomNumber from './accounts/RandomNumber';

function App() {
  return (
    <Account>
      {/* <Provider store={store}> */}
      {/* {console.log(store)} */}
      <Theme />
      {/* <Status />
      <Singup />
      <Login />
      <ForgotPassword />
      <Settings />
      <Attributes />
      <RandomNumber /> */}
      {/* </Provider> */}
    </Account>
  );
}

export default App;
