const SUPABASE_URL = 'https://gzlgufleaukelahqwofx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6bGd1ZmxlYXVrZWxhaHF3b2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NjQ4MTgsImV4cCI6MjA5MzA0MDgxOH0.eQTq-kLKV7E9XYTOVZMosZuG41Gfgq5sJD8sZUaE778';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser = null;
let currentNoteId = null;

// ─── Auth screens ─────────────────────────────────────────────────────────────
function showRegister() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('register-screen').classList.remove('hidden');
}
function showLogin() {
  document.getElementById('register-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
}

async function register() {
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value;
  const err      = document.getElementById('reg-error');

  if (!username || !password) return (err.textContent = 'All fields required.');

  // Use username as email prefix for Supabase auth
  const email = `${username}@noteskeeper.app`;
  const { error } = await sb.auth.signUp({
    email, password,
    options: { data: { username } }
  });
  if (error) return (err.textContent = error.message);
  err.style.color = '#48bb78';
  err.textContent = 'Account created! Sign in now.';
  setTimeout(showLogin, 1000);
}

async function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const err      = document.getElementById('login-error');

  const email = `${username}@noteskeeper.app`;
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) return (err.textContent = 'Invalid username or password.');

  currentUser = data.user;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');
  document.getElementById('user-label').textContent = `Hi, ${username}`;
  renderNotes();
}

async function logout() {
  await sb.auth.signOut();
  currentUser = null;
  currentNoteId = null;
  document.getElementById('app-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').textContent = '';
}

// ─── Notes ────────────────────────────────────────────────────────────────────
function newNote() {
  currentNoteId = null;
  document.getElementById('note-title').value   = '';
  document.getElementById('note-content').value = '';
  document.getElementById('save-status').textContent = '';
  showEditor();
  document.querySelectorAll('.note-item').forEach(el => el.classList.remove('active'));
}

async function saveNote() {
  const title   = document.getElementById('note-title').value.trim() || 'Untitled';
  const content = document.getElementById('note-content').value;

  if (currentNoteId) {
    await sb.from('notes').update({ title, content, updated_at: new Date().toISOString() }).eq('id', currentNoteId);
  } else {
    const { data } = await sb.from('notes').insert({
      user_id: currentUser.id, title, content
    }).select().single();
    if (data) currentNoteId = data.id;
  }

  document.getElementById('save-status').textContent = 'Saved ✓';
  setTimeout(() => (document.getElementById('save-status').textContent = ''), 2000);
  renderNotes();
}

async function deleteNote() {
  if (!currentNoteId || !confirm('Delete this note?')) return;
  await sb.from('notes').delete().eq('id', currentNoteId);
  currentNoteId = null;
  hideEditor();
  renderNotes();
}

async function openNote(id) {
  const { data } = await sb.from('notes').select('*').eq('id', id).single();
  if (!data) return;
  currentNoteId = data.id;
  document.getElementById('note-title').value   = data.title;
  document.getElementById('note-content').value = data.content;
  document.getElementById('save-status').textContent = '';
  showEditor();
  document.querySelectorAll('.note-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === String(id));
  });
}

async function renderNotes() {
  const query = document.getElementById('search-input').value.toLowerCase();
  let req = sb.from('notes').select('*').eq('user_id', currentUser.id).order('updated_at', { ascending: false });
  if (query) req = req.or(`title.ilike.%${query}%,content.ilike.%${query}%`);

  const { data: notes } = await req;
  const list = document.getElementById('notes-list');
  list.innerHTML = notes?.length
    ? notes.map(n => `
        <div class="note-item ${n.id === currentNoteId ? 'active' : ''}" data-id="${n.id}" onclick="openNote('${n.id}')">
          <div class="note-item-title">${escapeHtml(n.title)}</div>
          <div class="note-item-preview">${escapeHtml((n.content||'').slice(0, 60))}</div>
        </div>`).join('')
    : '<p style="color:#aaa;font-size:0.85rem;text-align:center;margin-top:1rem;">No notes found</p>';
}

function showEditor() {
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('editor').classList.remove('hidden');
}
function hideEditor() {
  document.getElementById('editor').classList.add('hidden');
  document.getElementById('empty-state').classList.remove('hidden');
}
function escapeHtml(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Auto-save debounced
let autoSaveTimer;
['note-title', 'note-content'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => { if (currentUser) saveNote(); }, 1200);
  });
});

// ─── Init ─────────────────────────────────────────────────────────────────────
sb.auth.getSession().then(({ data }) => {
  if (data.session) {
    currentUser = data.session.user;
    const username = currentUser.user_metadata?.username || currentUser.email;
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    document.getElementById('user-label').textContent = `Hi, ${username}`;
    renderNotes();
  }
});
