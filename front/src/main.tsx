import { render } from 'solid-js/web';

// import { attachDevtoolsOverlay } from '@solid-devtools/overlay';

import App from './components/App';

import './main.css';

const root = document.getElementById('root');

render(() => <App />, root!);

// attachDevtoolsOverlay();
