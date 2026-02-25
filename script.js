// Initialize Supabase
const _supabase = supabase.createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

const prayerForm = document.getElementById('prayerForm');
const entriesList = document.getElementById('entriesList');

// 1. Fetch data from database on load
async function fetchEntries() {
    const { data, error } = await _supabase
        .from('mosque_entries')
        .select('*')
        .order('id', { ascending: false });

    if (error) console.error(error);
    else renderEntries(data);
}

// 2. Add New Entry
prayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newEntry = {
        mosque_name: document.getElementById('mosqueName').value,
        prayer_date: document.getElementById('visitDate').value,
        prayer_type: document.getElementById('prayerType').value,
        likes: 0
    };

    const { error } = await _supabase.from('mosque_entries').insert([newEntry]);
    if (!error) {
        prayerForm.reset();
        fetchEntries(); // Refresh list
    }
});

// 3. Handle Like Click
async function handleLike(id, currentLikes) {
    const { error } = await _supabase
        .from('mosque_entries')
        .update({ likes: currentLikes + 1 })
        .eq('id', id);

    if (!error) fetchEntries(); // Refresh list to show new like count
}

// 4. Render to UI

function renderEntries(entries) {
    entriesList.innerHTML = '';
    entries.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'entry-card';
        div.innerHTML = `
            <div class="entry-info">
                <strong>${entry.mosque_name}</strong><br>
                <small>${entry.prayer_date} - ${entry.prayer_type}</small>
            </div>
            <button class="like-btn" onclick="handleLike(${entry.id}, ${entry.likes})">
                ❤️ <span>${entry.likes}</span>
            </button>
        `;
        entriesList.appendChild(div);
    });
}

fetchEntries();
