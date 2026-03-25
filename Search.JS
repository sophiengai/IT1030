const mockItems = [
    // Toys
    {
        id: 1,
        description: "Blue toy car with red wheels",
        type: "Toys",
        where: "School Library",
        date: "2025-03-05",
        time: "14:30",
        contact: "lostandfound@school.edu",
        remark: "Has a small scratch on the roof, brand: Hot Wheels",
        image: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Toy+Car"
    },
    {
        id: 2,
        description: "Pink teddy bear with ribbon",
        type: "Toys",
        where: "Kindergarten Playground",
        date: "2025-03-02",
        time: "10:15",
        contact: "teacher@school.edu",
        remark: "About 30cm tall, missing one eye button",
        image: "https://via.placeholder.com/300/FF69B4/FFFFFF?text=Teddy+Bear"
    },
    {
        id: 3,
        description: "Lego Star Wars set (Millennium Falcon)",
        type: "Toys",
        where: "Cafeteria Table 7",
        date: "2025-03-09",
        time: "12:45",
        contact: "cafeteria@school.edu",
        remark: "Missing 2 small pieces, in a black plastic bag",
        image: "https://via.placeholder.com/300/000000/FFFFFF?text=Lego+Set"
    },

    // Electronic devices
    {
        id: 4,
        description: "Black wireless headphones (Sony WH-1000XM5)",
        type: "Electronic devices",
        where: "Gym Locker Room",
        date: "2025-03-08",
        time: "18:15",
        contact: "gymadmin@school.edu / +1234567890",
        remark: "Case is red, fully charged, serial number: XM5-87654",
        image: "https://via.placeholder.com/300/808080/FFFFFF?text=Headphones"
    },
    {
        id: 5,
        description: "Silver iPad 9th Gen (10.2 inch)",
        type: "Electronic devices",
        where: "Computer Lab Room 302",
        date: "2025-03-10",
        time: "15:30",
        contact: "itdept@school.edu",
        remark: "No case, screen protector cracked, Apple ID locked",
        image: "https://via.placeholder.com/300/C0C0C0/FFFFFF?text=iPad"
    },
    {
        id: 6,
        description: "White Apple Watch Series 8 (45mm)",
        type: "Electronic devices",
        where: "Swimming Pool Changing Room",
        date: "2025-03-07",
        time: "09:20",
        contact: "poolmanager@school.edu",
        remark: "Black sports band, low battery, water damage on back",
        image: "https://via.placeholder.com/300/FFFFFF/000000?text=Apple+Watch"
    },

    // Daily Items
    {
        id: 7,
        description: "Black leather wallet with brown trim",
        type: "Daily Items",
        where: "Bus Stop #5",
        date: "2025-03-11",
        time: "08:45",
        contact: "security@school.edu",
        remark: "Contains student ID (ID: 20250311), no cash, 2 credit cards",
        image: "https://via.placeholder.com/300/2F4F4F/FFFFFF?text=Wallet"
    },
    {
        id: 8,
        description: "Stainless steel water bottle (Hydro Flask 32oz)",
        type: "Daily Items",
        where: "Basketball Court",
        date: "2025-03-04",
        time: "17:20",
        contact: "sportsdept@school.edu",
        remark: "Blue color, name 'Liam' engraved on the side",
        image: "https://via.placeholder.com/300/006400/FFFFFF?text=Water+Bottle"
    },
    {
        id: 9,
        description: "Black umbrella with rainbow handle",
        type: "Daily Items",
        where: "Main Entrance Lobby",
        date: "2025-03-06",
        time: "11:50",
        contact: "reception@school.edu",
        remark: "Auto-open, slightly bent frame, fabric has small tear",
        image: "https://via.placeholder.com/300/000000/FFFFFF?text=Umbrella"
    },

    // Clothes & Accessories
    {
        id: 10,
        description: "Navy blue hoodie (Nike XL size)",
        type: "Clothes & Accessories",
        where: "Auditorium Seat 12B",
        date: "2025-03-12",
        time: "19:00",
        contact: "auditorium@school.edu",
        remark: "White Nike swoosh, pocket has a keychain inside",
        image: "https://via.placeholder.com/300/000080/FFFFFF?text=Hoodie"
    },
    {
        id: 11,
        description: "Black baseball cap (New Era)",
        type: "Clothes & Accessories",
        where: "Track Field",
        date: "2025-03-03",
        time: "16:10",
        contact: "athletics@school.edu",
        remark: "Embroidered 'S' logo, adjustable strap, sweat stains inside",
        image: "https://via.placeholder.com/300/000000/FFFFFF?text=Baseball+Cap"
    },
    {
        id: 12,
        description: "Silver necklace with heart pendant",
        type: "Clothes & Accessories",
        where: "Bathroom Stall 3 (2nd Floor)",
        date: "2025-03-01",
        time: "13:30",
        contact: "cleaning@school.edu",
        remark: "Chain is 18 inches long, pendant has 'M' engraved",
        image: "https://via.placeholder.com/300/C0C0C0/FFFFFF?text=Necklace"
    },

    // Others
    {
        id: 13,
        description: "Math textbook (Algebra 2, 9th Edition)",
        type: "Others",
        where: "Classroom 205",
        date: "2025-03-13",
        time: "14:00",
        contact: "teacher.johnson@school.edu",
        remark: "Name 'Emma' written on cover, highlighted pages 10-25",
        image: "https://via.placeholder.com/300/FFFF00/000000?text=Textbook"
    },
    {
        id: 14,
        description: "Black backpack with star stickers",
        type: "Others",
        where: "Library Shelf D7",
        date: "2025-03-09",
        time: "11:15",
        contact: "librarian@school.edu",
        remark: "Contains 2 notebooks, a pencil case, and a USB drive",
        image: "https://via.placeholder.com/300/800080/FFFFFF?text=Backpack"
    },
    {
        id: 15,
        description: "Brown leather pencil case with zipper",
        type: "Others",
        where: "Art Room",
        date: "2025-03-05",
        time: "10:45",
        contact: "artteacher@school.edu",
        remark: "Inside has 3 colored pencils, 1 eraser, 1 sharpener",
        image: "https://via.placeholder.com/300/8B4513/FFFFFF?text=Pencil+Case"
    }
];

var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var typeFilter = document.getElementById("typeFilter");
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var sortBy = document.getElementById("sortBy");
var resultsContainer = document.getElementById("results");

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