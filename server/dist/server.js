"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../shared/config.ts
var brand = {
  name: "\u062D\u0636\u0631\u0645\u0648\u062A \u0628\u064A\u062A \u0627\u0644\u0645\u0646\u062F\u064A",
  nameEn: "Hadramout House of Mandi",
  tagline: "\u0623\u0635\u0627\u0644\u0629 \u0627\u0644\u0645\u0646\u062F\u064A \u0627\u0644\u062D\u0636\u0631\u0645\u064A",
  taglineEn: "Authentic Hadrami Mandi",
  description: "\u0645\u0646 \u0642\u0644\u0628 \u062D\u0636\u0631\u0645\u0648\u062A \u0625\u0644\u0649 \u0645\u0627\u0626\u062F\u0629 \u0645\u0635\u0631\u060C \u0646\u0637\u0628\u062E \u0627\u0644\u0644\u062D\u0645 \u0627\u0644\u0637\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u062D\u062C\u0631 \u0645\u0639 \u0623\u0631\u0632 \u0628\u0633\u0645\u062A\u064A \u0645\u0639\u0637\u0651\u0631 \u0628\u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u062D\u0636\u0631\u0645\u064A\u0629 \u0627\u0644\u0623\u0635\u064A\u0644\u0629. \u062A\u062C\u0631\u0628\u0629 \u0645\u0646\u062F\u064A \u0644\u0627 \u062A\u064F\u0646\u0633\u0649.",
  establishedYear: 2015,
  heroImageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=80",
  storyImageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
  phone: "+201001234567",
  phoneDisplay: "010 1234 5678",
  email: "info@hadramout-mandi.com",
  address: {
    ar: "\u0634\u0627\u0631\u0639 \u0627\u0644\u062A\u062D\u0631\u064A\u0631\u060C \u0627\u0644\u062F\u0642\u064A\u060C \u0627\u0644\u062C\u064A\u0632\u0629\u060C \u0645\u0635\u0631",
    en: "El-Tahrir Street, Dokki, Giza, Egypt"
  },
  social: {
    facebook: "https://facebook.com/hadramoutmandi",
    instagram: "https://instagram.com/hadramoutmandi",
    twitter: "https://twitter.com/hadramoutmandi",
    whatsapp: "https://wa.me/201001234567"
  },
  workingHours: {
    ar: "\u064A\u0648\u0645\u064A\u0627\u064B \u0645\u0646 12:00 \u0638\u0647\u0631\u0627\u064B \u062D\u062A\u0649 11:00 \u0645\u0633\u0627\u0621\u064B",
    en: "Daily 12:00 PM - 11:00 PM"
  },
  currency: {
    code: "EGP",
    symbol: "\u062C.\u0645",
    symbolEn: "EGP"
  }
};
var menuCategories = [
  { id: "mandi", nameAr: "\u0645\u0646\u062F\u064A", nameEn: "Mandi", icon: "" },
  { id: "madhbi", nameAr: "\u0645\u062F\u062E\u0646", nameEn: "Madhbi", icon: "" },
  { id: "mathloutha", nameAr: "\u0645\u0638\u0644\u0629", nameEn: "Mathloutha", icon: "" },
  { id: "appetizers", nameAr: "\u0645\u0642\u0628\u0644\u0627\u062A", nameEn: "Appetizers", icon: "" },
  { id: "drinks", nameAr: "\u0645\u0634\u0631\u0648\u0628\u0627\u062A", nameEn: "Drinks", icon: "" },
  { id: "desserts", nameAr: "\u062D\u0644\u0648\u064A\u0627\u062A", nameEn: "Desserts", icon: "" }
];
var orderStatuses = {
  PENDING: { ar: "\u0641\u064A \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631", en: "Pending", color: "#d97706", step: 1 },
  PREPARING: { ar: "\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0636\u064A\u0631", en: "Preparing", color: "#2563eb", step: 2 },
  READY: { ar: "\u062C\u0627\u0647\u0632", en: "Ready", color: "#10b981", step: 3 },
  OUT_FOR_DELIVERY: {
    ar: "\u062E\u0631\u062C \u0644\u0644\u062A\u0648\u0635\u064A\u0644",
    en: "Out for delivery",
    color: "#7c3aed",
    step: 4
  },
  DELIVERED: { ar: "\u062A\u0645 \u0627\u0644\u062A\u0633\u0644\u064A\u0645", en: "Delivered", color: "#059669", step: 5 },
  CANCELLED: { ar: "\u0645\u0644\u063A\u064A", en: "Cancelled", color: "#dc2626", step: 0 }
};
var orderStatusList = Object.keys(orderStatuses);
var paymentStatuses = {
  PENDING: { ar: "\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062F\u0641\u0639", en: "Pending", color: "#d97706", step: 1 },
  PAID: { ar: "\u0645\u062F\u0641\u0648\u0639", en: "Paid", color: "#059669", step: 2 },
  FAILED: { ar: "\u0641\u0634\u0644 \u0627\u0644\u062F\u0641\u0639", en: "Failed", color: "#dc2626", step: 0 },
  REFUNDED: { ar: "\u0645\u0633\u062A\u0631\u062F", en: "Refunded", color: "#6b7280", step: 0 }
};
var reservationStatuses = {
  PENDING: { ar: "\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0623\u0643\u064A\u062F", en: "Pending", color: "#d97706", step: 1 },
  CONFIRMED: { ar: "\u0645\u0624\u0643\u062F", en: "Confirmed", color: "#2563eb", step: 2 },
  CANCELLED: { ar: "\u0645\u0644\u063A\u064A", en: "Cancelled", color: "#dc2626", step: 0 },
  COMPLETED: { ar: "\u0645\u0643\u062A\u0645\u0644", en: "Completed", color: "#059669", step: 3 }
};
var reservationStatusList = Object.keys(
  reservationStatuses
);
var appConfig = {
  brand,
  menuCategories,
  orderStatuses,
  paymentStatuses,
  reservationStatuses,
  deliveryFee: 0,
  maxGuests: 20,
  storageKeys: {
    token: "hadramout_token",
    user: "hadramout_user",
    cart: "hadramout_cart"
  }
};
var isOrderStatus = (value) => value in orderStatuses;
var isPaymentStatus = (value) => value in paymentStatuses;
var isReservationStatus = (value) => value in reservationStatuses;

// src/config/env.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var import_dotenv = __toESM(require("dotenv"));
var envCandidates = [
  import_node_path.default.resolve(process.cwd(), ".env"),
  import_node_path.default.resolve(process.cwd(), "..", ".env")
];
for (const candidate of envCandidates) {
  if (import_node_fs.default.existsSync(candidate)) {
    import_dotenv.default.config({ path: candidate, quiet: true });
    break;
  }
}
var readString = (key, fallback) => {
  const value = process.env[key]?.trim();
  if (value) return value;
  if (fallback !== void 0) return fallback;
  throw new Error(`Missing required environment variable: ${key}`);
};
var readNumber = (key, fallback) => {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
};
var readOrigins = (key, fallback) => {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  return raw.split(",").map((origin) => origin.trim()).filter(Boolean);
};
var nodeEnv = readString("NODE_ENV", "development");
var isProduction = nodeEnv === "production";
var jwtSecret = readString("JWT_SECRET");
if (jwtSecret.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long");
}
var frontendOrigins = readOrigins("FRONTEND_URL", [
  "http://localhost:5173",
  "http://localhost:3000"
]);
var fawaterakApiKey = process.env.FAWATERAK_API_KEY?.trim() ?? "";
var fawaterakWebhookSecret = process.env.FAWATERAK_WEBHOOK_SECRET?.trim() ?? "";
var supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_SECRET_KEY?.trim();
if (!supabaseServiceRoleKey) {
  throw new Error(
    "Missing required environment variable: SUPABASE_SERVICE_ROLE_KEY"
  );
}
var env = {
  nodeEnv,
  isProduction,
  port: readNumber("PORT", 3e3),
  frontendOrigins,
  primaryFrontendUrl: frontendOrigins[0] ?? "http://localhost:5173",
  supabase: {
    url: readString("SUPABASE_URL"),
    // The anon key is only needed if a browser client is added later. The API
    // itself always talks to Supabase with the service-role key.
    anonKey: process.env.SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || process.env.SUPABASE_PUBLISHABLE_KEY?.trim() || "",
    serviceRoleKey: supabaseServiceRoleKey
  },
  // Used only by the `db:init` migration runner, never by the API at runtime.
  postgres: {
    url: process.env.POSTGRES_URL_NON_POOLING?.trim() || process.env.POSTGRES_URL?.trim() || process.env.DATABASE_URL?.trim() || process.env.SUPABASE_DB_URL?.trim() || "",
    host: process.env.POSTGRES_HOST?.trim() ?? "",
    port: readNumber("POSTGRES_PORT", 5432),
    user: process.env.POSTGRES_USER?.trim() ?? "",
    password: process.env.POSTGRES_PASSWORD ?? "",
    database: process.env.POSTGRES_DATABASE?.trim() ?? "postgres"
  },
  jwt: {
    secret: jwtSecret,
    expiresIn: readString("JWT_EXPIRES_IN", "7d")
  },
  bcryptRounds: 12,
  fawaterak: {
    baseUrl: readString("FAWATERAK_BASE_URL", "https://app.fawaterk.com"),
    merchantCode: process.env.FAWATERAK_MERCHANT_CODE?.trim() ?? "",
    apiKey: fawaterakApiKey,
    secretKey: process.env.FAWATERAK_SECRET_KEY?.trim() ?? "",
    webhookSecret: fawaterakWebhookSecret,
    successUrl: readString(
      "FAWATERAK_SUCCESS_URL",
      `${frontendOrigins[0] ?? "http://localhost:5173"}/orders?payment=success`
    ),
    cancelUrl: readString(
      "FAWATERAK_CANCEL_URL",
      `${frontendOrigins[0] ?? "http://localhost:5173"}/checkout?payment=cancelled`
    ),
    callbackUrl: readString(
      "FAWATERAK_CALLBACK_URL",
      "http://localhost:3000/api/payments/webhook"
    ),
    enabled: fawaterakApiKey.length > 0,
    webhookEnabled: fawaterakWebhookSecret.length > 0
  },
  admin: {
    name: process.env.ADMIN_NAME?.trim() || "\u0645\u062F\u064A\u0631 \u0627\u0644\u0645\u0637\u0639\u0645",
    email: process.env.ADMIN_EMAIL?.trim() || "admin@hadramout-mandi.com",
    password: process.env.ADMIN_PASSWORD ?? ""
  },
  staff: {
    kitchen: {
      email: readString("KITCHEN_EMAIL", "kitchen@hadramout.com"),
      password: readString("KITCHEN_PASSWORD", "secure_kitchen_pass")
    },
    cashier: {
      email: readString("CASHIER_EMAIL", "cashier@hadramout.com"),
      password: readString("CASHIER_PASSWORD", "secure_cashier_pass")
    },
    delivery: {
      email: readString("DELIVERY_EMAIL", "delivery@hadramout.com"),
      password: readString("DELIVERY_PASSWORD", "secure_delivery_pass")
    }
  },
  rateLimit: {
    generalWindowMs: readNumber("RATE_LIMIT_WINDOW_MS", 15 * 60 * 1e3),
    generalMax: readNumber("RATE_LIMIT_MAX", 300),
    authMax: readNumber("AUTH_RATE_LIMIT_MAX", 10),
    checkoutMax: readNumber("CHECKOUT_RATE_LIMIT_MAX", 12),
    reservationMax: readNumber("RESERVATION_RATE_LIMIT_MAX", 8),
    paymentMax: readNumber("PAYMENT_RATE_LIMIT_MAX", 10)
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
};

// src/createApp.ts
var import_node_fs2 = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));
var import_cors = __toESM(require("cors"));
var import_express8 = __toESM(require("express"));
var import_helmet = __toESM(require("helmet"));

