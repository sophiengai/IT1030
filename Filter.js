document.addEventListener('DOMContentLoaded', function() {

    var lostItemsDatabase = [];


    var CATEGORIES = {
        'toys':        { name: 'Toys',                    desc: 'Toys & Games',        color: '#f59e0b', image: 'images/toys.jpg'        },
        'daily':       { name: 'Daily Items',             desc: 'Everyday Essentials', color: '#10b981', image: 'images/daily.jpg'       },
        'electronics': { name: 'Electronic Devices',      desc: 'Gadgets & Tech',      color: '#3b82f6', image: 'images/electronics.jpg' },
        'clothes':     { name: 'Clothes & Accessories',   desc: 'Fashion & Wearables', color: '#ec4899', image: 'images/clothes.jpg'     },
        'others':      { name: 'Others',                  desc: 'Miscellaneous',       color: '#8b5cf6', image: 'images/others.jpg'      },
    };

    function buildCategoryGrid() {
        var grid = document.querySelector('.category-grid');
        grid.innerHTML = '';
        Object.entries(CATEGORIES).forEach(([key, cat]) => {
            grid.innerHTML += `
                <label class="category-item">
                    <input type="checkbox" name="category" value="${key}">
                    <div class="category-card">
                        <div class="category-icon ${key}" style="box-shadow: 0 4px 12px ${cat.color}4D">
                            <img src="${cat.image}" alt="${cat.name}">
                        </div>
                        <span>${cat.name}</span>
                        <span class="category-desc">${cat.desc}</span>
                    </div>
                </label>
            `;
        });
    }
    buildCategoryGrid();


    var filterForm = document.getElementById('filterForm');
    var resetBtn = document.getElementById('resetBtn');
    var startDateInput = document.getElementById('startDate');
    var endDateInput = document.getElementById('endDate');
    var quickDateBtns = document.querySelectorAll('.quick-date-btn');
    var categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    var selectedFiltersContainer = document.getElementById('selectedFilters');
    var resultCount = document.getElementById('resultCount');
    var resultsList = document.getElementById('resultsList');
    var matchCount = document.getElementById('matchCount');
    var resultsSection = document.getElementById('resultsSection');


    var today = new Date().toISOString().split('T')[0];
    startDateInput.max = today;
    endDateInput.max = today;


    function filterItems() {
        var selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        var startDate = startDateInput.value;
        var endDate = endDateInput.value;

        let results = lostItemsDatabase;

        if (selectedCategories.length > 0) {
            results = results.filter(item => selectedCategories.includes(item.category));
        }

        if (startDate) {
            results = results.filter(item => item.lostDate >= startDate);
        }

        if (endDate) {
            results = results.filter(item => item.lostDate <= endDate);
        }

        results.sort((a, b) => b.lostDate.localeCompare(a.lostDate));

        return results;
    }

    function renderResults(items) {
        matchCount.textContent = `${items.length} records found`;

        if (items.length === 0) {
            resultsList.innerHTML = `
                <div class="no-results">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                        <line x1="8" y1="8" x2="14" y2="14"></line>
                    </svg>
                    <p>No matching lost items found</p>
                    <span>Try adjusting your filters and search again</span>
                </div>
            `;
            return;
        }

        let html = '';
        items.forEach((item, index) => {
            var color = CATEGORIES[item.category].color;
            var catName = CATEGORIES[item.category].name;
            var dateFormatted = formatDate(item.lostDate);

            html += `
                <div class="result-item" style="animation-delay: ${index * 0.05}s">
                    <div class="item-color-bar" style="background: ${color}"></div>
                    <div class="item-content">
                        <div class="item-top">
                            <h4 class="item-name">${item.name}</h4>
                            <span class="item-category" style="background: ${color}20; color: ${color}; border: 1px solid ${color}40">${catName}</span>
                        </div>
                        <p class="item-description">${item.description}</p>
                        <div class="item-meta">
                            <span class="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                ${dateFormatted}
                            </span>
                            <span class="meta-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                ${item.location}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });

        resultsList.innerHTML = html;
    }

    function updateFilterDisplay() {
        var selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        var startDate = startDateInput.value;
        var endDate = endDateInput.value;

        let filterTags = [];
        let count = 0;

        selectedCategories.forEach(cat => {
            count++;
            filterTags.push(createFilterTag(CATEGORIES[cat].name, 'category', cat));
        });

        if (startDate || endDate) {
            count++;
            let dateText = '';
            if (startDate && endDate) {
                dateText = `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
            } else if (startDate) {
                dateText = `From ${formatDate(startDate)}`;
            } else {
                dateText = `Until ${formatDate(endDate)}`;
            }
            filterTags.push(createFilterTag(dateText, 'date', 'date'));
        }

        if (filterTags.length > 0) {
            selectedFiltersContainer.innerHTML = filterTags.join('');
            resultCount.textContent = `${count} selected`;
        } else {
            selectedFiltersContainer.innerHTML = '<p class="no-filter">No filters applied</p>';
            resultCount.textContent = '0 selected';
        }

        document.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', handleTagRemove);
        });
    }

    function createFilterTag(text, type, value) {
        return `
            <span class="filter-tag" data-type="${type}" data-value="${value}">
                ${text}
                <button type="button" class="tag-remove" data-type="${type}" data-value="${value}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </span>
        `;
    }

    function formatDate(dateStr) {
        var date = new Date(dateStr + 'T00:00:00');
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    var handleTagRemove(e) {
        e.preventDefault();
        e.stopPropagation();

        var type = this.dataset.type;
        var value = this.dataset.value;

        if (type === 'category') {
            var checkbox = document.querySelector(`input[name="category"][value="${value}"]`);
            if (checkbox) {
                checkbox.checked = false;
            }
        } else if (type === 'date') {
            startDateInput.value = '';
            endDateInput.value = '';
            quickDateBtns.forEach(btn => btn.classList.remove('active'));
        }

        updateFilterDisplay();
    }

    quickDateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            var days = parseInt(this.dataset.days);

            quickDateBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (days === 0) {
                startDateInput.value = '';
                endDateInput.value = '';
            } else {
                var end = new Date();
                var start = new Date();
                start.setDate(start.getDate() - days);

                endDateInput.value = end.toISOString().split('T')[0];
                startDateInput.value = start.toISOString().split('T')[0];
            }

            updateFilterDisplay();
        });
    });

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFilterDisplay);
    });

    startDateInput.addEventListener('change', function() {
        quickDateBtns.forEach(btn => btn.classList.remove('active'));
        if (endDateInput.value && this.value > endDateInput.value) {
            endDateInput.value = this.value;
        }
        updateFilterDisplay();
    });

    endDateInput.addEventListener('change', function() {
        quickDateBtns.forEach(btn => btn.classList.remove('active'));
        if (startDateInput.value && this.value < startDateInput.value) {
            startDateInput.value = this.value;
        }
        updateFilterDisplay();
    });

    resetBtn.addEventListener('click', function() {
        categoryCheckboxes.forEach(cb => cb.checked = false);
        startDateInput.value = '';
        endDateInput.value = '';
        quickDateBtns.forEach(btn => btn.classList.remove('active'));

        updateFilterDisplay();

        resultsList.innerHTML = '<p class="no-results">Select filters and click "Search" to view results</p>';
        matchCount.textContent = '0 records found';
    });

    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var results = filterItems();

        renderResults(results);

        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    updateFilterDisplay();
});
