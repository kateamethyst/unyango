import multer from 'multer';
import DataUri from 'datauri';
import path from 'path';

const temporaryStorage = multer.memoryStorage();

const multerUploads = multer({temporaryStorage}).single('file');

const dUri = new DataUri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export {multerUploads, dataUri};