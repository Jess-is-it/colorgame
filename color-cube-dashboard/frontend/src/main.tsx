import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/css/globals.css';
import App from './App.tsx';
import Spinner from './views/spinner/Spinner.tsx';
import { CustomizerContextProvider } from './context/CustomizerContext.tsx';
import './utils/i18n';
import { SidebarProvider } from './context/sidebar-context/index.tsx';

async function deferRender() {
  const { worker } = await import('./api/mocks/browser.ts');
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

deferRender().then(() => {
  createRoot(document.getElementById('root')!).render(
    <CustomizerContextProvider>
      <SidebarProvider>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </SidebarProvider>
    </CustomizerContextProvider>,
  );
});
