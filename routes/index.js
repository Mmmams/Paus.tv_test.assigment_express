import { Router } from 'express';
import util from 'util';
import fs from 'fs';

import { videoUpload, imageUpload } from '../services/upload.js';
import { uploadFile, getFileStream } from '../services/s3.js';
import { imageUploadIpfs, metadataUploadIpfs } from '../services/ipfs.js';

const router = Router();
const unlinkFile = util.promisify(fs.unlink);

router.get('/watch/:key', function (req, res, next) {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    res.status(400).send({ message: 'Wrong film ID' });
  }
});

router.post('/uploadVideo', videoUpload.single('video'), async (req, res) => {
  try {
    const file = req.file;
    console.log('FILE', file);
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    res.send({ result });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post(
  '/uploadNftMetadata',
  imageUpload.single('image'),
  async (req, res) => {
    try {
      const file = req.file;
      const fileHash = await imageUploadIpfs(file);
      const JSONfile = JSON.stringify({
        image: fileHash,
        video: req.body.video,
      });
      const metadataHash = await metadataUploadIpfs(JSONfile);
      await unlinkFile(file.path);
      res.status(201).send({ metadataHash });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  }
);

export default router;
