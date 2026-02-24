// ===================================
// HOARD PAGE — Collection & Charts
// ===================================

const HOARD_DATA = [
    { id: 1, name: "Charizard VMAX", series: "Sword & Shield - Champions Path", rarity: "Secret Rare", image: "", price: 3500000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 2, name: "Pikachu VMAX (Rainbow)", series: "Sword & Shield - Vivid Voltage", rarity: "Secret Rare", image: "", price: 2800000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 3, name: "Umbreon VMAX (Alternate Art)", series: "Sword & Shield - Evolving Skies", rarity: "Secret Rare", image: "", price: 4200000, currency: "IDR", condition: "Mint", quantity: 1 },
    { id: 4, name: "Mewtwo GX (Shiny)", series: "Sun & Moon - Hidden Fates", rarity: "Ultra Rare", image: "", price: 1500000, currency: "IDR", condition: "Near Mint", quantity: 2 },
    { id: 5, name: "Rayquaza VMAX (Alternate Art)", series: "Sword & Shield - Evolving Skies", rarity: "Secret Rare", image: "", price: 3800000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 6, name: "Eevee (Full Art Promo)", series: "SWSH Promo", rarity: "Promo", image: "", price: 450000, currency: "IDR", condition: "Near Mint", quantity: 3 },
    { id: 7, name: "Gengar VMAX", series: "Sword & Shield - Fusion Strike", rarity: "Ultra Rare", image: "", price: 850000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 8, name: "Arceus VSTAR (Gold)", series: "Sword & Shield - Brilliant Stars", rarity: "Secret Rare", image: "", price: 1200000, currency: "IDR", condition: "Mint", quantity: 1 },
    { id: 9, name: "Moonbreon (Umbreon V Alt Art)", series: "Sword & Shield - Evolving Skies", rarity: "Ultra Rare", image: "", price: 2100000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 10, name: "Dragonite V (Alt Art)", series: "Sword & Shield - Evolving Skies", rarity: "Ultra Rare", image: "", price: 950000, currency: "IDR", condition: "Played", quantity: 1 },
    { id: 11, name: "Giratina VSTAR (Gold)", series: "Sword & Shield - Lost Origin", rarity: "Secret Rare", image: "", price: 1800000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 12, name: "Sylveon VMAX (Alt Art)", series: "Sword & Shield - Evolving Skies", rarity: "Secret Rare", image: "", price: 2500000, currency: "IDR", condition: "Mint", quantity: 1 },
    { id: 13, name: "Mew VMAX (Alt Art)", series: "Sword & Shield - Fusion Strike", rarity: "Secret Rare", image: "", price: 1600000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 14, name: "Lugia V (Alt Art)", series: "Sword & Shield - Silver Tempest", rarity: "Ultra Rare", image: "", price: 1100000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 15, name: "Snorlax (Full Art)", series: "Sword & Shield - Chilling Reign", rarity: "Rare Holo", image: "", price: 350000, currency: "IDR", condition: "Near Mint", quantity: 2 },
    { id: 16, name: "Blaziken VMAX", series: "Sword & Shield - Chilling Reign", rarity: "Ultra Rare", image: "", price: 650000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 17, name: "Espeon VMAX (Alt Art)", series: "Sword & Shield - Evolving Skies", rarity: "Secret Rare", image: "", price: 2000000, currency: "IDR", condition: "Near Mint", quantity: 1 },
    { id: 18, name: "Palkia VSTAR (Gold)", series: "Sword & Shield - Astral Radiance", rarity: "Secret Rare", image: "", price: 900000, currency: "IDR", condition: "Near Mint", quantity: 1 }
];

