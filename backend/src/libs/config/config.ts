import dotenv from 'dotenv';

dotenv.config();

interface AWSConfig {
  bucket: string;
  region: string;
  accessKey: string;
  secretKey: string;
}

interface Config {
  postgresUri: string;
  secretKey: string;
  aws: AWSConfig;
}

function requireEnv(variable: string | undefined, name: string): string {
  if (!variable) {
    throw new Error(
      `${name} is required but not defined in the environment variables`
    );
  }
  return variable;
}

const config: Config = {
  postgresUri: requireEnv(process.env.POSTGRES_URI, 'POSTGRES_URI'),
  secretKey: requireEnv(process.env.SECRET_KEY, 'SECRET_KEY'),
  aws: {
    bucket: process.env.AWS_BUCKET || '',
    region: process.env.AWS_REGION || '',
    accessKey: process.env.AWS_ACCESS_KEY || '',
    secretKey: process.env.AWS_SECRET_KEY || '',
  },
};

export default config;
