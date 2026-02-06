import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router';

import FullLayout from 'src/layouts/full/FullLayout';
import ColorCubeDashboard from 'src/views/dashboards/ColorCubeDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { index: true, element: <ColorCubeDashboard /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;

