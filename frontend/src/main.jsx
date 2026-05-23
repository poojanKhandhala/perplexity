import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './app/App.store';
import { Provider } from 'react-redux';
import App from './app/App'

createRoot(document.getElementById('root')).render(

  <Provider store ={store}>
       <App/>
  </Provider>


);
