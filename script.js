const prayerForm = document.getElementById('prayerForm');
const tableBody = document.getElementById('tableBody');

// Load existing data from local storage on page load
window.onload = () => {
    const savedEntries = JSON.parse(localStorage.getItem('mosqueEntries')) || [];
    savedEntries.forEach(entry => addRowToTable(entry));
};

prayerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const entry = {
        name: document.getElementById('mosqueName').value,
        date: document.getElementById('visitDate').value,
        prayer: document.getElementById('prayerType').value
    };

    // Save to Local Storage
    const savedEntries = JSON.parse(localStorage.getItem('mosqueEntries')) || [];
    savedEntries.push(entry);
    localStorage.setItem('mosqueEntries', JSON.stringify(savedEntries));

    addRowToTable(entry);
    prayerForm.reset();
});

function addRowToTable(entry) {
    const row = `<tr>
        <td>${entry.name}</td>
        <td>${entry.date}</td>
        <td>${entry.prayer}</td>
    </tr>`;
    tableBody.innerHTML += row;
}
