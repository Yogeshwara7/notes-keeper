# Notes Keeper App

A lightweight app to write, save, and manage personal notes.


---

## Run Locally

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd Notes-keeper
```

### 2. Set up Supabase
- Create a free account at [supabase.com](https://supabase.com)
- Create a new project
- Go to **SQL Editor** → paste and run `setup.sql`
- Go to **Settings → API** → copy your Project URL and anon key

#### Enable OAuth Providers (Optional)
To enable Google/GitHub login:

**Google OAuth:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/)
4. Add authorized redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
5. Copy Client ID and Secret to Supabase

**GitHub OAuth:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable GitHub provider
3. Create OAuth App at [GitHub Settings](https://github.com/settings/developers)
4. Add callback URL: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
5. Copy Client ID and Secret to Supabase

### 3. Add your Supabase keys

**Option A: Direct (Quick Start)**
Open `app.js` and update lines 2-3:
```js
const SUPABASE_URL = 'your_project_url';
const SUPABASE_KEY = 'your_anon_key';
```

**Option B: Using .env (Recommended for Production)**
1. Update `.env` file with your credentials:
```env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```
2. Set up a build tool (Vite recommended):
```bash
npm init -y
npm install vite
```
3. Update `app.js` to use `config.js`
4. Run with: `npx vite`

> **Note:** Plain HTML files cannot read .env directly. For production deployments, use environment variables in your hosting platform (Netlify, Vercel, etc.)

### 4. Open the app
Use VS Code **Live Server** extension — right-click `index.html` → Open with Live Server

Or run:
```bash
npx http-server . -p 3001
```
Open [http://localhost:3001](http://localhost:3001)

---

## Deploy on Netlify / GitHub Pages
This is a pure frontend app — no server needed.

**Netlify:**
1. Push this folder as a GitHub repo
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. No build command needed, publish directory is `/`
4. Deploy

**GitHub Pages:**
1. Push to GitHub
2. Repo Settings → Pages → Branch: main → Save

---

## Features
- User registration and login
- **OAuth login with Google & GitHub**
- Create notes with title and content
- Edit and delete notes
- Auto-save while typing (1.2s debounce)
- Search notes by keyword
- **Modern silver/grey UI theme**
- Responsive design
