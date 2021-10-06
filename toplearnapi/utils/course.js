const fs = require('fs');
const path = require('path');

exports.clearImage = imagePath => {
    const filePath = path.join(__dirname, '..', 'public', imagePath);
    fs.unlink(filePath, err => console.log(err));
};
