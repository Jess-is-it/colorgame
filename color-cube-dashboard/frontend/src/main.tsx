import { createRoot } from 'react-dom/client';
import './css/globals.css';
import App from './App';
import { CustomizerContextProvider } from './context/CustomizerContext';

createRoot(document.getElementById('root')!).render(
  <CustomizerContextProvider>
    <App />
  </CustomizerContextProvider>,
);
