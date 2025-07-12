import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initSupabase } from './lib/supabase';
import App from './App.jsx';
import './index.css';

// Initialize Supabase before rendering the app
initSupabase()
  .then(() => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch(error => {
    console.error('Failed to initialize app:', error);
    // Show error state to user
    document.getElementById('root').innerHTML = `
      <div style="color: red; padding: 20px;">
        Failed to initialize application. Please try again later.
      </div>
    `;
  });