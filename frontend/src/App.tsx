import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RideRequest from './pages/RideRequest';
import RideOptions from './pages/RideOptions';
import RideHistory from './pages/RideHistory';
import ErrorPage from './pages/ErrorPage';

import Layout from './components/styled/Layout';
import RedirectToRequest from './components/RedirectToRequest';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<RedirectToRequest />} />
          <Route path='/request' element={<RideRequest />} />
          <Route path='/options' element={<RideOptions />} />
          <Route path='/history' element={<RideHistory />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
      <ToastContainer position='bottom-center' autoClose={10000}/>
    </BrowserRouter>
  );
};

export default App;
