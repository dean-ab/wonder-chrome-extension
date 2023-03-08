import React from 'react';
import ReactDOM from 'react-dom/client';
import { ExtensionMenu } from './ExtensionMenu';

ReactDOM.createRoot(document.getElementById('menu') as HTMLElement).render(
  <React.StrictMode>
    <ExtensionMenu />
  </React.StrictMode>,
);
