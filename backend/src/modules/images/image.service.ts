import { S3 } from '@aws-sdk/client-s3';
import fs from 'fs';
import config from '~/libs/config/config';

const s3 = new S3({
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey,
  },
  region: config.aws.region,
});

class ImageService {
  async upload(filePath: string, fileName: string): Promise<string> {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: config.aws.bucket,
      Key: `uploads/${Date.now()}-${fileName}`,
      Body: fileStream,
    };

    await s3.putObject(uploadParams);

    const fileUrl = `https://${config.aws.bucket}.s3.${config.aws.region}.amazonaws.com/${uploadParams.Key}`;
    return fileUrl;
  }
}

export { ImageService };