// src/utils/ApiError.ts
var ApiError = class _ApiError extends Error {
  constructor(statusCode, message, errors, code) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.code = code;
    this.name = "ApiError";
  }
  statusCode;
  errors;
  code;
  static badRequest(message, errors) {
    return new _ApiError(400, message, errors);
  }
  static unauthorized(message = "\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", code = "AUTH_REQUIRED") {
    return new _ApiError(401, message, void 0, code);
  }
  static forbidden(message = "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621") {
    return new _ApiError(403, message);
  }
  static notFound(message = "\u0627\u0644\u0639\u0646\u0635\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F") {
    return new _ApiError(404, message);
  }
  static conflict(message) {
    return new _ApiError(409, message);
  }
};

// src/middleware/errorHandler.ts
var errorHandler = (error, _req, res, _next) => {
  if (res.headersSent) return;
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...error.code ? { code: error.code } : {},
      ...error.errors ? { errors: error.errors } : {}
    });
    return;
  }
  const dbError = error;
  if (dbError.code === "23505") {
    res.status(409).json({
      success: false,
      message: "\u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B"
    });
    return;
  }
  if (dbError.code === "23503") {
    res.status(409).json({
      success: false,
      message: "\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0648\u062C\u0648\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629"
    });
    return;
  }
  if (dbError.code === "23514" || dbError.code === "22P02" || dbError.code === "22023") {
    res.status(400).json({
      success: false,
      message: "\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u0633\u0644\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629"
    });
    return;
  }
  if (dbError.code === "PGRST116") {
    res.status(404).json({
      success: false,
      message: "\u0627\u0644\u0639\u0646\u0635\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"
    });
    return;
  }
  if (dbError.type === "entity.too.large") {
    res.status(413).json({
      success: false,
      message: "\u062D\u062C\u0645 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0631\u0633\u0644 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B"
    });
    return;
  }
  if (dbError.type === "entity.parse.failed") {
    res.status(400).json({
      success: false,
      message: "\u0635\u064A\u063A\u0629 JSON \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629"
    });
    return;
  }
  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message: env.isProduction ? "\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062E\u0627\u062F\u0645\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B" : error instanceof Error ? error.message : "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639"
  });
};

// src/middleware/rateLimit.ts
var import_express_rate_limit = __toESM(require("express-rate-limit"));
var handler = (_req, res) => {
  res.status(429).json({
    success: false,
    message: "\u0645\u062D\u0627\u0648\u0644\u0627\u062A \u0643\u062B\u064A\u0631\u0629 \u062C\u062F\u0627\u064B\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F \u0642\u0644\u064A\u0644"
  });
};
var buildLimiter = (windowMs, limit, name) => (0, import_express_rate_limit.default)({
  windowMs,
  limit,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler,
  message: `${name} limit exceeded`
});
var generalLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.generalMax,
  "general"
);
var authLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.authMax,
  "auth"
);
var checkoutLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.checkoutMax,
  "checkout"
);
var paymentLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.paymentMax,
  "payment"
);
var reservationLimiter = buildLimiter(
  env.rateLimit.generalWindowMs,
  env.rateLimit.reservationMax,
  "reservation"
);

// src/routes/adminRoutes.ts
var import_express = require("express");

// src/db/client.ts
var import_supabase_js = require("@supabase/supabase-js");
var supabase = (0, import_supabase_js.createClient)(
  env.supabase.url,
  env.supabase.serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    },
    db: {
      schema: "public"
    }
  }
);
var delay = (milliseconds) => new Promise((resolve) => {
  setTimeout(resolve, milliseconds);
});
var verifyDatabaseConnection = async () => {
  const attempts = 5;
  let lastMessage = "unknown error";
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const { error } = await supabase.from("users").select("id", { count: "exact", head: true }).limit(1);
    if (!error) return;
    lastMessage = error.message;
    if (attempt < attempts) {
      await delay(500);
    }
  }
  throw new Error(
    `Unable to reach Supabase (${env.supabase.url}): ${lastMessage}. Has "npm run db:init" been run?`
  );
};

// src/db/query.ts
var DatabaseError = class extends Error {
  code;
  details;
  hint;
  constructor(context, error) {
    super(`${context}: ${error.message}`);
    this.name = "DatabaseError";
    this.code = error.code;
    this.details = error.details;
    this.hint = error.hint;
  }
};
var assertNoError = (error, context) => {
  if (!error) return;
  console.error(`[supabase] ${context}:`, {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint
  });
  throw new DatabaseError(context, error);
};
var unwrap = (result, context) => {
  assertNoError(result.error, context);
  return result.data;
};

// src/utils/request.ts
var requireAuthUser = (req) => {
  if (!req.user) {
    throw ApiError.unauthorized();
  }
  return req.user;
};
var parseId = (value, label = "\u0627\u0644\u0645\u0639\u0631\u0651\u0641") => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw ApiError.badRequest(`${label} \u063A\u064A\u0631 \u0635\u0627\u0644\u062D`);
  }
  return parsed;
};
var paginationFromQuery = (query2, defaultLimit, maxLimit) => {
  const rawPage = Number(query2.page ?? 1);
  const rawLimit = Number(query2.limit ?? defaultLimit);
  const page = Number.isInteger(rawPage) && rawPage > 0 ? Math.min(rawPage, 1e5) : 1;
  const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, maxLimit) : defaultLimit;
  return { page, limit, offset: (page - 1) * limit };
};
var escapeLike = (value) => value.replace(/[\\%_]/g, (character) => `\\${character}`);
var toPostgrestIlikePattern = (value) => {
  const cleaned = value.replace(/[,()"\\]/g, " ").trim();
  return `%${escapeLike(cleaned)}%`;
};

// src/utils/sanitize.ts
var controlCharacters = /[\u0000-\u001F\u007F]/g;
var sanitizePlainText = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(controlCharacters, " ").replace(/[<>]/g, "").replace(/\s{2,}/g, " ").trim();
};
var sanitizeMultilineText = (value) => {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[<>]/g, "").trim();
};
var toIsoString = (value) => {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
  }
  return (/* @__PURE__ */ new Date()).toISOString();
};
var toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
var roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
var toNullableIsoString = (value) => {
  if (value === null || value === void 0) return null;
  return toIsoString(value);
};

// src/repositories/menuRepository.ts
var categoryOrder = [
  "mandi",
  "madhbi",
  "mathloutha",
  "appetizers",
  "drinks",
  "desserts"
];
var categoryRank = new Map(
  categoryOrder.map((category, index) => [category, index])
);
var mapMenuItem = (row) => ({
  id: Number(row.id),
  name: row.name,
  nameEn: row.name_en,
  description: row.description,
  descriptionEn: row.description_en,
  price: toNumber(row.price),
  category: row.category,
  imageUrl: row.image_url,
  isAvailable: Boolean(row.is_available),
  createdAt: toIsoString(row.created_at),
  updatedAt: toIsoString(row.updated_at)
});
var toMenuItemDto = (item) => ({
  id: item.id,
  name: item.name,
  nameEn: item.nameEn,
  description: item.description,
  descriptionEn: item.descriptionEn,
  price: item.price,
  category: item.category,
  imageUrl: item.imageUrl,
  isAvailable: item.isAvailable,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt
});
var selectColumns = `id, name, name_en, description, description_en, price,
  category, image_url, is_available, created_at, updated_at`;
var menuRepository = {
  async list(filters) {
    let query2 = supabase.from("menu_items").select(selectColumns);
    if (filters.category) {
      query2 = query2.eq("category", filters.category);
    }
    if (filters.search) {
      const pattern = toPostgrestIlikePattern(filters.search);
      query2 = query2.or(
        [
          `name.ilike.${pattern}`,
          `name_en.ilike.${pattern}`,
          `description.ilike.${pattern}`
        ].join(",")
      );
    }
    if (typeof filters.available === "boolean") {
      query2 = query2.eq("is_available", filters.available);
    }
    const result = await query2.order("category", { ascending: true }).order("id", { ascending: true });
    const rows = unwrap(result, "list menu items");
    return (rows ?? []).map(mapMenuItem).sort((left, right) => {
      const leftRank = categoryRank.get(left.category) ?? categoryOrder.length;
      const rightRank = categoryRank.get(right.category) ?? categoryOrder.length;
      return leftRank - rightRank || left.id - right.id;
    });
  },
  async findById(id) {
    const result = await supabase.from("menu_items").select(selectColumns).eq("id", id).maybeSingle();
    const row = unwrap(result, "find menu item");
    return row ? mapMenuItem(row) : null;
  },
  async findByIds(ids) {
    if (ids.length === 0) return [];
    const result = await supabase.from("menu_items").select(selectColumns).in("id", [...ids]);
    const rows = unwrap(result, "find menu items by ids");
    return (rows ?? []).map(mapMenuItem);
  },
  async create(data) {
    const result = await supabase.from("menu_items").insert({
      name: data.name,
      name_en: data.nameEn ?? null,
      description: data.description ?? null,
      description_en: data.descriptionEn ?? null,
      price: data.price,
      category: data.category,
      image_url: data.imageUrl ?? null,
      is_available: data.isAvailable ?? true
    }).select("id").single();
    const row = unwrap(result, "create menu item");
    return Number(row.id);
  },
  async update(id, data) {
    const result = await supabase.from("menu_items").update({
      name: data.name,
      name_en: data.nameEn ?? null,
      description: data.description ?? null,
      description_en: data.descriptionEn ?? null,
      price: data.price,
      category: data.category,
      image_url: data.imageUrl ?? null,
      is_available: data.isAvailable ?? true
    }).eq("id", id).select("id");
    const rows = unwrap(result, "update menu item");
    return (rows?.length ?? 0) > 0;
  },
  async delete(id) {
    const result = await supabase.from("menu_items").delete().eq("id", id).select("id");
    const rows = unwrap(result, "delete menu item");
    return (rows?.length ?? 0) > 0;
  },
  async count() {
    const { count, error } = await supabase.from("menu_items").select("id", { count: "exact", head: true });
    assertNoError(error, "count menu items");
    return count ?? 0;
  }
};

