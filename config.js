// Configuration loader
// For production: Set these as environment variables in your hosting platform
// For local dev: Values are loaded from .env (requires a build tool like Vite/Webpack)

const config = {
  supabase: {
    url: import.meta.env?.VITE_SUPABASE_URL || 'https://gzlgufleaukelahqwofx.supabase.co',
    anonKey: import.meta.env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6bGd1ZmxlYXVrZWxhaHF3b2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NjQ4MTgsImV4cCI6MjA5MzA0MDgxOH0.eQTq-kLKV7E9XYTOVZMosZuG41Gfgq5sJD8sZUaE778'
  }
};

// For plain HTML without build tools, credentials are embedded above
// To use .env properly, set up Vite or similar:
// 1. npm init -y
// 2. npm install vite
// 3. Create .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// 4. Run: npx vite
