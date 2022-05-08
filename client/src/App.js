import './App.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';

function App() {
  return (
    <Provider store={store}>
    <div>
      <BrowserRouter>
      <MainComponent/>
      </BrowserRouter>
    </div>
   </Provider>
  );
}

export default App;
