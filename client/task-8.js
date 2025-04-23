const fs = require('fs');
const readlineSync = require('readline-sync');

function addImage() {
    const imagePath = readlineSync.question('Введите путь к изображению: ');

    if (fs.existsSync(imagePath)) {
        console.log(`Изображение успешно загружено: ${imagePath}`);
        
        
        const fileName = imagePath.split('/').pop(); 
        const destinationPath = `./images/${fileName}`;

        if (!fs.existsSync('./images')) {
            fs.mkdirSync('./images');
        }

        fs.copyFileSync(imagePath, destinationPath);
        console.log(`Изображение скопировано в: ${destinationPath}`);
    } else {
        console.log('Файл не найден, проверьте путь и попробуйте снова.');
    }
}

addImage();