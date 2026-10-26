import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '..', '.env'),
];

for (const candidate of envCandidates) {
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate, quiet: true });
    break;
  }
}

const readString = (key: string, fallback?: string): string => {
  const value = process.env[key]?.trim();
  if (value) return value;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required environment variable: ${key}`);
};

const readNumber = (key: string, fallback: number): number => {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
};

const readOrigins = (key: string, fallback: string[]): string[] => {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const nodeEnv = readString('NODE_ENV', 'development');
const isProduction = nodeEnv === 'production';
const jwtSecret = readString('JWT_SECRET');

if (jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long');
}

const frontendOrigins = readOrigins('FRONTEND_URL', [
  'http://localhost:5173',
  'http://localhost:3000',
]);

const fawaterakApiKey = process.env.FAWATERAK_API_KEY?.trim() ?? '';
const fawaterakWebhookSecret =
  process.env.FAWATERAK_WEBHOOK_SECRET?.trim() ?? '';

// Supabase is migrating from legacy anon/service_role JWTs to publishable and
// secret keys. Accept either naming so existing and new projects both work.
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
  process.env.SUPABASE_SECRET_KEY?.trim();

if (!supabaseServiceRoleKey) {
  throw new Error(
    'Missing required environment variable: SUPABASE_SERVICE_ROLE_KEY',
  );
}

export const env = {
  nodeEnv,
  isProduction,
  port: readNumber('PORT', 3000),
  frontendOrigins,
  primaryFrontendUrl: frontendOrigins[0] ?? 'http://localhost:5173',
  supabase: {
    url: readString('SUPABASE_URL'),
    // The anon key is only needed if a browser client is added later. The API
    // itself always talks to Supabase with the service-role key.
    anonKey:
      process.env.SUPABASE_ANON_KEY?.trim() ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
      process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
      '',
    serviceRoleKey: supabaseServiceRoleKey,
  },
  // Used only by the `db:init` migration runner, never by the API at runtime.
  postgres: {
    url:
      process.env.POSTGRES_URL_NON_POOLING?.trim() ||
      process.env.POSTGRES_URL?.trim() ||
      process.env.DATABASE_URL?.trim() ||
      process.env.SUPABASE_DB_URL?.trim() ||
      '',
    host: process.env.POSTGRES_HOST?.trim() ?? '',
    port: readNumber('POSTGRES_PORT', 5432),
    user: process.env.POSTGRES_USER?.trim() ?? '',
    password: process.env.POSTGRES_PASSWORD ?? '',
    database: process.env.POSTGRES_DATABASE?.trim() ?? 'postgres',
  },
  jwt: {
    secret: jwtSecret,
    expiresIn: readString('JWT_EXPIRES_IN', '7d'),
  },
  bcryptRounds: 12,
  fawaterak: {
    baseUrl: readString('FAWATERAK_BASE_URL', 'https://app.fawaterk.com'),
    merchantCode: process.env.FAWATERAK_MERCHANT_CODE?.trim() ?? '',
    apiKey: fawaterakApiKey,
    secretKey: process.env.FAWATERAK_SECRET_KEY?.trim() ?? '',
    webhookSecret: fawaterakWebhookSecret,
    successUrl: readString(
      'FAWATERAK_SUCCESS_URL',
      `${frontendOrigins[0] ?? 'http://localhost:5173'}/orders?payment=success`,
    ),
    cancelUrl: readString(
      'FAWATERAK_CANCEL_URL',
      `${frontendOrigins[0] ?? 'http://localhost:5173'}/checkout?payment=cancelled`,
    ),
    callbackUrl: readString(
      'FAWATERAK_CALLBACK_URL',
      'http://localhost:3000/api/payments/webhook',
    ),
    enabled: fawaterakApiKey.length > 0,
    webhookEnabled: fawaterakWebhookSecret.length > 0,
  },
  admin: {
    name: process.env.ADMIN_NAME?.trim() || 'مدير المطعم',
    email: process.env.ADMIN_EMAIL?.trim() || 'admin@hadramout-mandi.com',
    password: process.env.ADMIN_PASSWORD ?? '',
  },
  staff: {
    kitchen: {
      email: readString('KITCHEN_EMAIL', 'kitchen@hadramout.com'),
      password: readString('KITCHEN_PASSWORD', 'secure_kitchen_pass'),
    },
    cashier: {
      email: readString('CASHIER_EMAIL', 'cashier@hadramout.com'),
      password: readString('CASHIER_PASSWORD', 'secure_cashier_pass'),
    },
    delivery: {
      email: readString('DELIVERY_EMAIL', 'delivery@hadramout.com'),
      password: readString('DELIVERY_PASSWORD', 'secure_delivery_pass'),
    },
  },
  rateLimit: {
    generalWindowMs: readNumber('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000),
    generalMax: readNumber('RATE_LIMIT_MAX', 300),
    authMax: readNumber('AUTH_RATE_LIMIT_MAX', 10),
    checkoutMax: readNumber('CHECKOUT_RATE_LIMIT_MAX', 12),
    reservationMax: readNumber('RESERVATION_RATE_LIMIT_MAX', 8),
    paymentMax: readNumber('PAYMENT_RATE_LIMIT_MAX', 10),
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
} as const;

export type AppEnv = typeof env;