document.addEventListener('DOMContentLoaded', () => {
    const hoardData = HOARD_DATA;

    // --- DOM Elements ---
    const cardGrid = document.getElementById('cardGrid');
    const searchInput = document.getElementById('searchInput');
    const seriesFilter = document.getElementById('seriesFilter');
    const rarityFilter = document.getElementById('rarityFilter');
    const sortSelect = document.getElementById('sortSelect');
    const noResults = document.getElementById('noResults');

    // --- Populate Filters ---
    const series = [...new Set(hoardData.map(c => c.series))].sort();
    const rarities = [...new Set(hoardData.map(c => c.rarity))].sort();

    series.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        seriesFilter.appendChild(opt);
    });

    rarities.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r;
        opt.textContent = r;
        rarityFilter.appendChild(opt);
    });

    // --- Format Currency ---
    function formatIDR(num) {
        return 'Rp ' + num.toLocaleString('id-ID');
    }

    // --- Rarity Class ---
    function getRarityClass(rarity) {
        const map = {
            'Secret Rare': 'rarity-secret-rare',
            'Ultra Rare': 'rarity-ultra-rare',
            'Rare Holo': 'rarity-rare-holo',
            'Promo': 'rarity-promo'
        };
        return map[rarity] || 'rarity-rare-holo';
    }

    // --- Render Cards ---
    function renderCards() {
        const search = searchInput.value.toLowerCase();
        const seriesVal = seriesFilter.value;
        const rarityVal = rarityFilter.value;
        const sortVal = sortSelect.value;

        let filtered = hoardData.filter(card => {
            const matchSearch = card.name.toLowerCase().includes(search) || card.series.toLowerCase().includes(search);
            const matchSeries = !seriesVal || card.series === seriesVal;
            const matchRarity = !rarityVal || card.rarity === rarityVal;
            return matchSearch && matchSeries && matchRarity;
        });

        // Sort
        switch (sortVal) {
            case 'name-asc': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
            case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
            case 'rarity': {
                const order = { 'Secret Rare': 0, 'Ultra Rare': 1, 'Rare Holo': 2, 'Promo': 3 };
                filtered.sort((a, b) => (order[a.rarity] ?? 99) - (order[b.rarity] ?? 99));
                break;
            }
        }

        cardGrid.innerHTML = '';

        if (filtered.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        filtered.forEach(card => {
            const el = document.createElement('div');
            el.className = 'hoard-card';
            el.innerHTML = `
                <div class="card-image-wrap">
                    ${card.image ? `<img src="${card.image}" alt="${card.name}">` : `<div class="card-placeholder">🃏</div>`}
                </div>
                <div class="card-body">
                    <div class="card-name">${card.name}</div>
                    <div class="card-series">${card.series}</div>
                    <div class="card-meta">
                        <span class="rarity-badge ${getRarityClass(card.rarity)}">${card.rarity}</span>
                        <span class="card-price">${formatIDR(card.price)}</span>
                    </div>
                    <div class="card-meta" style="margin-top: 6px;">
                        <span class="card-quantity">Qty: ${card.quantity}</span>
                        <span class="card-condition">${card.condition}</span>
                    </div>
                </div>
            `;
            cardGrid.appendChild(el);
        });
    }

    // --- Event Listeners ---
    searchInput.addEventListener('input', renderCards);
    seriesFilter.addEventListener('change', renderCards);
    rarityFilter.addEventListener('change', renderCards);
    sortSelect.addEventListener('change', renderCards);

    // --- Summary Stats ---
    const totalCards = hoardData.reduce((sum, c) => sum + c.quantity, 0);
    const uniqueCards = hoardData.length;
    const totalValue = hoardData.reduce((sum, c) => sum + c.price * c.quantity, 0);
    const avgPrice = Math.round(totalValue / totalCards);

    document.getElementById('totalValue').textContent = formatIDR(totalValue);
    document.getElementById('totalCards').textContent = totalCards;
    document.getElementById('uniqueCards').textContent = uniqueCards;
    document.getElementById('avgPrice').textContent = formatIDR(avgPrice);

    // --- Charts ---
    const chartColors = {
        gold: '#d4a017',
        goldBright: '#f5c542',
        ice: '#4da6c9',
        silver: '#c0c5ce',
        purple: '#a855f7',
        emerald: '#34d399',
        rose: '#fb7185',
        amber: '#fbbf24',
        sky: '#38bdf8',
        indigo: '#818cf8',
    };

    const colorPalette = [
        chartColors.gold, chartColors.ice, chartColors.purple,
        chartColors.emerald, chartColors.rose, chartColors.amber,
        chartColors.sky, chartColors.indigo, chartColors.silver, chartColors.goldBright
    ];

    // Value by Series — bar chart
    const seriesValueMap = {};
    hoardData.forEach(card => {
        if (!seriesValueMap[card.series]) seriesValueMap[card.series] = 0;
        seriesValueMap[card.series] += card.price * card.quantity;
    });

    const seriesLabels = Object.keys(seriesValueMap).map(s => {
        return s.replace('Sword & Shield - ', 'S&S ').replace('Sun & Moon - ', 'S&M ');
    });
    const seriesValues = Object.values(seriesValueMap);

    new Chart(document.getElementById('seriesChart'), {
        type: 'bar',
        data: {
            labels: seriesLabels,
            datasets: [{
                label: 'Value (IDR)',
                data: seriesValues,
                backgroundColor: colorPalette.slice(0, seriesLabels.length).map(c => c + '40'),
                borderColor: colorPalette.slice(0, seriesLabels.length),
                borderWidth: 1,
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => formatIDR(ctx.raw)
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#5a6d80',
                        callback: v => 'Rp ' + (v / 1000000).toFixed(1) + 'M',
                        font: { size: 11 }
                    },
                    grid: { color: 'rgba(77, 166, 201, 0.08)' }
                },
                x: {
                    ticks: {
                        color: '#5a6d80',
                        font: { size: 10 },
                        maxRotation: 45,
                        minRotation: 30
                    },
                    grid: { display: false }
                }
            }
        }
    });

    // Rarity Distribution — doughnut chart
    const rarityCountMap = {};
    hoardData.forEach(card => {
        if (!rarityCountMap[card.rarity]) rarityCountMap[card.rarity] = 0;
        rarityCountMap[card.rarity] += card.quantity;
    });

    const rarityLabels = Object.keys(rarityCountMap);
    const rarityCounts = Object.values(rarityCountMap);

    const rarityColorMap = {
        'Secret Rare': chartColors.gold,
        'Ultra Rare': chartColors.ice,
        'Rare Holo': chartColors.silver,
        'Promo': chartColors.purple
    };

    new Chart(document.getElementById('rarityChart'), {
        type: 'doughnut',
        data: {
            labels: rarityLabels,
            datasets: [{
                data: rarityCounts,
                backgroundColor: rarityLabels.map(r => (rarityColorMap[r] || chartColors.silver) + '60'),
                borderColor: rarityLabels.map(r => rarityColorMap[r] || chartColors.silver),
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#8899ab',
                        padding: 16,
                        font: { size: 12 },
                        usePointStyle: true,
                        pointStyleWidth: 10
                    }
                }
            }
        }
    });

    // --- Initial Render ---
    renderCards();
});
