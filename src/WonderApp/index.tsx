import ReactDOM from 'react-dom/client';
import { Launcher } from './Launcher';

export function bootstrap() {
  const hostElement = document.createElement('div');
  hostElement.setAttribute('id', 'wonder-app');

  document.body.appendChild(hostElement);

  ReactDOM.createRoot(hostElement).render(<Launcher />);
}
