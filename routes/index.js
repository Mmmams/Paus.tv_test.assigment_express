import { Router } from 'express';

import { videoUpload } from '../services/upload.js';

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', videoUpload.single('video'), (req, res) => {
  res.send(req.file)
}, (error, req, res, next) => {
   res.status(400).send({ error: error.message })
})

export default router;