// src/repositories/orderRepository.ts
var relation = (value) => {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
};
var mapOrder = (row) => {
  const customer = relation(row.customer);
  const delivery = relation(row.delivery);
  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    customerName: customer?.name,
    customerEmail: customer?.email,
    customerPhone: customer?.phone ?? null,
    totalAmount: toNumber(row.total_amount),
    deliveryAddress: row.delivery_address,
    paymentStatus: row.payment_status,
    orderStatus: row.order_status,
    paymentId: row.payment_id,
    paymentUrl: row.payment_url,
    notes: row.notes,
    paymentMethod: row.payment_method,
    deliveryUserId: row.delivery_user_id === null ? null : Number(row.delivery_user_id),
    deliveryUserName: delivery?.name ?? null,
    deliveryUserPhone: delivery?.phone ?? null,
    dispatchedAt: toNullableIsoString(row.dispatched_at),
    deliveredAt: toNullableIsoString(row.delivered_at),
    cashReceived: row.cash_received === null ? null : toNumber(row.cash_received),
    cashChange: row.cash_change === null ? null : toNumber(row.cash_change),
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at)
  };
};
var mapOrderItem = (row) => {
  const menuItem = relation(row.menu_item);
  return {
    id: Number(row.id),
    orderId: Number(row.order_id),
    menuItemId: Number(row.menu_item_id),
    name: menuItem?.name ?? "",
    nameEn: menuItem?.name_en ?? null,
    imageUrl: menuItem?.image_url ?? null,
    quantity: Number(row.quantity),
    priceAtPurchase: toNumber(row.price_at_purchase)
  };
};
var toOrderItemDto = (item) => ({
  id: item.id,
  menuItemId: item.menuItemId,
  name: item.name,
  nameEn: item.nameEn,
  imageUrl: item.imageUrl,
  quantity: item.quantity,
  priceAtPurchase: item.priceAtPurchase,
  lineTotal: Number((item.quantity * item.priceAtPurchase).toFixed(2))
});
var toOrderDto = (order, items) => ({
  id: order.id,
  userId: order.userId,
  customerName: order.customerName,
  customerEmail: order.customerEmail,
  customerPhone: order.customerPhone,
  totalAmount: order.totalAmount,
  deliveryAddress: order.deliveryAddress,
  paymentStatus: order.paymentStatus,
  orderStatus: order.orderStatus,
  paymentId: order.paymentId,
  paymentUrl: order.paymentUrl,
  notes: order.notes,
  items: items.map(toOrderItemDto),
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
  paymentMethod: order.paymentMethod,
  deliveryUserId: order.deliveryUserId,
  deliveryUserName: order.deliveryUserName ?? null,
  deliveryUserPhone: order.deliveryUserPhone ?? null,
  dispatchedAt: order.dispatchedAt,
  deliveredAt: order.deliveredAt,
  cashReceived: order.cashReceived,
  cashChange: order.cashChange
});
var orderSelect = `id, user_id, total_amount, delivery_address,
  payment_status, order_status, payment_id, payment_url, notes,
  payment_method, delivery_user_id, dispatched_at, delivered_at,
  cash_received, cash_change, created_at, updated_at,
  customer:users!orders_user_id_fkey(name, email, phone),
  delivery:users!orders_delivery_user_id_fkey(name, phone)`;
var itemSelect = `id, order_id, menu_item_id, quantity, price_at_purchase,
  menu_item:menu_items!order_items_menu_item_id_fkey(name, name_en, image_url)`;
var orderRepository = {
  async findById(id) {
    const result = await supabase.from("orders").select(orderSelect).eq("id", id).maybeSingle();
    const row = unwrap(result, "find order");
    return row ? mapOrder(row) : null;
  },
  async findByPaymentId(paymentId) {
    const result = await supabase.from("orders").select(orderSelect).eq("payment_id", paymentId).maybeSingle();
    const row = unwrap(result, "find order by payment id");
    return row ? mapOrder(row) : null;
  },
  async list(filters, page) {
    let query2 = supabase.from("orders").select(orderSelect, { count: "exact" });
    if (filters.userId !== void 0) {
      query2 = query2.eq("user_id", filters.userId);
    }
    if (filters.deliveryUserId !== void 0) {
      query2 = query2.eq("delivery_user_id", filters.deliveryUserId);
    }
    if (filters.status) {
      query2 = Array.isArray(filters.status) ? query2.in("order_status", filters.status) : query2.eq("order_status", filters.status);
    }
    if (filters.paymentStatus) {
      query2 = query2.eq("payment_status", filters.paymentStatus);
    }
    const result = await query2.order("created_at", { ascending: false }).range(page.offset, page.offset + page.limit - 1);
    const rows = unwrap(result, "list orders");
    return {
      orders: (rows ?? []).map(mapOrder),
      total: result.count ?? 0
    };
  },
  async findItemsByOrderIds(orderIds) {
    if (orderIds.length === 0) return [];
    const result = await supabase.from("order_items").select(itemSelect).in("order_id", [...orderIds]).order("id", { ascending: true });
    const rows = unwrap(result, "find order items");
    return (rows ?? []).map(mapOrderItem);
  },
  async findItemsByOrderId(orderId) {
    return orderRepository.findItemsByOrderIds([orderId]);
  },
  /**
   * Creates the order and its items in a single PostgreSQL transaction via the
   * `create_order_with_items` RPC defined in the Supabase migration.
   */
  async createWithItems(data) {
    const result = await supabase.rpc("create_order_with_items", {
      p_user_id: data.userId,
      p_total_amount: data.totalAmount,
      p_delivery_address: data.deliveryAddress,
      p_payment_method: data.paymentMethod,
      p_notes: data.notes,
      p_items: data.items.map((item) => ({
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        price_at_purchase: item.priceAtPurchase
      }))
    });
    assertNoError(result.error, "create order");
    return Number(result.data);
  },
  async updatePaymentInfo(orderId, paymentId, paymentUrl) {
    const { error } = await supabase.from("orders").update({ payment_id: paymentId, payment_url: paymentUrl }).eq("id", orderId);
    assertNoError(error, "update order payment info");
  },
  async updateStatuses(orderId, paymentStatus, orderStatus) {
    const { error } = await supabase.from("orders").update({
      payment_status: paymentStatus,
      order_status: orderStatus
    }).eq("id", orderId);
    assertNoError(error, "update order statuses");
  },
  async updateOrderStatus(orderId, orderStatus) {
    const { error } = await supabase.from("orders").update({ order_status: orderStatus }).eq("id", orderId);
    assertNoError(error, "update order status");
  },
  /**
   * Assigns a ready order to a driver and dispatches it in one atomic step.
   * The status predicate prevents two cashiers from dispatching the same
   * order concurrently.
   */
  async dispatchToDriver(orderId, deliveryUserId) {
    const result = await supabase.from("orders").update({
      delivery_user_id: deliveryUserId,
      order_status: "OUT_FOR_DELIVERY",
      dispatched_at: (/* @__PURE__ */ new Date()).toISOString(),
      delivered_at: null,
      cash_received: null,
      cash_change: null
    }).eq("id", orderId).eq("order_status", "READY").select("id");
    const rows = unwrap(result, "dispatch order");
    return (rows?.length ?? 0) > 0;
  },
  /**
   * Completes a dispatched order, records the cash handover and marks the
   * payment as paid. The status predicate makes confirmation idempotent-safe:
   * a second request cannot overwrite the recorded delivery.
   */
  async completeDelivery(orderId, cashReceived, cashChange) {
    const result = await supabase.from("orders").update({
      order_status: "DELIVERED",
      payment_status: "PAID",
      delivered_at: (/* @__PURE__ */ new Date()).toISOString(),
      cash_received: cashReceived,
      cash_change: cashChange
    }).eq("id", orderId).eq("order_status", "OUT_FOR_DELIVERY").select("id");
    const rows = unwrap(result, "complete delivery");
    return (rows?.length ?? 0) > 0;
  },
  async getStats() {
    const [statsResult, menuResult, reservationResult] = await Promise.all([
      supabase.rpc("get_order_stats"),
      supabase.from("menu_items").select("id", { count: "exact", head: true }),
      supabase.from("reservations").select("id", { count: "exact", head: true })
    ]);
    assertNoError(statsResult.error, "load order statistics");
    assertNoError(menuResult.error, "count menu items");
    assertNoError(reservationResult.error, "count reservations");
    const rows = statsResult.data;
    const row = rows?.[0];
    return {
      totalOrders: Number(row?.total_orders ?? 0),
      pendingOrders: Number(row?.pending_orders ?? 0),
      preparingOrders: Number(row?.preparing_orders ?? 0),
      outForDeliveryOrders: Number(row?.out_for_delivery_orders ?? 0),
      deliveredOrders: Number(row?.delivered_orders ?? 0),
      cancelledOrders: Number(row?.cancelled_orders ?? 0),
      totalRevenue: toNumber(row?.total_revenue),
      totalMenuItems: menuResult.count ?? 0,
      totalReservations: reservationResult.count ?? 0
    };
  }
};

// src/repositories/userRepository.ts
var mapUser = (row) => ({
  id: Number(row.id),
  name: row.name,
  email: row.email,
  passwordHash: row.password_hash,
  phone: row.phone,
  role: row.role,
  createdAt: toIsoString(row.created_at),
  isApproved: Boolean(row.is_approved)
});
var toUserDto = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  createdAt: user.createdAt,
  isApproved: user.isApproved
});
var selectColumns2 = "id, name, email, password_hash, phone, role, created_at, is_approved";
var userRepository = {
  async findByEmail(email) {
    const result = await supabase.from("users").select(selectColumns2).eq("email", email.toLowerCase()).maybeSingle();
    const row = unwrap(result, "find user by email");
    return row ? mapUser(row) : null;
  },
  async findById(id) {
    const result = await supabase.from("users").select(selectColumns2).eq("id", id).maybeSingle();
    const row = unwrap(result, "find user by id");
    return row ? mapUser(row) : null;
  },
  async listApprovedByRole(role) {
    const result = await supabase.from("users").select(selectColumns2).eq("role", role).eq("is_approved", true).order("name", { ascending: true }).order("id", { ascending: true });
    const rows = unwrap(result, "list approved users");
    return (rows ?? []).map(mapUser);
  },
  async isApproved(id) {
    const result = await supabase.from("users").select("is_approved").eq("id", id).maybeSingle();
    const row = unwrap(result, "check user approval");
    return Boolean(row?.is_approved ?? false);
  },
  async updateApproval(id, approved) {
    const { error } = await supabase.from("users").update({ is_approved: approved }).eq("id", id);
    assertNoError(error, "update user approval");
  },
  async create(data) {
    const isApproved = data.isApproved ?? (data.role === "customer" || data.role === "admin");
    const result = await supabase.from("users").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      password_hash: data.passwordHash,
      phone: data.phone,
      role: data.role,
      is_approved: isApproved
    }).select("id").single();
    const row = unwrap(result, "create user");
    return Number(row.id);
  }
};

