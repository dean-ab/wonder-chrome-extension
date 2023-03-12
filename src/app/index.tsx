import React from 'react';
import ReactDOM from 'react-dom/client';
import { Launcher } from './WonderApp/Launcher';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Launcher />
  </React.StrictMode>,
);
