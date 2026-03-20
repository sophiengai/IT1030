var searchInput = document.getElementById('searchInput');
var searchBtn = document.getElementById('searchBtn');
var typeFilter = document.getElementById('typeFilter');
var startDate = document.getElementById('startDate');
var endDate = document.getElementById('endDate');
var sortBy = document.getElementById('sortBy');
var resultsContainer = document.getElementById('results');

renderItems(mockItems);

searchBtn.addEventListener('click', filterAndSortItems);
[typeFilter, startDate, endDate, sortBy].forEach(el => {
    el.addEventListener('change', filterAndSortItems);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') filterAndSortItems();
});

function filterAndSortItems() {
    let filtered = [...mockItems];

    var keyword = searchInput.value.trim().toLowerCase();
    if (keyword) {
        filtered = filtered.filter(item => 
            item.description.toLowerCase().includes(keyword) ||
            item.where.toLowerCase().includes(keyword) ||
            item.remark.toLowerCase().includes(keyword)
        );
    }

    var type = typeFilter.value;
    if (type !== 'all') {
        filtered = filtered.filter(item => item.type === type);
    }

    var start = startDate.value;
    var end = endDate.value;
    if (start) {
        filtered = filtered.filter(item => new Date(item.date) >= new Date(start));
    }
    if (end) {
        filtered = filtered.filter(item => new Date(item.date) <= new Date(end));
    }

    var sortOption = sortBy.value;
    if (sortOption === 'newest') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === 'oldest') {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === 'az') {
        filtered.sort((a, b) => a.description.localeCompare(b.description));
    }

    renderItems(filtered);
}

function renderItems(items) {
    resultsContainer.innerHTML = '';

    if (items.length === 0) {
        resultsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">No items found matching your search criteria.</p>';
        return;
    }

    items.forEach(item => {
        var card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.description}">
            <h3>${item.description}</h3>
            <p><strong>Category:</strong> ${item.type}</p>
            <p><strong>Found at:</strong> ${item.where} (${item.date} ${item.time})</p>
            <p><strong>Contact:</strong> ${item.contact}</p>
            <p><strong>Notes:</strong> ${item.remark}</p>
        `;
        resultsContainer.appendChild(card); 
    });
}