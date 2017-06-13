import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import HnAlien from './components';
import hackerNews from './reducers';


render(
  <Provider store={createStore(hackerNews)}>
    <HnAlien />
  </Provider>,
  document.getElementById('root')
);