// src/services/paymentService.ts
var import_axios = __toESM(require("axios"));
var import_node_crypto = __toESM(require("crypto"));
var asRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value) ? value : {};
var readString2 = (value) => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return null;
};
var readNumber2 = (value) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};
var splitName = (fullName) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    first: parts[0] ?? "Customer",
    last: parts.slice(1).join(" ") || "Guest"
  };
};
var secureCompare = (expected, received) => {
  const expectedBuffer = Buffer.from(expected.toLowerCase(), "utf8");
  const receivedBuffer = Buffer.from(received.toLowerCase(), "utf8");
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return import_node_crypto.default.timingSafeEqual(expectedBuffer, receivedBuffer);
};
var formatAmount = (value) => value.toFixed(2);
var invoiceApiUrl = () => `${env.fawaterak.baseUrl.replace(/\/+$/, "")}/api/v2/createInvoiceLink`;
var buildInvoicePayload = (order, customer, items) => {
  const customerName = splitName(customer.name);
  return {
    cartTotal: formatAmount(order.totalAmount),
    currency: brand.currency.code,
    invoice_number: `HM-${order.id}-${Date.now()}`,
    customer: {
      first_name: customerName.first,
      last_name: customerName.last,
      email: customer.email,
      phone: customer.phone || brand.phone,
      address: order.deliveryAddress
    },
    redirectionUrls: {
      successUrl: env.fawaterak.successUrl,
      failUrl: env.fawaterak.cancelUrl,
      pendingUrl: env.fawaterak.successUrl,
      webhookUrl: env.fawaterak.callbackUrl
    },
    cartItems: items.map((item) => ({
      name: item.name,
      price: formatAmount(item.price),
      quantity: String(item.quantity)
    })),
    payLoad: {
      order_id: order.id,
      user_id: order.userId
    },
    sendEmail: false,
    sendSMS: false
  };
};
var extractOrderIdFromPayload = (payload) => {
  const directOrderId = readNumber2(payload.order_id ?? payload.orderId);
  if (directOrderId !== null && Number.isInteger(directOrderId)) {
    return directOrderId;
  }
  const payLoad = payload.pay_load ?? payload.payLoad;
  let parsed = payLoad;
  if (typeof payLoad === "string") {
    try {
      parsed = JSON.parse(payLoad);
    } catch {
      return null;
    }
  }
  const record = asRecord(parsed);
  const nestedOrderId = readNumber2(record.order_id ?? record.orderId);
  return nestedOrderId !== null && Number.isInteger(nestedOrderId) ? nestedOrderId : null;
};
var resolveOrderFromWebhook = async (payload) => {
  const invoiceId = readString2(payload.invoice_id ?? payload.invoiceId);
  if (invoiceId) {
    const order = await orderRepository.findByPaymentId(invoiceId);
    if (order) return order;
  }
  const orderId = extractOrderIdFromPayload(payload);
  if (orderId !== null) {
    const order = await orderRepository.findById(orderId);
    if (order) return order;
  }
  throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
};
var resolveWebhookStatus = (rawStatus) => {
  switch (rawStatus.toLowerCase()) {
    case "paid":
    case "success":
    case "completed":
    case "captured":
      return { paymentStatus: "PAID", orderStatus: "PREPARING" };
    case "failed":
    case "cancelled":
    case "canceled":
    case "expired":
    case "declined":
      return { paymentStatus: "FAILED", orderStatus: null };
    case "refunded":
    case "refund":
      return { paymentStatus: "REFUNDED", orderStatus: "CANCELLED" };
    default:
      return null;
  }
};
var paymentService = {
  isConfigured() {
    return env.fawaterak.enabled;
  },
  async createInvoiceForOrder(orderId) {
    if (!env.fawaterak.enabled) {
      throw new ApiError(
        503,
        "\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062F\u0641\u0639 \u0641\u0648\u0627\u062A\u064A\u0631\u0643 \u063A\u064A\u0631 \u0645\u0641\u0639\u0651\u0644\u0629 \u062D\u0627\u0644\u064A\u0627\u064B\u060C \u064A\u0645\u0643\u0646\u0643 \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0637\u0644\u0628 \u0648\u0627\u0644\u062F\u0641\u0639 \u0644\u0627\u062D\u0642\u0627\u064B"
      );
    }
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    if (order.paymentStatus === "PAID") {
      throw ApiError.badRequest("\u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0645\u062F\u0641\u0648\u0639 \u0628\u0627\u0644\u0641\u0639\u0644");
    }
    const [items, user] = await Promise.all([
      orderRepository.findItemsByOrderId(orderId),
      userRepository.findById(order.userId)
    ]);
    if (!user) throw ApiError.notFound("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0639\u0645\u064A\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");
    if (items.length === 0) throw ApiError.badRequest("\u0627\u0644\u0637\u0644\u0628 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0623\u0635\u0646\u0627\u0641");
    const payload = buildInvoicePayload(
      order,
      { name: user.name, email: user.email, phone: user.phone },
      items.map((item) => ({
        name: item.name,
        price: item.priceAtPurchase,
        quantity: item.quantity
      }))
    );
    try {
      const response = await import_axios.default.post(
        invoiceApiUrl(),
        payload,
        {
          headers: {
            Authorization: `Bearer ${env.fawaterak.apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          timeout: 2e4
        }
      );
      const data = response.data;
      const paymentUrl = data.data?.url ?? data.data?.invoiceUrl ?? null;
      const invoiceId = readString2(data.data?.invoiceId);
      if (data.status !== "success" || !paymentUrl || !invoiceId) {
        throw new Error(data.message || "Invalid Fawaterak response");
      }
      await orderRepository.updatePaymentInfo(orderId, invoiceId, paymentUrl);
      return {
        paymentId: invoiceId,
        paymentUrl,
        invoiceKey: data.data?.invoiceKey ?? null
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error("Fawaterak invoice creation failed:", error);
      throw new ApiError(
        502,
        "\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0631\u0627\u0628\u0637 \u0627\u0644\u062F\u0641\u0639\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649"
      );
    }
  },
  verifyWebhookSignature(payload, signatureHeader, rawBody) {
    if (!env.fawaterak.webhookEnabled) {
      throw new ApiError(503, "\u0627\u0644\u0648\u064A\u0628 \u0647\u0648\u0643 \u063A\u064A\u0631 \u0645\u0647\u064A\u0623 \u0639\u0644\u0649 \u0627\u0644\u062E\u0627\u062F\u0645");
    }
    const secret = env.fawaterak.webhookSecret;
    const hashKey = readString2(payload.hashKey ?? payload.hash_key);
    const invoiceId = readString2(payload.invoice_id ?? payload.invoiceId);
    const invoiceKey = readString2(payload.invoice_key ?? payload.invoiceKey);
    const paymentMethod = readString2(
      payload.payment_method ?? payload.paymentMethod
    );
    if (hashKey && invoiceId && invoiceKey && paymentMethod) {
      const canonical = `InvoiceId=${invoiceId}&InvoiceKey=${invoiceKey}&PaymentMethod=${paymentMethod}`;
      const expected = import_node_crypto.default.createHmac("sha256", secret).update(canonical).digest("hex");
      if (secureCompare(expected, hashKey)) return;
    }
    if (signatureHeader) {
      const normalized = signatureHeader.replace(/^sha256=/i, "").trim();
      const message = rawBody ?? Buffer.from(JSON.stringify(payload), "utf8");
      const expected = import_node_crypto.default.createHmac("sha256", secret).update(message).digest("hex");
      if (secureCompare(expected, normalized)) return;
    }
    throw ApiError.unauthorized("\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");
  },
  async handleWebhook(payload, signatureHeader, rawBody) {
    this.verifyWebhookSignature(payload, signatureHeader, rawBody);
    const order = await resolveOrderFromWebhook(payload);
    const reportedAmount = readNumber2(payload.amount ?? payload.total);
    if (reportedAmount !== null && Math.abs(reportedAmount - order.totalAmount) > 0.01) {
      throw ApiError.badRequest("\u0645\u0628\u0644\u063A \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0627 \u064A\u0637\u0627\u0628\u0642 \u0642\u064A\u0645\u0629 \u0627\u0644\u0637\u0644\u0628");
    }
    const rawStatus = readString2(
      payload.invoice_status ?? payload.status ?? payload.payment_status ?? payload.paymentStatus
    ) ?? "";
    const resolved = resolveWebhookStatus(rawStatus);
    if (!resolved) {
      return { orderId: order.id, paymentStatus: order.paymentStatus };
    }
    if (order.paymentStatus === "PAID" && resolved.paymentStatus !== "PAID") {
      return { orderId: order.id, paymentStatus: order.paymentStatus };
    }
    const nextOrderStatus = resolved.orderStatus === "PREPARING" && order.orderStatus !== "PENDING" ? order.orderStatus : resolved.orderStatus ?? order.orderStatus;
    await orderRepository.updateStatuses(
      order.id,
      resolved.paymentStatus,
      nextOrderStatus
    );
    return { orderId: order.id, paymentStatus: resolved.paymentStatus };
  },
  async retryPayment(orderId, userId, isAdmin) {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    if (!isAdmin && order.userId !== userId) {
      throw ApiError.forbidden("\u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062F\u0641\u0639 \u0645\u0642\u0627\u0628\u0644 \u0637\u0644\u0628 \u0644\u0627 \u064A\u062E\u0635\u0643");
    }
    return this.createInvoiceForOrder(orderId);
  }
};

// src/services/orderService.ts
var groupItems = (orders, items) => {
  const grouped = /* @__PURE__ */ new Map();
  for (const item of items) {
    const bucket = grouped.get(item.orderId);
    if (bucket) {
      bucket.push(item);
    } else {
      grouped.set(item.orderId, [item]);
    }
  }
  return orders.map((order) => toOrderDto(order, grouped.get(order.id) ?? []));
};
var loadOrderDto = async (orderId) => {
  const [order, items] = await Promise.all([
    orderRepository.findById(orderId),
    orderRepository.findItemsByOrderId(orderId)
  ]);
  if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
  return toOrderDto(order, items);
};
var orderService = {
  async create(userId, input) {
    const quantities = /* @__PURE__ */ new Map();
    for (const item of input.items) {
      quantities.set(
        item.menuItemId,
        (quantities.get(item.menuItemId) ?? 0) + item.quantity
      );
    }
    const menuItemIds = [...quantities.keys()];
    const menuItems = await menuRepository.findByIds(menuItemIds);
    const menuById = new Map(menuItems.map((item) => [item.id, item]));
    const validatedItems = [];
    let totalAmount = 0;
    for (const menuItemId of menuItemIds) {
      const menuItem = menuById.get(menuItemId);
      if (!menuItem) {
        throw ApiError.badRequest(`\u0627\u0644\u0635\u0646\u0641 \u0631\u0642\u0645 ${menuItemId} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F`);
      }
      if (!menuItem.isAvailable) {
        throw ApiError.badRequest(`\u0627\u0644\u0635\u0646\u0641 "${menuItem.name}" \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B`);
      }
      const quantity = quantities.get(menuItemId) ?? 0;
      const lineTotal = roundMoney(menuItem.price * quantity);
      totalAmount = roundMoney(totalAmount + lineTotal);
      validatedItems.push({
        menuItemId,
        quantity,
        price: menuItem.price
      });
    }
    const paymentMethod = input.paymentMethod ?? "ONLINE";
    const orderId = await orderRepository.createWithItems({
      userId,
      totalAmount,
      deliveryAddress: input.deliveryAddress,
      paymentMethod,
      notes: input.notes?.trim() || null,
      items: validatedItems.map((item) => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        priceAtPurchase: item.price
      }))
    });
    try {
      await paymentService.createInvoiceForOrder(orderId);
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 503) {
        console.warn("Payment gateway unavailable:", error.message);
      } else {
        console.error("Payment invoice could not be generated:", error);
      }
    }
    return loadOrderDto(orderId);
  },
  async listForUser(userId, page, status) {
    const { orders, total } = await orderRepository.list(
      { userId, status },
      { limit: page.limit, offset: page.offset }
    );
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id)
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit)
      }
    };
  },
  async listAll(page, filters) {
    const { orders, total } = await orderRepository.list(filters, {
      limit: page.limit,
      offset: page.offset
    });
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id)
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit)
      }
    };
  },
  async getById(orderId, user) {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    const canView = user.role === "admin" || order.userId === user.id || user.role === "delivery" && order.deliveryUserId === user.id;
    if (!canView) {
      throw ApiError.forbidden("\u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u0639\u0631\u0636 \u0637\u0644\u0628 \u0644\u0627 \u064A\u062E\u0635\u0643");
    }
    const items = await orderRepository.findItemsByOrderId(orderId);
    return toOrderDto(order, items);
  },
  async updateStatus(orderId, status, actor) {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    if (order.orderStatus === "DELIVERED" || order.orderStatus === "CANCELLED") {
      throw ApiError.conflict("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0639\u062F\u064A\u0644 \u0637\u0644\u0628 \u0645\u0643\u062A\u0645\u0644 \u0623\u0648 \u0645\u0644\u063A\u064A");
    }
    if (actor.role === "kitchen") {
      if (status === "PREPARING" && order.orderStatus === "PENDING") {
      } else if (status === "READY" && (order.orderStatus === "PENDING" || order.orderStatus === "PREPARING")) {
      } else {
        throw ApiError.forbidden(
          '\u064A\u0645\u0643\u0646 \u0644\u0644\u0645\u0637\u0628\u062E \u062A\u062D\u0648\u064A\u0644 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649 "\u0642\u064A\u062F \u0627\u0644\u062A\u062D\u0636\u064A\u0631" \u0623\u0648 "\u062C\u0627\u0647\u0632" \u0641\u0642\u0637'
        );
      }
    } else if (actor.role === "cashier" || actor.role === "delivery") {
      throw ApiError.forbidden(
        "\u062A\u062D\u062F\u064A\u062B \u0647\u0630\u0647 \u0627\u0644\u062D\u0627\u0644\u0629 \u064A\u062A\u0645 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0634\u0627\u0634\u0629 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0645\u062E\u0635\u0635\u0629"
      );
    }
    if (status === "OUT_FOR_DELIVERY" || status === "DELIVERED") {
      throw ApiError.forbidden(
        "\u0625\u0633\u0646\u0627\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0648\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u064A\u062A\u0645\u0627\u0646 \u0645\u0646 \u0634\u0627\u0634\u062A\u064A \u0627\u0644\u0643\u0627\u0634\u064A\u0631 \u0648\u0627\u0644\u062A\u0648\u0635\u064A\u0644"
      );
    }
    await orderRepository.updateOrderStatus(orderId, status);
    return loadOrderDto(orderId);
  },
  async getStats() {
    return orderRepository.getStats();
  },
  async listKitchen(page) {
    const { orders, total } = await orderRepository.list(
      { userId: void 0, status: ["PENDING", "PREPARING"] },
      page
    );
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id)
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit)
      }
    };
  },
  async listCashier(page) {
    const { orders, total } = await orderRepository.list(
      { userId: void 0, status: ["READY"] },
      page
    );
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id)
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit)
      }
    };
  },
  async listDrivers() {
    const drivers = await userRepository.listApprovedByRole("delivery");
    return drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      email: driver.email,
      phone: driver.phone
    }));
  },
  async listForDelivery(page, actor) {
    const { orders, total } = await orderRepository.list(
      {
        status: ["OUT_FOR_DELIVERY"],
        deliveryUserId: actor.role === "delivery" ? actor.id : void 0
      },
      page
    );
    const items = await orderRepository.findItemsByOrderIds(
      orders.map((order) => order.id)
    );
    return {
      items: groupItems(orders, items),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit)
      }
    };
  },
  async dispatch(orderId, deliveryUserId, actor) {
    if (actor.role !== "cashier" && actor.role !== "admin") {
      throw ApiError.forbidden("\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0644\u0643\u0627\u0634\u064A\u0631");
    }
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    if (order.orderStatus !== "READY") {
      throw ApiError.conflict("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0625\u0633\u0646\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0642\u0628\u0644 \u0623\u0646 \u064A\u0635\u0628\u062D \u062C\u0627\u0647\u0632\u0627\u064B");
    }
    const driver = await userRepository.findById(deliveryUserId);
    if (!driver || driver.role !== "delivery" || !driver.isApproved) {
      throw ApiError.badRequest("\u0633\u0627\u0626\u0642 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u062A\u0627\u062D");
    }
    const dispatched = await orderRepository.dispatchToDriver(
      orderId,
      deliveryUserId
    );
    if (!dispatched) {
      throw ApiError.conflict(
        "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 \u0642\u0628\u0644 \u0645\u0648\u0638\u0641 \u0622\u062E\u0631\u060C \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644"
      );
    }
    return loadOrderDto(orderId);
  },
  async confirmDelivery(orderId, cashReceived, actor) {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    if (order.orderStatus !== "OUT_FOR_DELIVERY") {
      throw ApiError.conflict("\u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0644\u064A\u0633 \u0641\u064A \u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u062D\u0627\u0644\u064A\u0627\u064B");
    }
    if (actor.role === "delivery" && order.deliveryUserId !== actor.id) {
      throw ApiError.forbidden("\u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0645\u0633\u0646\u062F \u0625\u0644\u0649 \u0645\u0646\u062F\u0648\u0628 \u0622\u062E\u0631");
    }
    if (actor.role !== "delivery" && actor.role !== "admin") {
      throw ApiError.forbidden("\u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0645\u0646\u062F\u0648\u0628 \u0627\u0644\u062A\u0648\u0635\u064A\u0644");
    }
    let recordedCash = null;
    let change = null;
    if (order.paymentStatus !== "PAID") {
      if (cashReceived === void 0 || !Number.isFinite(cashReceived)) {
        throw ApiError.badRequest("\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0633\u062A\u0644\u0645 \u0645\u0637\u0644\u0648\u0628 \u0644\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u0633\u0644\u064A\u0645");
      }
      const normalizedCash = roundMoney(cashReceived);
      if (normalizedCash < order.totalAmount) {
        throw ApiError.badRequest(
          "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0633\u062A\u0644\u0645 \u0623\u0642\u0644 \u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0637\u0644\u0628"
        );
      }
      recordedCash = normalizedCash;
      change = roundMoney(normalizedCash - order.totalAmount);
    }
    const completed = await orderRepository.completeDelivery(
      orderId,
      recordedCash,
      change
    );
    if (!completed) {
      throw ApiError.conflict(
        "\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u062A\u0633\u0644\u064A\u0645 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 \u0642\u0628\u0644\u060C \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u062D\u0645\u064A\u0644"
      );
    }
    return loadOrderDto(orderId);
  }
};

// src/controllers/orderController.ts
var readStatusFilter = (value) => typeof value === "string" && isOrderStatus(value) ? value : void 0;
var orderController = {
  async create(req, res) {
    const user = requireAuthUser(req);
    const order = await orderService.create(user.id, req.body);
    res.status(201).json({
      success: true,
      message: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D",
      data: { order }
    });
  },
  async listMine(req, res) {
    const user = requireAuthUser(req);
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit
    );
    const result = await orderService.listForUser(
      user.id,
      page,
      readStatusFilter(req.query.status)
    );
    res.json({ success: true, data: result });
  },
  async getById(req, res) {
    const user = requireAuthUser(req);
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628");
    const order = await orderService.getById(id, user);
    res.json({ success: true, data: { order } });
  },
  async updateStatus(req, res) {
    const user = requireAuthUser(req);
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628");
    const status = req.body.orderStatus;
    const order = await orderService.updateStatus(id, status, user);
    res.json({
      success: true,
      message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628",
      data: { order }
    });
  },
  async adminList(req, res) {
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit
    );
    const paymentStatus = typeof req.query.paymentStatus === "string" && isPaymentStatus(req.query.paymentStatus) ? req.query.paymentStatus : void 0;
    const result = await orderService.listAll(page, {
      status: readStatusFilter(req.query.status),
      paymentStatus
    });
    res.json({ success: true, data: result });
  },
  async stats(_req, res) {
    const stats = await orderService.getStats();
    res.json({ success: true, data: { stats } });
  },
  async kitchenList(req, res) {
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit
    );
    const result = await orderService.listKitchen(page);
    res.json({ success: true, data: result });
  },
  async cashierList(req, res) {
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit
    );
    const result = await orderService.listCashier(page);
    res.json({ success: true, data: result });
  },
  async driverList(_req, res) {
    const drivers = await orderService.listDrivers();
    res.json({ success: true, data: { drivers } });
  },
  async deliveryList(req, res) {
    const user = requireAuthUser(req);
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit
    );
    const result = await orderService.listForDelivery(page, user);
    res.json({ success: true, data: result });
  },
  async dispatch(req, res) {
    const user = requireAuthUser(req);
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628");
    const deliveryUserId = Number(req.body.deliveryUserId);
    const order = await orderService.dispatch(id, deliveryUserId, user);
    res.json({
      success: true,
      message: "\u062A\u0645 \u0625\u0633\u0646\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0644\u0644\u0645\u0646\u062F\u0648\u0628 \u0648\u0628\u062F\u0621 \u0627\u0644\u062A\u0648\u0635\u064A\u0644",
      data: { order }
    });
  },
  async confirmDelivery(req, res) {
    const user = requireAuthUser(req);
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628");
    const rawCash = req.body.cashReceived;
    const cashReceived = typeof rawCash === "number" && Number.isFinite(rawCash) ? rawCash : void 0;
    const order = await orderService.confirmDelivery(
      id,
      cashReceived,
      user
    );
    res.json({
      success: true,
      message: "\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0648\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0645\u0628\u0644\u063A \u0628\u0646\u062C\u0627\u062D",
      data: { order }
    });
  }
};

// src/repositories/reservationRepository.ts
var mapReservation = (row) => ({
  id: Number(row.id),
  userId: row.user_id === null ? null : Number(row.user_id),
  name: row.name,
  phone: row.phone,
  email: row.email,
  date: String(row.date).slice(0, 10),
  time: String(row.time).slice(0, 5),
  guests: Number(row.guests),
  status: row.status,
  notes: row.notes,
  createdAt: toIsoString(row.created_at)
});
var toReservationDto = (reservation) => ({
  id: reservation.id,
  userId: reservation.userId,
  name: reservation.name,
  phone: reservation.phone,
  email: reservation.email,
  date: reservation.date,
  time: reservation.time,
  guests: reservation.guests,
  status: reservation.status,
  notes: reservation.notes,
  createdAt: reservation.createdAt
});
var selectColumns3 = `id, user_id, name, phone, email, date, time, guests,
  status, notes, created_at`;
var reservationRepository = {
  async create(data) {
    const result = await supabase.from("reservations").insert({
      user_id: data.userId,
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      date: data.date,
      time: data.time,
      guests: data.guests,
      status: "PENDING",
      notes: data.notes ?? null
    }).select("id").single();
    const row = unwrap(result, "create reservation");
    return Number(row.id);
  },
  async findById(id) {
    const result = await supabase.from("reservations").select(selectColumns3).eq("id", id).maybeSingle();
    const row = unwrap(result, "find reservation");
    return row ? mapReservation(row) : null;
  },
  async list(filters, page) {
    let query2 = supabase.from("reservations").select(selectColumns3, { count: "exact" });
    if (filters.userId !== void 0) {
      query2 = query2.eq("user_id", filters.userId);
    }
    if (filters.status) {
      query2 = query2.eq("status", filters.status);
    }
    if (filters.fromDate) {
      query2 = query2.gte("date", filters.fromDate);
    }
    const result = await query2.order("date", { ascending: false }).order("time", { ascending: false }).range(page.offset, page.offset + page.limit - 1);
    const rows = unwrap(result, "list reservations");
    return {
      reservations: (rows ?? []).map(mapReservation),
      total: result.count ?? 0
    };
  },
  async updateStatus(id, status) {
    const result = await supabase.from("reservations").update({ status }).eq("id", id).select("id");
    const rows = unwrap(result, "update reservation status");
    return (rows?.length ?? 0) > 0;
  }
};

// src/services/reservationService.ts
var reservationService = {
  async create(input, user) {
    const date = /* @__PURE__ */ new Date(`${input.date}T00:00:00`);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(date.getTime()) || date < today) {
      throw ApiError.badRequest("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u062C\u0632 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");
    }
    const id = await reservationRepository.create({
      ...input,
      userId: user?.id ?? null,
      notes: input.notes?.trim() || void 0,
      email: input.email?.trim() || void 0
    });
    const reservation = await reservationRepository.findById(id);
    if (!reservation) throw new ApiError(500, "\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u062C\u0632");
    return toReservationDto(reservation);
  },
  async listForUser(userId, page) {
    const { reservations, total } = await reservationRepository.list(
      { userId },
      { limit: page.limit, offset: page.offset }
    );
    return {
      items: reservations.map(toReservationDto),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit)
      }
    };
  },
  async listAll(filters, page) {
    const { reservations, total } = await reservationRepository.list(filters, {
      limit: page.limit,
      offset: page.offset
    });
    return {
      items: reservations.map(toReservationDto),
      pagination: {
        page: page.page,
        limit: page.limit,
        total,
        totalPages: Math.ceil(total / page.limit)
      }
    };
  },
  async updateStatus(id, status) {
    const existing = await reservationRepository.findById(id);
    if (!existing) throw ApiError.notFound("\u0627\u0644\u062D\u062C\u0632 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    await reservationRepository.updateStatus(id, status);
    const updated = await reservationRepository.findById(id);
    if (!updated) throw ApiError.notFound("\u0627\u0644\u062D\u062C\u0632 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    return toReservationDto(updated);
  }
};

// src/controllers/reservationController.ts
var reservationController = {
  async create(req, res) {
    const reservation = await reservationService.create(
      req.body,
      req.user
    );
    res.status(201).json({
      success: true,
      message: "\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u062C\u0632 \u0648\u0633\u064A\u062A\u0645 \u062A\u0623\u0643\u064A\u062F\u0647 \u0647\u0627\u062A\u0641\u064A\u0627\u064B",
      data: { reservation }
    });
  },
  async listMine(req, res) {
    const user = requireAuthUser(req);
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit
    );
    const result = await reservationService.listForUser(user.id, page);
    res.json({ success: true, data: result });
  },
  async adminList(req, res) {
    const page = paginationFromQuery(
      req.query,
      env.pagination.defaultLimit,
      env.pagination.maxLimit
    );
    const status = typeof req.query.status === "string" && isReservationStatus(req.query.status) ? req.query.status : void 0;
    const fromDate = typeof req.query.fromDate === "string" ? req.query.fromDate : void 0;
    const result = await reservationService.listAll(
      { status, fromDate },
      page
    );
    res.json({ success: true, data: result });
  },
  async updateStatus(req, res) {
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u062D\u062C\u0632");
    const status = req.body.status;
    const reservation = await reservationService.updateStatus(id, status);
    res.json({
      success: true,
      message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u062C\u0632",
      data: { reservation }
    });
  }
};

// src/utils/asyncHandler.ts
var asyncHandler = (handler2) => {
  return (req, res, next) => {
    void Promise.resolve(handler2(req, res, next)).catch(next);
  };
};

// src/utils/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var isRole = (value) => value === "customer" || value === "admin" || value === "kitchen" || value === "cashier" || value === "delivery";
var signToken = (user) => {
  const options = {
    expiresIn: env.jwt.expiresIn,
    issuer: "hadramout-house-of-mandi",
    audience: "hadramout-web"
  };
  return import_jsonwebtoken.default.sign(
    { sub: String(user.id), email: user.email, role: user.role },
    env.jwt.secret,
    options
  );
};
var verifyToken = (token) => {
  try {
    const payload = import_jsonwebtoken.default.verify(token, env.jwt.secret, {
      issuer: "hadramout-house-of-mandi",
      audience: "hadramout-web"
    });
    const id = Number(payload.sub);
    if (!Number.isInteger(id) || id <= 0 || typeof payload.email !== "string" || !isRole(payload.role)) {
      throw ApiError.unauthorized("\u0631\u0645\u0632 \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D", "AUTH_TOKEN_INVALID");
    }
    return { id, email: payload.email, role: payload.role };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof import_jsonwebtoken.default.TokenExpiredError) {
      throw ApiError.unauthorized(
        "\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062C\u0644\u0633\u0629\u060C \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
        "AUTH_TOKEN_EXPIRED"
      );
    }
    throw ApiError.unauthorized("\u0631\u0645\u0632 \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D", "AUTH_TOKEN_INVALID");
  }
};

// src/middleware/auth.ts
var authenticateRequest = async (req) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw ApiError.unauthorized("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", "AUTH_REQUIRED");
  }
  const token = header.slice(7).trim();
  if (!token) {
    throw ApiError.unauthorized("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", "AUTH_REQUIRED");
  }
  try {
    const payload = verifyToken(token);
    const user = await userRepository.findById(payload.id);
    if (!user) {
      throw ApiError.unauthorized("\u0627\u0644\u062D\u0633\u0627\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F", "AUTH_USER_NOT_FOUND");
    }
    const requiresApproval = user.role === "kitchen" || user.role === "cashier" || user.role === "delivery";
    if (requiresApproval && !user.isApproved) {
      throw ApiError.unauthorized(
        "\u062D\u0633\u0627\u0628\u0643 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629",
        "USER_NOT_APPROVED"
      );
    }
    req.user = { id: user.id, email: user.email, role: user.role, isApproved: user.isApproved };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw ApiError.unauthorized("\u0627\u0646\u062A\u0647\u062A \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u062C\u0644\u0633\u0629 ", "INVALID_TOKEN");
  }
};
var authenticate = asyncHandler(
  async (req, _res, next) => {
    await authenticateRequest(req);
    next();
  }
);
var optionalAuthenticate = asyncHandler(
  async (req, _res, next) => {
    if (req.headers.authorization) {
      try {
        await authenticateRequest(req);
      } catch {
        req.user = void 0;
      }
    }
    next();
  }
);
var requireAdmin = (req, _res, next) => {
  if (!req.user) {
    next(ApiError.unauthorized("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", "AUTH_REQUIRED"));
    return;
  }
  if (req.user.role !== "admin") {
    next(ApiError.forbidden("\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644"));
    return;
  }
  next();
};
var requireKitchen = (req, _res, next) => {
  if (!req.user) {
    next(ApiError.unauthorized("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", "AUTH_REQUIRED"));
    return;
  }
  if (req.user.role !== "kitchen" && req.user.role !== "admin") {
    next(ApiError.forbidden("\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0645\u0637\u0628\u062E"));
    return;
  }
  next();
};
var requireCashier = (req, _res, next) => {
  if (!req.user) {
    next(ApiError.unauthorized("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", "AUTH_REQUIRED"));
    return;
  }
  if (req.user.role !== "cashier" && req.user.role !== "admin") {
    next(ApiError.forbidden("\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0644\u0643\u0627\u0634\u064A\u0631"));
    return;
  }
  next();
};
var requireStaff = (req, _res, next) => {
  if (!req.user) {
    next(ApiError.unauthorized("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", "AUTH_REQUIRED"));
    return;
  }
  if (req.user.role !== "admin" && req.user.role !== "kitchen" && req.user.role !== "cashier") {
    next(ApiError.forbidden("\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u062A\u062D\u062F\u064A\u062B \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628"));
    return;
  }
  next();
};
var requireDelivery = (req, _res, next) => {
  if (!req.user) {
    next(ApiError.unauthorized("\u064A\u062C\u0628 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629", "AUTH_REQUIRED"));
    return;
  }
  if (req.user.role !== "delivery" && req.user.role !== "admin") {
    next(ApiError.forbidden("\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u062A\u0648\u0635\u064A\u0644"));
    return;
  }
  next();
};

// src/middleware/validators.ts
var import_express_validator = require("express-validator");
var categoryIds = menuCategories.map((category) => category.id);
var registerRules = [
  (0, import_express_validator.body)("name").trim().customSanitizer(sanitizePlainText).isLength({ min: 2, max: 100 }).withMessage("\u0627\u0644\u0627\u0633\u0645 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u064A\u0646 2 \u0648 100 \u062D\u0631\u0641"),
  (0, import_express_validator.body)("email").trim().isEmail().withMessage("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").normalizeEmail(),
  (0, import_express_validator.body)("password").isString().isLength({ min: 8, max: 72 }).withMessage("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0628\u064A\u0646 8 \u0648 72 \u062D\u0631\u0641\u0627\u064B"),
  (0, import_express_validator.body)("phone").optional({ values: "falsy" }).trim().matches(/^\+?[0-9\s-]{7,20}$/).withMessage("\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").customSanitizer(sanitizePlainText)
];
var loginRules = [
  (0, import_express_validator.body)("email").trim().isEmail().withMessage("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").normalizeEmail(),
  (0, import_express_validator.body)("password").isString().notEmpty().withMessage("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0637\u0644\u0648\u0628\u0629")
];
var menuItemRules = [
  (0, import_express_validator.body)("name").trim().customSanitizer(sanitizePlainText).isLength({ min: 2, max: 255 }).withMessage("\u0627\u0633\u0645 \u0627\u0644\u0637\u0628\u0642 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"),
  (0, import_express_validator.body)("nameEn").optional({ values: "falsy" }).trim().customSanitizer(sanitizePlainText).isLength({ max: 255 }),
  (0, import_express_validator.body)("description").optional({ values: "falsy" }).trim().customSanitizer(sanitizeMultilineText).isLength({ max: 2e3 }).withMessage("\u0648\u0635\u0641 \u0627\u0644\u0637\u0628\u0642 \u0637\u0648\u064A\u0644 \u062C\u062F\u0627\u064B"),
  (0, import_express_validator.body)("descriptionEn").optional({ values: "falsy" }).trim().customSanitizer(sanitizeMultilineText).isLength({ max: 2e3 }),
  (0, import_express_validator.body)("price").isFloat({ gt: 0, lt: 1e5 }).withMessage("\u0627\u0644\u0633\u0639\u0631 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0631\u0642\u0645\u0627\u064B \u0623\u0643\u0628\u0631 \u0645\u0646 \u0635\u0641\u0631").toFloat(),
  (0, import_express_validator.body)("category").trim().isIn(categoryIds).withMessage("\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0637\u0628\u0642 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"),
  (0, import_express_validator.body)("imageUrl").optional({ values: "falsy" }).trim().isURL({ protocols: ["http", "https"], require_protocol: true }).withMessage("\u0631\u0627\u0628\u0637 \u0627\u0644\u0635\u0648\u0631\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").isLength({ max: 500 }),
  (0, import_express_validator.body)("isAvailable").optional().isBoolean().toBoolean()
];
var orderRules = [
  (0, import_express_validator.body)("items").isArray({ min: 1, max: 50 }).withMessage("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0646\u0641 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"),
  (0, import_express_validator.body)("items.*.menuItemId").isInt({ min: 1 }).withMessage("\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0635\u0646\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toInt(),
  (0, import_express_validator.body)("items.*.quantity").isInt({ min: 1, max: 50 }).withMessage("\u0627\u0644\u0643\u0645\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0628\u064A\u0646 1 \u0648 50").toInt(),
  (0, import_express_validator.body)("deliveryAddress").trim().customSanitizer(sanitizeMultilineText).isLength({ min: 10, max: 500 }).withMessage("\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u064A\u0646 10 \u0648 500 \u062D\u0631\u0641"),
  (0, import_express_validator.body)("notes").optional({ values: "falsy" }).trim().customSanitizer(sanitizeMultilineText).isLength({ max: 500 }).withMessage("\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0637\u0648\u064A\u0644\u0629 \u062C\u062F\u0627\u064B")
];
var orderStatusRules = [
  (0, import_express_validator.param)("id").isInt({ min: 1 }).withMessage("\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toInt(),
  (0, import_express_validator.body)("orderStatus").isIn(orderStatusList).withMessage("\u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629")
];
var dispatchOrderRules = [
  (0, import_express_validator.param)("id").isInt({ min: 1 }).withMessage("\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toInt(),
  (0, import_express_validator.body)("deliveryUserId").isInt({ min: 1 }).withMessage("\u064A\u062C\u0628 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0646\u062F\u0648\u0628 \u062A\u0648\u0635\u064A\u0644 \u0635\u0627\u0644\u062D").toInt()
];
var confirmDeliveryRules = [
  (0, import_express_validator.param)("id").isInt({ min: 1 }).withMessage("\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toInt(),
  (0, import_express_validator.body)("cashReceived").optional({ values: "null" }).isFloat({ min: 0, max: 1e6 }).withMessage("\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0645\u0633\u062A\u0644\u0645 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toFloat()
];
var reservationRules = [
  (0, import_express_validator.body)("name").trim().customSanitizer(sanitizePlainText).isLength({ min: 2, max: 100 }).withMessage("\u0627\u0644\u0627\u0633\u0645 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u064A\u0646 2 \u0648 100 \u062D\u0631\u0641"),
  (0, import_express_validator.body)("phone").trim().matches(/^\+?[0-9\s-]{7,20}$/).withMessage("\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").customSanitizer(sanitizePlainText),
  (0, import_express_validator.body)("email").optional({ values: "falsy" }).trim().isEmail().withMessage("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").normalizeEmail(),
  (0, import_express_validator.body)("date").isISO8601({ strict: true }).withMessage("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062D\u062C\u0632 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").custom((value) => {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    if (value < today) throw new Error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062D\u062C\u0632 \u0641\u064A \u062A\u0627\u0631\u064A\u062E \u0645\u0627\u0636\u064A");
    return true;
  }),
  (0, import_express_validator.body)("time").matches(/^([01]\d|2[0-3]):[0-5]\d$/).withMessage("\u0648\u0642\u062A \u0627\u0644\u062D\u062C\u0632 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"),
  (0, import_express_validator.body)("guests").isInt({ min: 1, max: appConfig.maxGuests }).withMessage(`\u0639\u062F\u062F \u0627\u0644\u0636\u064A\u0648\u0641 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u064A\u0646 1 \u0648 ${appConfig.maxGuests}`).toInt(),
  (0, import_express_validator.body)("notes").optional({ values: "falsy" }).trim().customSanitizer(sanitizeMultilineText).isLength({ max: 500 })
];
var reservationStatusRules = [
  (0, import_express_validator.param)("id").isInt({ min: 1 }).withMessage("\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u062D\u062C\u0632 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toInt(),
  (0, import_express_validator.body)("status").isIn(reservationStatusList).withMessage("\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u062C\u0632 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629")
];
var menuIdRules = [
  (0, import_express_validator.param)("id").isInt({ min: 1 }).withMessage("\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0628\u0642 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toInt()
];
var menuQueryRules = [
  (0, import_express_validator.query)("category").optional({ values: "falsy" }).isIn(categoryIds).withMessage("\u062A\u0635\u0646\u064A\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D"),
  (0, import_express_validator.query)("search").optional({ values: "falsy" }).trim().isLength({ max: 100 }).withMessage("\u0646\u0635 \u0627\u0644\u0628\u062D\u062B \u0637\u0648\u064A\u0644 \u062C\u062F\u0627\u064B"),
  (0, import_express_validator.query)("available").optional({ values: "falsy" }).isIn(["true", "false", "all"]).withMessage("\u0642\u064A\u0645\u0629 \u0627\u0644\u062A\u0648\u0641\u0631 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629")
];
var orderIdRules = [
  (0, import_express_validator.param)("id").isInt({ min: 1 }).withMessage("\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D").toInt()
];

// src/middleware/validate.ts
var import_express_validator2 = require("express-validator");
var validate = (req, _res, next) => {
  const result = (0, import_express_validator2.validationResult)(req);
  if (result.isEmpty()) {
    next();
    return;
  }
  const errors = result.array().map((error) => {
    if (typeof error.msg === "string") return error.msg;
    return "\u0642\u064A\u0645\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629";
  });
  next(ApiError.badRequest("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629", errors));
};

// src/routes/adminRoutes.ts
var adminRoutes = (0, import_express.Router)();
adminRoutes.use(authenticate, requireAdmin);
adminRoutes.get("/orders", asyncHandler(orderController.adminList));
adminRoutes.get("/stats", asyncHandler(orderController.stats));
adminRoutes.get("/reservations", asyncHandler(reservationController.adminList));
adminRoutes.patch(
  "/reservations/:id/status",
  reservationStatusRules,
  validate,
  asyncHandler(reservationController.updateStatus)
);

// src/routes/authRoutes.ts
var import_express2 = require("express");

// src/services/authService.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var buildAuthResponse = (user) => ({
  token: signToken({ id: user.id, email: user.email, role: user.role }),
  user: toUserDto(user)
});
var authService = {
  async register(input) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw ApiError.conflict("\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644");
    }
    const passwordHash = await import_bcryptjs.default.hash(input.password, env.bcryptRounds);
    const userId = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      phone: input.phone?.trim() || null,
      role: "customer"
    });
    const user = await userRepository.findById(userId);
    if (!user) throw new ApiError(500, "\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628");
    return buildAuthResponse(user);
  },
  async login(input) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw ApiError.unauthorized("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");
    }
    const valid = await import_bcryptjs.default.compare(input.password, user.passwordHash);
    if (!valid) {
      throw ApiError.unauthorized("\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");
    }
    if ((user.role === "kitchen" || user.role === "cashier" || user.role === "delivery") && !user.isApproved) {
      throw ApiError.forbidden(
        "\u062D\u0633\u0627\u0628\u0643 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u0648\u0627\u0641\u0642\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"
      );
    }
    return buildAuthResponse(user);
  },
  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.unauthorized("\u0627\u0644\u062D\u0633\u0627\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    return toUserDto(user);
  }
};

// src/controllers/authController.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var authController = {
  async register(req, res) {
    const body2 = req.body;
    const result = await authService.register(body2);
    res.status(201).json({
      success: true,
      message: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D",
      data: result
    });
  },
  async login(req, res) {
    const body2 = req.body;
    const result = await authService.login(body2);
    res.json({
      success: true,
      message: "\u062A\u0645 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0628\u0646\u062C\u0627\u062D",
      data: result
    });
  },
  async me(req, res) {
    const user = requireAuthUser(req);
    const profile = await authService.getProfile(user.id);
    res.json({ success: true, data: { user: profile } });
  },
  async approveUser(req, res) {
    const targetId = Number(req.params.id);
    const myUser = requireAuthUser(req);
    if (myUser.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644"
      });
      return;
    }
    const currentlyApproved = await userRepository.isApproved(targetId);
    await userRepository.updateApproval(targetId, !currentlyApproved);
    const updatedUser = await userRepository.findById(targetId);
    res.json({
      success: true,
      message: updatedUser?.isApproved ? "\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" : "\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",
      data: { isApproved: updatedUser?.isApproved ?? false }
    });
  },
  async createStaff(req, res) {
    const { email, password, role } = req.body;
    const myUser = requireAuthUser(req);
    if (myUser.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0635\u0648\u0644"
      });
      return;
    }
    if (role !== "kitchen" && role !== "cashier" && role !== "delivery") {
      throw ApiError.badRequest("\u062F\u0648\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D");
    }
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      res.status(400).json({
        success: false,
        message: "\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644"
      });
      return;
    }
    const passwordHash = await import_bcryptjs2.default.hash(password, env.bcryptRounds);
    const userId = await userRepository.create({
      name: email.split("@")[0] ?? "\u0645\u0648\u0638\u0641",
      email: email.toLowerCase(),
      passwordHash,
      phone: null,
      role
    });
    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0648\u0638\u0641");
    }
    res.json({
      success: true,
      message: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0648\u0638\u0641 \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629",
      data: { id: user.id, email: user.email, role: user.role, isApproved: user.isApproved }
    });
  }
};

// src/routes/authRoutes.ts
var authRoutes = (0, import_express2.Router)();
authRoutes.post(
  "/register",
  authLimiter,
  registerRules,
  validate,
  asyncHandler(authController.register)
);
authRoutes.post(
  "/login",
  authLimiter,
  loginRules,
  validate,
  asyncHandler(authController.login)
);
authRoutes.get("/me", authenticate, asyncHandler(authController.me));
authRoutes.patch(
  "/users/:id/approve",
  authenticate,
  requireAdmin,
  asyncHandler(authController.approveUser)
);
authRoutes.post(
  "/staff/create",
  authenticate,
  requireAdmin,
  asyncHandler(authController.createStaff)
);

// src/routes/configRoutes.ts
var import_express3 = require("express");

// src/controllers/configController.ts
var configController = {
  get(_req, res) {
    res.setHeader("Cache-Control", "public, max-age=300");
    res.json({
      success: true,
      data: {
        brand,
        config: appConfig,
        payment: {
          enabled: env.fawaterak.enabled,
          methods: ["wallet", "fawry", "card"]
        }
      }
    });
  }
};

// src/routes/configRoutes.ts
var configRoutes = (0, import_express3.Router)();
configRoutes.get("/", configController.get);

// src/routes/menuRoutes.ts
var import_express4 = require("express");

// src/services/menuService.ts
var normalizeInput = (input) => ({
  name: input.name,
  nameEn: input.nameEn?.trim() || void 0,
  description: input.description?.trim() || void 0,
  descriptionEn: input.descriptionEn?.trim() || void 0,
  price: Number(input.price),
  category: input.category,
  imageUrl: input.imageUrl?.trim() || void 0,
  isAvailable: input.isAvailable ?? true
});
var menuService = {
  async list(filters) {
    const items = await menuRepository.list(filters);
    return items.map(toMenuItemDto);
  },
  async getById(id) {
    const item = await menuRepository.findById(id);
    if (!item) throw ApiError.notFound("\u0627\u0644\u0637\u0628\u0642 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    return toMenuItemDto(item);
  },
  async create(input) {
    const id = await menuRepository.create(normalizeInput(input));
    const item = await menuRepository.findById(id);
    if (!item) throw new ApiError(500, "\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0637\u0628\u0642");
    return toMenuItemDto(item);
  },
  async update(id, input) {
    const existing = await menuRepository.findById(id);
    if (!existing) throw ApiError.notFound("\u0627\u0644\u0637\u0628\u0642 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    const normalized = normalizeInput({
      ...input,
      isAvailable: input.isAvailable ?? existing.isAvailable
    });
    const updated = await menuRepository.update(id, normalized);
    if (!updated) throw ApiError.notFound("\u0627\u0644\u0637\u0628\u0642 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    const item = await menuRepository.findById(id);
    if (!item) throw new ApiError(500, "\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0628\u0642");
    return toMenuItemDto(item);
  },
  async delete(id) {
    const existing = await menuRepository.findById(id);
    if (!existing) throw ApiError.notFound("\u0627\u0644\u0637\u0628\u0642 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
    await menuRepository.delete(id);
  }
};

// src/controllers/menuController.ts
var menuController = {
  async list(req, res) {
    const category = typeof req.query.category === "string" ? req.query.category : void 0;
    const search = typeof req.query.search === "string" ? req.query.search : void 0;
    const availableQuery = typeof req.query.available === "string" ? req.query.available : void 0;
    let available = true;
    if (availableQuery === "all") {
      available = req.user?.role === "admin" ? void 0 : true;
    } else if (availableQuery === "false") {
      available = req.user?.role === "admin" ? false : true;
    }
    const items = await menuService.list({ category, search, available });
    res.json({ success: true, data: { items } });
  },
  async getById(req, res) {
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0628\u0642");
    const item = await menuService.getById(id);
    res.json({ success: true, data: { item } });
  },
  async create(req, res) {
    const item = await menuService.create(req.body);
    res.status(201).json({
      success: true,
      message: "\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0637\u0628\u0642 \u0628\u0646\u062C\u0627\u062D",
      data: { item }
    });
  },
  async update(req, res) {
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0628\u0642");
    const item = await menuService.update(id, req.body);
    res.json({
      success: true,
      message: "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0628\u0642 \u0628\u0646\u062C\u0627\u062D",
      data: { item }
    });
  },
  async remove(req, res) {
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0628\u0642");
    await menuService.delete(id);
    res.json({ success: true, message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0637\u0628\u0642 \u0628\u0646\u062C\u0627\u062D", data: { id } });
  }
};

// src/routes/menuRoutes.ts
var menuRoutes = (0, import_express4.Router)();
menuRoutes.get(
  "/",
  optionalAuthenticate,
  menuQueryRules,
  validate,
  asyncHandler(menuController.list)
);
menuRoutes.get(
  "/:id",
  menuIdRules,
  validate,
  asyncHandler(menuController.getById)
);
menuRoutes.post(
  "/",
  authenticate,
  requireAdmin,
  menuItemRules,
  validate,
  asyncHandler(menuController.create)
);
menuRoutes.put(
  "/:id",
  authenticate,
  requireAdmin,
  menuIdRules,
  menuItemRules,
  validate,
  asyncHandler(menuController.update)
);
menuRoutes.patch(
  "/:id",
  authenticate,
  requireAdmin,
  menuIdRules,
  menuItemRules,
  validate,
  asyncHandler(menuController.update)
);
menuRoutes.delete(
  "/:id",
  authenticate,
  requireAdmin,
  menuIdRules,
  validate,
  asyncHandler(menuController.remove)
);

// src/routes/orderRoutes.ts
var import_express5 = require("express");
var orderRoutes = (0, import_express5.Router)();
orderRoutes.use(authenticate);
orderRoutes.post(
  "/",
  checkoutLimiter,
  orderRules,
  validate,
  asyncHandler(orderController.create)
);
orderRoutes.get("/", asyncHandler(orderController.listMine));
orderRoutes.get(
  "/kitchen",
  requireKitchen,
  asyncHandler(orderController.kitchenList)
);
orderRoutes.get(
  "/cashier",
  requireCashier,
  asyncHandler(orderController.cashierList)
);
orderRoutes.get(
  "/drivers",
  requireCashier,
  asyncHandler(orderController.driverList)
);
orderRoutes.get(
  "/delivery",
  requireDelivery,
  asyncHandler(orderController.deliveryList)
);
orderRoutes.get(
  "/:id",
  orderIdRules,
  validate,
  asyncHandler(orderController.getById)
);
orderRoutes.patch(
  "/:id/status",
  requireStaff,
  orderStatusRules,
  validate,
  asyncHandler(orderController.updateStatus)
);
orderRoutes.post(
  "/:id/dispatch",
  requireCashier,
  dispatchOrderRules,
  validate,
  asyncHandler(orderController.dispatch)
);
orderRoutes.post(
  "/:id/confirm-delivery",
  requireDelivery,
  confirmDeliveryRules,
  validate,
  asyncHandler(orderController.confirmDelivery)
);

// src/routes/paymentRoutes.ts
var import_express6 = require("express");

// src/controllers/paymentController.ts
var readSignature = (value) => {
  if (Array.isArray(value)) return value[0];
  return value;
};
var paymentController = {
  async webhook(req, res) {
    const payload = typeof req.body === "object" && req.body !== null ? req.body : {};
    const signature = readSignature(
      req.headers["x-fawaterak-signature"]
    ) ?? readSignature(req.headers["x-signature"]) ?? readSignature(req.headers.signature);
    const result = await paymentService.handleWebhook(
      payload,
      signature,
      req.rawBody
    );
    res.json({
      success: true,
      message: "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u062F\u0641\u0639",
      data: result
    });
  },
  async retry(req, res) {
    const user = requireAuthUser(req);
    const orderId = parseId(String(req.params.orderId), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628");
    const payment = await paymentService.retryPayment(
      orderId,
      user.id,
      user.role === "admin"
    );
    res.json({
      success: true,
      message: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0631\u0627\u0628\u0637 \u0627\u0644\u062F\u0641\u0639",
      data: { payment }
    });
  }
};

// src/routes/paymentRoutes.ts
var paymentRoutes = (0, import_express6.Router)();
paymentRoutes.post(
  "/webhook",
  paymentLimiter,
  asyncHandler(paymentController.webhook)
);
paymentRoutes.post(
  "/retry/:orderId",
  authenticate,
  paymentLimiter,
  asyncHandler(paymentController.retry)
);

// src/routes/reservationRoutes.ts
var import_express7 = require("express");
var reservationRoutes = (0, import_express7.Router)();
reservationRoutes.post(
  "/",
  reservationLimiter,
  optionalAuthenticate,
  reservationRules,
  validate,
  asyncHandler(reservationController.create)
);
reservationRoutes.get(
  "/my",
  authenticate,
  asyncHandler(reservationController.listMine)
);

// src/createApp.ts
var createApp = () => {
  const app2 = (0, import_express8.default)();
  app2.disable("x-powered-by");
  app2.set("trust proxy", 1);
  app2.use(
    (0, import_helmet.default)({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          baseUri: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: null
        }
      },
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" }
    })
  );
  const allowedOrigins = new Set(env.frontendOrigins);
  app2.use(
    (0, import_cors.default)({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }
        callback(new ApiError(403, "\u0647\u0630\u0627 \u0627\u0644\u0645\u0635\u062F\u0631 \u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Fawaterak-Signature",
        "X-Signature"
      ],
      maxAge: 600
    })
  );
  app2.use(
    import_express8.default.json({
      limit: "100kb",
      verify: (req, _res, buffer) => {
        req.rawBody = Buffer.from(buffer);
      }
    })
  );
  app2.use(import_express8.default.urlencoded({ extended: true, limit: "100kb" }));
  app2.get("/api/health", (_req, res) => {
    res.json({
      success: true,
      data: {
        status: "ok",
        environment: env.nodeEnv,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  });
  app2.use("/api", generalLimiter);
  app2.use("/api/auth", authRoutes);
  app2.use("/api/menu", menuRoutes);
  app2.use("/api/orders", orderRoutes);
  app2.use("/api/payments", paymentRoutes);
  app2.use("/api/reservations", reservationRoutes);
  app2.use("/api/admin", adminRoutes);
  app2.use("/api/config", configRoutes);
  app2.use("/api", (_req, res) => {
    res.status(404).json({ success: false, message: "\u0627\u0644\u0645\u0633\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
  });
  const clientDist = import_node_path2.default.resolve(__dirname, "../../client/dist");
  const clientIndex = import_node_path2.default.join(clientDist, "index.html");
  if (import_node_fs2.default.existsSync(clientDist)) {
    app2.use(
      import_express8.default.static(clientDist, {
        maxAge: env.isProduction ? "1y" : 0,
        index: false,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith("index.html")) {
            res.setHeader("Cache-Control", "no-store");
          }
        }
      })
    );
    app2.use((req, res, next) => {
      if (req.method !== "GET" || req.path.startsWith("/api")) {
        next();
        return;
      }
      res.sendFile(clientIndex);
    });
  }
  app2.use(errorHandler);
  return app2;
};

// src/index.ts
var app = createApp();
var index_default = app;

// src/db/seed.ts
var import_bcryptjs3 = __toESM(require("bcryptjs"));
var ensureAccount = async (account) => {
  if (account.password.length < 8) {
    throw new Error(
      `${account.role.toUpperCase()}_PASSWORD must be at least 8 characters`
    );
  }
  const email = account.email.trim().toLowerCase();
  const existingResult = await supabase.from("users").select("id").eq("email", email).maybeSingle();
  const existing = unwrap(existingResult, "find default account");
  if (!existing) {
    const passwordHash = await import_bcryptjs3.default.hash(account.password, env.bcryptRounds);
    const { error: error2 } = await supabase.from("users").insert({
      name: account.name,
      email,
      password_hash: passwordHash,
      phone: null,
      role: account.role,
      is_approved: true
    });
    assertNoError(error2, `create ${account.role} account`);
    return;
  }
  if (account.updateExistingPassword) {
    const passwordHash = await import_bcryptjs3.default.hash(account.password, env.bcryptRounds);
    const { error: error2 } = await supabase.from("users").update({
      name: account.name,
      password_hash: passwordHash,
      role: account.role,
      is_approved: true
    }).eq("email", email);
    assertNoError(error2, `update ${account.role} account`);
    return;
  }
  const { error } = await supabase.from("users").update({ is_approved: true }).eq("email", email);
  assertNoError(error, "approve default account");
};
var ensureDefaultAccounts = async () => {
  await ensureAccount({
    name: env.admin.name,
    email: env.admin.email,
    password: env.admin.password,
    role: "admin",
    updateExistingPassword: false
  });
  await ensureAccount({
    name: "\u0641\u0631\u064A\u0642 \u0627\u0644\u0645\u0637\u0628\u062E",
    email: env.staff.kitchen.email,
    password: env.staff.kitchen.password,
    role: "kitchen",
    updateExistingPassword: true
  });
  await ensureAccount({
    name: "\u0641\u0631\u064A\u0642 \u0627\u0644\u0643\u0627\u0634\u064A\u0631",
    email: env.staff.cashier.email,
    password: env.staff.cashier.password,
    role: "cashier",
    updateExistingPassword: true
  });
  await ensureAccount({
    name: "\u0641\u0631\u064A\u0642 \u0627\u0644\u062A\u0648\u0635\u064A\u0644",
    email: env.staff.delivery.email,
    password: env.staff.delivery.password,
    role: "delivery",
    updateExistingPassword: true
  });
};

// src/server.ts
var start = async () => {
  await verifyDatabaseConnection();
  await ensureDefaultAccounts();
  const server = index_default.listen(env.port, () => {
    console.log(
      `${brand.name} API is running on http://localhost:${env.port} (${env.nodeEnv})`
    );
  });
  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(() => process.exit(0));
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};
void start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
