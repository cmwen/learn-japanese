import App from './App.svelte';
import './styles/global.css';
import { initI18n } from './lib/i18n';

// Initialize i18n and then mount the Svelte app
initI18n().then(() => {
  new App({
    target: document.getElementById('app'),
  });
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
