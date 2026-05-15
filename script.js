const fontPresets = [
    { family: 'Noto Sans JP', weight: 100 },
    { family: 'Noto Sans JP', weight: 300 },
    { family: 'Noto Sans JP', weight: 400 },
    { family: 'Noto Sans JP', weight: 500 },
    { family: 'Noto Sans JP', weight: 700 },
    { family: 'Noto Sans JP', weight: 900 },
    { family: 'Noto Serif JP', weight: 200 },
    { family: 'Noto Serif JP', weight: 300 },
    { family: 'Noto Serif JP', weight: 400 },
    { family: 'Noto Serif JP', weight: 500 },
    { family: 'Noto Serif JP', weight: 600 },
    { family: 'Noto Serif JP', weight: 700 },
    { family: 'Noto Serif JP', weight: 900 },
    { family: 'Zen Kaku Gothic Antique', weight: 400 },
    { family: 'Zen Kaku Gothic Antique', weight: 500 },
    { family: 'Zen Kaku Gothic Antique', weight: 700 },
    { family: 'Zen Kaku Gothic Antique', weight: 900 },
    { family: 'Zen Old Mincho', weight: 400 },
    { family: 'Zen Old Mincho', weight: 700 },
    { family: 'Zen Old Mincho', weight: 900 },
    { family: 'Shippori Mincho', weight: 400 },
    { family: 'Shippori Mincho', weight: 500 },
    { family: 'Shippori Mincho', weight: 600 },
    { family: 'Shippori Mincho', weight: 700 },
    { family: 'Shippori Mincho', weight: 800 },
    { family: 'Shippori Mincho B1', weight: 400 },
    { family: 'Shippori Mincho B1', weight: 500 },
    { family: 'Shippori Mincho B1', weight: 600 },
    { family: 'Shippori Mincho B1', weight: 700 },
    { family: 'Shippori Mincho B1', weight: 800 },
    { family: 'Zen Maru Gothic', weight: 400 },
    { family: 'Zen Maru Gothic', weight: 500 },
    { family: 'Zen Maru Gothic', weight: 700 },
    { family: 'Zen Maru Gothic', weight: 900 },
    { family: 'Kiwi Maru', weight: 300 },
    { family: 'Kiwi Maru', weight: 400 },
    { family: 'Kiwi Maru', weight: 500 },
    { family: 'DotGothic16', weight: 400 },
    { family: 'Hachi Maru Pop', weight: 400 },
    { family: 'Klee One', weight: 400 },
    { family: 'Klee One', weight: 600 },
    { family: 'Dela Gothic One', weight: 400 },
    { family: 'Train One', weight: 400 },
    { family: 'Rampart One', weight: 400 },
    { family: 'Zen Kurenaido', weight: 400 },
    { family: 'M PLUS 1', weight: 100 },
    { family: 'M PLUS 1', weight: 200 },
    { family: 'M PLUS 1', weight: 300 },
    { family: 'M PLUS 1', weight: 400 },
    { family: 'M PLUS 1', weight: 500 },
    { family: 'M PLUS 1', weight: 600 },
    { family: 'M PLUS 1', weight: 700 },
    { family: 'M PLUS 1', weight: 800 },
    { family: 'M PLUS 1', weight: 900 },
    { family: 'M PLUS 1p', weight: 100 },
    { family: 'M PLUS 1p', weight: 300 },
    { family: 'M PLUS 1p', weight: 400 },
    { family: 'M PLUS 1p', weight: 500 },
    { family: 'M PLUS 1p', weight: 700 },
    { family: 'M PLUS 1p', weight: 900 },
    { family: 'M PLUS 2', weight: 100 },
    { family: 'M PLUS 2', weight: 200 },
    { family: 'M PLUS 2', weight: 300 },
    { family: 'M PLUS 2', weight: 400 },
    { family: 'M PLUS 2', weight: 500 },
    { family: 'M PLUS 2', weight: 600 },
    { family: 'M PLUS 2', weight: 700 },
    { family: 'M PLUS 2', weight: 800 },
    { family: 'M PLUS 2', weight: 900 },
    { family: 'M PLUS Rounded 1c', weight: 100 },
    { family: 'M PLUS Rounded 1c', weight: 300 },
    { family: 'M PLUS Rounded 1c', weight: 400 },
    { family: 'M PLUS Rounded 1c', weight: 500 },
    { family: 'M PLUS Rounded 1c', weight: 700 },
    { family: 'M PLUS Rounded 1c', weight: 800 },
    { family: 'M PLUS Rounded 1c', weight: 900 },
    { family: 'Kosugi', weight: 400 },
    { family: 'Kosugi Maru', weight: 400 },
    { family: 'Sawarabi Gothic', weight: 400 },
    { family: 'Sawarabi Mincho', weight: 400 },
    { family: 'Hina Mincho', weight: 400 },
];

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const shuffled = shuffle(fontPresets);
let currentIndex = 0;

const letter = document.getElementById('k-letter');

function updateSize() {
    const vh = window.innerHeight * 0.12;
    const size = Math.max(48, vh);
    letter.style.fontSize = size + 'px';
}

updateSize();
window.addEventListener('resize', updateSize);

document.fonts.ready.then(() => {
    letter.style.fontFamily = `'${shuffled[0].family}', serif`;
    letter.style.fontWeight = shuffled[0].weight;
    updateSize();
});

let tapLocked = false;
let lastTouchTime = 0;

function handleTap() {
    if (tapLocked) return;
    tapLocked = true;

    currentIndex = (currentIndex + 1) % shuffled.length;

    if (currentIndex === 0) {
        const newOrder = shuffle(fontPresets);
        shuffled.length = 0;
        newOrder.forEach(f => shuffled.push(f));
    }

    letter.style.fontFamily = `'${shuffled[currentIndex].family}', serif`;
    letter.style.fontWeight = shuffled[currentIndex].weight;

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
