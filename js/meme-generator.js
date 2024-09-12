// meme-generator.js

function generateMeme() {
    const memeImages = [
        'images/photo_2024-08-27 16.25.54.png',
        'images/photo_2024-08-27 16.25.57.png',
        'images/photo_2024-08-27 16.25.59.png',
        'images/photo_2024-08-27 16.26.01.png'
    ];

    const randomIndex = Math.floor(Math.random() * memeImages.length);
    const memeContainer = document.getElementById('meme-container');
    memeContainer.innerHTML = `<img src="${memeImages[randomIndex]}" alt="Generated Meme" style="max-width: 400px; margin-top: 20px;">`;
}