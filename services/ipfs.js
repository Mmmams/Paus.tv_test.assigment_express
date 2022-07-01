import { create } from 'ipfs-http-client';
import fs from 'fs';

const client = create();

export const imageUploadIpfs = async (fileToUpload) => {
  const file = fs.readFileSync(fileToUpload.path);
  const filesAdded = await client.add(
    { path: fileToUpload.filename, content: file },
    {
      progress: (len) => console.log('Uploading file...' + len),
    }
  );
  const fileHash = filesAdded.cid.toString();
  console.log(fileHash);
  return fileHash;
};

export const metadataUploadIpfs = async (file) => {
  const metadataAdded = await client.add(file);
  const metadataHash = metadataAdded.cid.toString();
  return metadataHash;
};
