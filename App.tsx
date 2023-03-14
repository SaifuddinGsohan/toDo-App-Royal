import React from 'react'
import AppContainer from './src/components/app-container'
import Navigator from './src/'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/state/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer>
          <Navigator />
        </AppContainer>
      </PersistGate>
    </Provider>
  )
}
