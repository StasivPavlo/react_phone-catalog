import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import PhonesPage from './pages/PhonesPage';

const root = createRoot(document.body);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" Component={HomePage} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="phones" Component={PhonesPage} />
        <Route path="*" Component={PageNotFound} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
