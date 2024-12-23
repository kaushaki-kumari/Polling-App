import React from 'react';
import LoginPage from './components/LoginPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
};

export default App;
