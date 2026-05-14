// Japanese font presets: [family, weights]
const fontPresets = {
    'Noto Sans JP': [100, 300, 400, 500, 700, 900],
    'Noto Serif JP': [200, 300, 400, 500, 600, 700, 900],
    'Zen Kaku Gothic Antique': [400, 500, 700, 900],
    'Zen Old Mincho': [400, 700, 900],
    'Shippori Mincho': [400, 500, 600, 700, 800],
    'Shippori Mincho B1': [400, 500, 600, 700, 800],
    'Zen Maru Gothic': [400, 500, 700, 900],
    'Kiwi Maru': [300, 400, 500],
    'DotGothic16': [400],
    'Hachi Maru Pop': [400],
    'Klee One': [400, 600],
    'RocknRoll One': [400],
    'Dela Gothic One': [400],
    'Train One': [400],
    'Rampart One': [400],
    'Zen Kurenaido': [400],
    'M PLUS 1': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'M PLUS 1p': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'M PLUS 2': [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'M PLUS Rounded 1c': [100, 300, 400, 500, 700, 800, 900],
    'Kosugi': [400],
    'Kosugi Maru': [400],
    'Sawarabi Gothic': [400],
    'Sawarabi Mincho': [400],
    'Hina Mincho': [400],
    'Tokyo': [400],
    'Dosis': [200, 300, 400, 500, 600, 700, 800],
};

// Generate all font variations
const allVariations = [];
for (const [family, weights] of Object.entries(fontPresets)) {
    for (const weight of weights) {
        allVariations.push({ family, weight });
    }
}

// Shuffle
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const shuffled = shuffle(allVariations);

// Create elements
const container = document.getElementById('k-container');
const elements = [];

shuffled.forEach((font, i) => {
    const div = document.createElement('div');
    div.className = 'k-letter';
    div.textContent = '生';
    div.style.fontFamily = `'${font.family}', serif`;
    div.style.fontWeight = font.weight;
    div.style.opacity = i === 0 ? '1' : '0';
    div.style.position = 'absolute';
    container.appendChild(div);
    elements.push(div);
});

// Progressive font loading
const batchSize = 15;
const batches = [];
for (let i = 0; i < shuffled.length; i += batchSize) {
    batches.push(shuffled.slice(i, i + batchSize));
}

let loadedBatches = 0;

function loadBatch(batch) {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        const families = batch.map(f => `family=${encodeURIComponent(f.family)}:wght@${f.weight}`).join('&');
        link.href = `https://fonts.googleapis.com/css2?${families}&text=%E7%94%9F&display=swap`;
        link.onload = resolve;
        link.onerror = resolve;
        document.head.appendChild(link);
    });
}

// Load first 3 batches then start
Promise.all(batches.slice(0, 3).map(batch => loadBatch(batch))).then(() => {
    document.fonts.ready.then(() => {
        ready = true;
    });
});

// Continue loading remaining
function loadRemaining() {
    if (loadedBatches >= batches.length) return;
    const batch = batches[loadedBatches];
    if (!batch) return;
    loadBatch(batch).then(() => {
        loadedBatches++;
        setTimeout(loadRemaining, 100);
    });
}

loadedBatches = 3;
setTimeout(loadRemaining, 500);

let currentIndex = 0;
let ready = false;
let tapLocked = false;
let lastTouchTime = 0;

function handleTap() {
    if (!ready || tapLocked) return;
    tapLocked = true;

    elements[currentIndex].style.opacity = '0';
    currentIndex = (currentIndex + 1) % shuffled.length;

    if (currentIndex === 0) {
        const newOrder = shuffle(allVariations);
        newOrder.forEach((font, i) => {
            elements[i].style.fontFamily = `'${font.family}', serif`;
            elements[i].style.fontWeight = font.weight;
        });
        shuffled.length = 0;
        newOrder.forEach(f => shuffled.push(f));
    }

    elements[currentIndex].style.opacity = '1';

    setTimeout(() => { tapLocked = false; }, 100);
}

document.addEventListener('touchend', (e) => {
    e.preventDefault();
    e.stopPropagation();
    lastTouchTime = Date.now();
    handleTap();
}, { passive: false, capture: true });

document.addEventListener('click', () => {
    if (Date.now() - lastTouchTime < 500) return;
    handleTap();
});
