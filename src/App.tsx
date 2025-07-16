import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';

import { routes } from './config/router';

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      {routes.map((route) => (
        <Route
          key={route.label}
          element={<route.component />}
          path={route.href}
        />
      ))}
    </Routes>
  );
}

export default App;
