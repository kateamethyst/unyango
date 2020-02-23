import express from 'express';
import  {register, getAuthenticated} from '../app/controllers/user.controller';
const router = express.Router();

router.post('/', register);

router.post('/authenticate', getAuthenticated);

module.exports = router;