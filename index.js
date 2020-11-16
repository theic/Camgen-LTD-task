const http = require('http');
const fs = require('fs');

const inputArgs = process.argv.slice(2);
const targetURL = inputArgs[0];
const targetPath = inputArgs[1];
const fileStream = fs.createWriteStream(targetPath);

fileStream.on('error', (error) => {
    console.log(`Неверный путь или нет разрешения на запись. ${error.message || ''}`);
});

fileStream.on('ready', () => {
    http.get(targetURL, (response) => {
        response.pipe(fileStream);
    })
});

fileStream.on('finish', (error) => {
    console.log(`Файл записан в '${fileStream.path}'`);
});
