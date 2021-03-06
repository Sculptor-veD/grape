import * as React from 'react';
//import Main from './components/MainComponents';
import {MemoiziedRootStack} from './components/MainComponents';
import {Provider} from 'react-redux';
import {ConfigureStore} from './components/redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Loading} from './components/LoadingComponent';
import {pushNotifications} from './services/index';
//Add something again
pushNotifications.configure();
const {persistor, store} = ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <MemoiziedRootStack />
      </PersistGate>
    </Provider>
  );
}

export default App;
