import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import './App.scss';

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="main">
          <div className="container">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
