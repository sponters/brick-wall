import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './components/Game';
import store from './redux/store'
import { Provider } from 'react-redux'
import './engine/loop'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </React.StrictMode>
);
