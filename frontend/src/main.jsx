import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './app/App.routes';
import { store } from './app/App.store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(

    <Provider store={store}>

      <RouterProvider router={router} />

    </Provider>


);
