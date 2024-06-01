import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import PhonesPage from './pages/PhonesPage';
import { StrictMode } from 'react';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" Component={HomePage} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="phones" Component={PhonesPage} />
            <Route path="*" Component={PageNotFound} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  );
}
