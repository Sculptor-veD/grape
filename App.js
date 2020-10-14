import * as React from 'react';
import Main from './components/MainComponents';
import {Provider} from 'react-redux';
import {ConfigureStore} from './components/redux/configureStore';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Loading} from './components/LoadingComponent';

const {persistor, store} = ConfigureStore();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

export default App;
