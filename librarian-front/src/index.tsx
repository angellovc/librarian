import ReactDOM from 'react-dom';
import './index.css';
import './components/general.css';
import store from './store/store';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';


ReactDOM.render(
    <Provider store={store} >
        <AppRouter />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
