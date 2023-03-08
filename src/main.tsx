import React from 'react';
import ReactDOM from 'react-dom/client';
import { ExtensionMenu } from './menu/ExtensionMenu';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ExtensionMenu />
  </React.StrictMode>,
);
