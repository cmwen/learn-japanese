import App from './App.svelte';
import './styles/global.css';
import { initI18n } from './lib/i18n';
import { theme } from './lib/stores';

// Function to apply the theme to the body
function applyTheme(newTheme) {
  const themes = ['theme-light', 'theme-dark', 'theme-ocean-blue', 'theme-forest-green', 'theme-high-contrast'];
  document.body.classList.remove(...themes);
  if (newTheme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.add(prefersDark ? 'theme-dark' : 'theme-light');
  } else {
    document.body.classList.add(`theme-${newTheme}`);
  }
}

// Subscribe to theme changes
theme.subscribe(applyTheme);

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
