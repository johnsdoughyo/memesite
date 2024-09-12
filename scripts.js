let selectedImage = '';

// Default positions for top and bottom text, centered horizontally
let topTextPosition = { x: 0, y: 60 };
let bottomTextPosition = { x: 0, y: 0 };

// Function to dynamically load images into the gallery
function loadGalleryImages() {
    const gallerySlider = document.getElementById('gallery-slider');

    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-container';

                const img = document.createElement('img');
                img.src = `assets/${image}`;
                img.alt = `Gallery Image ${image}`;

                imgContainer.appendChild(img);
                gallerySlider.appendChild(imgContainer);

                img.addEventListener('click', () => {
                    selectedImage = img.src;
                    document.getElementById('generate-meme-btn').style.display = 'block';
                    document.getElementById('meme-generator').style.display = 'none';
                });
            });
        })
        .catch(error => console.error('Error loading images:', error));
}

// Function to generate the meme
function generateMeme() {
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');
    const topText = document.getElementById('top-text').value || '';
    const bottomText = document.getElementById('bottom-text').value || '';
    const textSize = parseInt(document.getElementById('text-size').value, 10) || 50;
    const textColor = document.getElementById('text-color').value || '#FFFFFF';
    const textFont = document.getElementById('text-font').value || 'Impact';

    if (!selectedImage) {
        alert('Please select an image first.');
        return;
    }

    const image = new Image();
    image.src = selectedImage;

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        ctx.fillStyle = textColor;
        ctx.font = `${textSize}px ${textFont}`;
        ctx.textAlign = 'center';
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black';

        // Update text positions based on the image dimensions
        topTextPosition.x = canvas.width / 2;
        bottomTextPosition.x = canvas.width / 2;
        bottomTextPosition.y = canvas.height - 20;

        // Draw top text at its current position
        ctx.strokeText(topText, topTextPosition.x, topTextPosition.y);
        ctx.fillText(topText, topTextPosition.x, topTextPosition.y);

        // Draw bottom text at its current position
        ctx.strokeText(bottomText, bottomTextPosition.x, bottomTextPosition.y);
        ctx.fillText(bottomText, bottomTextPosition.x, bottomTextPosition.y);

        // Show the canvas and download link after generating the meme
        canvas.style.display = 'block';
        document.getElementById('download-meme').style.display = 'inline-block';
    };
}

// Function to download the generated meme
function downloadMeme() {
    const canvas = document.getElementById('meme-canvas');
    const downloadLink = document.getElementById('download-meme');
    downloadLink.href = canvas.toDataURL('image/png');
}

// Function to copy the contract address to the clipboard
function copyToClipboard() {
    const contractAddress = document.getElementById("contract-address").innerText;
    navigator.clipboard.writeText(contractAddress).then(() => {
        alert("Contract address copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

// Event listeners
document.getElementById('generate-meme').addEventListener('click', generateMeme);
document.getElementById('download-meme').addEventListener('click', downloadMeme);

// Show the meme generator section when the "Generate Meme" button is clicked
document.getElementById('generate-meme-btn').addEventListener('click', () => {
    document.getElementById('meme-generator').style.display = 'block';
    document.getElementById('meme-canvas').style.display = 'none'; // Hide the canvas initially
    document.getElementById('download-meme').style.display = 'none'; // Hide the download button initially
});

// Load images for the gallery and meme generator
loadGalleryImages();