import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

import './styles/global.scss';
import './styles/tailwind.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
      <App />
     </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);