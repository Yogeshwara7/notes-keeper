# Notes Keeper App

A lightweight app to write, save, and manage personal notes.

## Demo Credentials
| Role    | Email            | Password    |
|---------|------------------|-------------|
| Student | student@demo.com | Student@123 |

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

### 3. Add your Supabase keys
Open `app.js` and update:
```js
const SUPABASE_URL = 'your_project_url';
const SUPABASE_KEY = 'your_anon_key';
```

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
- Create notes with title and content
- Edit and delete notes
- Auto-save while typing
- Search notes by keyword
