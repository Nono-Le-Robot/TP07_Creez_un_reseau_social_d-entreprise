const multerPost = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

const storage = multerPost.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/post');
  },
  filename: (req, file, callback) => {
    
    let newName = file.originalname
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
newName = newName
    .split(' ')
    .join('_')
    .toLowerCase();
    
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + newName);
  }
});

module.exports = multerPost({storage: storage}).single('file');