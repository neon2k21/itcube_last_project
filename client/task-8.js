const fileInput = document.getElementById('file-input');
const imageContainer = document.getElementById('image-container');


fileInput.addEventListener('change', (event) => {
    const files = event.target.files;

    imageContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('img'); 
            img.src = e.target.result; 
            imageContainer.appendChild(img); 
        }

        
        reader.readAsDataURL(file);
    }
});