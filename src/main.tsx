import React from 'react';
import ReactDOM from 'react-dom/client';
import { ExtensionMenu } from './menu/ExtensionMenu';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ExtensionMenu />
  </React.StrictMode>,
);
