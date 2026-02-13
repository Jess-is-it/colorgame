import { Navigate, createBrowserRouter } from 'react-router';

import FullLayout from 'src/layouts/full/FullLayout';
import FaceDetection from 'src/views/FaceDetection';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { index: true, element: <FaceDetection /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;
