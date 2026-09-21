import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

let client;

function getR2Client() {
  if (client) return client;

  const accountId = requiredEnv('R2_ACCOUNT_ID');
  const accessKeyId = requiredEnv('R2_ACCESS_KEY_ID');
  const secretAccessKey = requiredEnv('R2_SECRET_ACCESS_KEY');

  client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return client;
}

/**
 * Upload a buffer to R2 and return the public URL.
 * @param {{ key: string, body: Buffer, contentType: string }} params
 * @returns {Promise<string>}
 */
export async function uploadToR2({ key, body, contentType }) {
  const bucket = requiredEnv('R2_BUCKET_NAME');
  const publicUrl = requiredEnv('R2_PUBLIC_URL').replace(/\/$/, '');

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  return `${publicUrl}/${key}`;
}
