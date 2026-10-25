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

// src/app.ts
var import_node_fs2 = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));
var import_cors = __toESM(require("cors"));
var import_express8 = __toESM(require("express"));
var import_helmet = __toESM(require("helmet"));

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
var env = {
  nodeEnv,
  isProduction,
  port: readNumber("PORT", 3e3),
  frontendOrigins,
  primaryFrontendUrl: frontendOrigins[0] ?? "http://localhost:5173",
  database: {
    host: readString("DB_HOST", "localhost"),
    port: readNumber("DB_PORT", 3306),
    user: readString("DB_USER", "root"),
    password: process.env.DB_PASSWORD ?? "",
    name: readString("DB_NAME", "hadramout_mandi"),
    connectionLimit: readNumber("DB_CONNECTION_LIMIT", 10)
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
  if (dbError.code === "ER_DUP_ENTRY") {
    res.status(409).json({
      success: false,
      message: "\u0647\u0630\u0627 \u0627\u0644\u0633\u062C\u0644 \u0645\u0648\u062C\u0648\u062F \u0645\u0633\u0628\u0642\u0627\u064B"
    });
    return;
  }
  if (dbError.code === "ER_ROW_IS_REFERENCED_2" || dbError.code === "ER_NO_REFERENCED_ROW_2") {
    res.status(409).json({
      success: false,
      message: "\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0644\u0648\u062C\u0648\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629"
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

// src/db/pool.ts
var import_promise = __toESM(require("mysql2/promise"));
var pool = import_promise.default.createPool({
  host: env.database.host,
  port: env.database.port,
  user: env.database.user,
  password: env.database.password,
  database: env.database.name,
  waitForConnections: true,
  connectionLimit: env.database.connectionLimit,
  queueLimit: 0,
  charset: "utf8mb4",
  decimalNumbers: true,
  dateStrings: false,
  timezone: "Z",
  enableKeepAlive: true
});
var verifyDatabaseConnection = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
};

// src/db/query.ts
var queryRows = async (client, sql, values = []) => {
  const [rows] = await client.execute(sql, [...values]);
  return rows;
};
var executeStatement = async (client, sql, values = []) => {
  const [result] = await client.execute(sql, [...values]);
  return result;
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

// src/repositories/menuRepository.ts
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
  async list(filters, client = pool) {
    const conditions = [];
    const params = [];
    if (filters.category) {
      conditions.push("category = ?");
      params.push(filters.category);
    }
    if (filters.search) {
      const pattern = `%${escapeLike(filters.search)}%`;
      conditions.push(
        "(name LIKE ? ESCAPE '\\\\' OR name_en LIKE ? ESCAPE '\\\\' OR description LIKE ? ESCAPE '\\\\')"
      );
      params.push(pattern, pattern, pattern);
    }
    if (typeof filters.available === "boolean") {
      conditions.push("is_available = ?");
      params.push(filters.available ? 1 : 0);
    }
    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns} FROM menu_items ${where}
       ORDER BY FIELD(category, 'mandi', 'madhbi', 'mathloutha', 'appetizers', 'drinks', 'desserts'), id`,
      params
    );
    return rows.map(mapMenuItem);
  },
  async findById(id, client = pool) {
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns} FROM menu_items WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] ? mapMenuItem(rows[0]) : null;
  },
  async findByIds(ids, client = pool) {
    if (ids.length === 0) return [];
    const placeholders = ids.map(() => "?").join(", ");
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns} FROM menu_items WHERE id IN (${placeholders})`,
      ids
    );
    return rows.map(mapMenuItem);
  },
  async create(data, client = pool) {
    const result = await executeStatement(
      client,
      `INSERT INTO menu_items
         (name, name_en, description, description_en, price, category, image_url, is_available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.nameEn ?? null,
        data.description ?? null,
        data.descriptionEn ?? null,
        data.price,
        data.category,
        data.imageUrl ?? null,
        data.isAvailable ?? true
      ]
    );
    return Number(result.insertId);
  },
  async update(id, data, client = pool) {
    const result = await executeStatement(
      client,
      `UPDATE menu_items
       SET name = ?, name_en = ?, description = ?, description_en = ?,
           price = ?, category = ?, image_url = ?, is_available = ?
       WHERE id = ?`,
      [
        data.name,
        data.nameEn ?? null,
        data.description ?? null,
        data.descriptionEn ?? null,
        data.price,
        data.category,
        data.imageUrl ?? null,
        data.isAvailable ?? true,
        id
      ]
    );
    return result.affectedRows > 0;
  },
  async delete(id, client = pool) {
    const result = await executeStatement(
      client,
      "DELETE FROM menu_items WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
  async count(client = pool) {
    const rows = await queryRows(
      client,
      "SELECT COUNT(*) AS total FROM menu_items"
    );
    return Number(rows[0]?.total ?? 0);
  }
};

// src/repositories/orderRepository.ts
var mapOrder = (row) => ({
  id: Number(row.id),
  userId: Number(row.user_id),
  customerName: row.customer_name,
  customerEmail: row.customer_email,
  customerPhone: row.customer_phone,
  totalAmount: toNumber(row.total_amount),
  deliveryAddress: row.delivery_address,
  paymentStatus: row.payment_status,
  orderStatus: row.order_status,
  paymentId: row.payment_id,
  paymentUrl: row.payment_url,
  notes: row.notes,
  paymentMethod: row.payment_method,
  createdAt: toIsoString(row.created_at),
  updatedAt: toIsoString(row.updated_at)
});
var mapOrderItem = (row) => ({
  id: Number(row.id),
  orderId: Number(row.order_id),
  menuItemId: Number(row.menu_item_id),
  name: row.name,
  nameEn: row.name_en,
  imageUrl: row.image_url,
  quantity: Number(row.quantity),
  priceAtPurchase: toNumber(row.price_at_purchase)
});
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
  paymentMethod: order.paymentMethod
});
var orderSelect = `o.id, o.user_id, o.total_amount, o.delivery_address,
  o.payment_status, o.order_status, o.payment_id, o.payment_url, o.notes,
  o.created_at, o.updated_at`;
var customerSelect = `u.name AS customer_name, u.email AS customer_email,
  u.phone AS customer_phone`;
var itemSelect = `oi.id, oi.order_id, oi.menu_item_id, oi.quantity,
  oi.price_at_purchase, mi.name, mi.name_en, mi.image_url`;
var orderRepository = {
  async findById(id, client = pool) {
    const rows = await queryRows(
      client,
      `SELECT ${orderSelect}, ${customerSelect}
       FROM orders o JOIN users u ON u.id = o.user_id
       WHERE o.id = ? LIMIT 1`,
      [id]
    );
    return rows[0] ? mapOrder(rows[0]) : null;
  },
  async findByPaymentId(paymentId, client = pool) {
    const rows = await queryRows(
      client,
      `SELECT ${orderSelect}, ${customerSelect}
       FROM orders o JOIN users u ON u.id = o.user_id
       WHERE o.payment_id = ? LIMIT 1`,
      [paymentId]
    );
    return rows[0] ? mapOrder(rows[0]) : null;
  },
  async list(filters, page, client = pool) {
    const conditions = [];
    const params = [];
    if (filters.userId !== void 0) {
      conditions.push("o.user_id = ?");
      params.push(filters.userId);
    }
    if (filters.status) {
      if (Array.isArray(filters.status)) {
        const placeholders = filters.status.map(() => "?").join(", ");
        conditions.push(`o.order_status IN (${placeholders})`);
        params.push(...filters.status);
      } else {
        conditions.push("o.order_status = ?");
        params.push(filters.status);
      }
    }
    if (filters.paymentStatus) {
      conditions.push("o.payment_status = ?");
      params.push(filters.paymentStatus);
    }
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const countRows = await queryRows(
      client,
      `SELECT COUNT(*) AS total FROM orders o ${where}`,
      params
    );
    const rows = await queryRows(
      client,
      `SELECT ${orderSelect}, ${customerSelect}
       FROM orders o JOIN users u ON u.id = o.user_id
       ${where}
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, page.limit, page.offset]
    );
    return {
      orders: rows.map(mapOrder),
      total: Number(countRows[0]?.total ?? 0)
    };
  },
  async findItemsByOrderIds(orderIds, client = pool) {
    if (orderIds.length === 0) return [];
    const placeholders = orderIds.map(() => "?").join(", ");
    const rows = await queryRows(
      client,
      `SELECT ${itemSelect}
       FROM order_items oi JOIN menu_items mi ON mi.id = oi.menu_item_id
       WHERE oi.order_id IN (${placeholders})
       ORDER BY oi.id`,
      orderIds
    );
    return rows.map(mapOrderItem);
  },
  async findItemsByOrderId(orderId, client = pool) {
    return this.findItemsByOrderIds([orderId], client);
  },
  async insertOrder(client, data) {
    const result = await executeStatement(
      client,
      `INSERT INTO orders
         (user_id, total_amount, delivery_address, payment_status, order_status, payment_method, notes)
       VALUES (?, ?, ?, 'PENDING', 'PENDING', ?, ?)`,
      [
        data.userId,
        data.totalAmount,
        data.deliveryAddress,
        data.paymentMethod,
        data.notes
      ]
    );
    return Number(result.insertId);
  },
  async insertOrderItem(client, data) {
    await executeStatement(
      client,
      `INSERT INTO order_items
         (order_id, menu_item_id, quantity, price_at_purchase)
       VALUES (?, ?, ?, ?)`,
      [
        data.orderId,
        data.menuItemId,
        data.quantity,
        data.priceAtPurchase
      ]
    );
  },
  async updatePaymentInfo(orderId, paymentId, paymentUrl, client = pool) {
    await executeStatement(
      client,
      `UPDATE orders SET payment_id = ?, payment_url = ? WHERE id = ?`,
      [paymentId, paymentUrl, orderId]
    );
  },
  async updateStatuses(orderId, paymentStatus, orderStatus, client = pool) {
    await executeStatement(
      client,
      `UPDATE orders SET payment_status = ?, order_status = ? WHERE id = ?`,
      [paymentStatus, orderStatus, orderId]
    );
  },
  async updateOrderStatus(orderId, orderStatus, client = pool) {
    await executeStatement(
      client,
      "UPDATE orders SET order_status = ? WHERE id = ?",
      [orderStatus, orderId]
    );
  },
  async getStats(client = pool) {
    const rows = await queryRows(
      client,
      `SELECT
         COUNT(*) AS total_orders,
         SUM(order_status = 'PENDING') AS pending_orders,
         SUM(order_status = 'PREPARING') AS preparing_orders,
         SUM(order_status = 'OUT_FOR_DELIVERY') AS out_for_delivery_orders,
         SUM(order_status = 'DELIVERED') AS delivered_orders,
         SUM(order_status = 'CANCELLED') AS cancelled_orders,
         COALESCE(SUM(CASE WHEN payment_status = 'PAID' THEN total_amount ELSE 0 END), 0) AS total_revenue
       FROM orders`
    );
    const menuRows = await queryRows(
      client,
      "SELECT COUNT(*) AS total FROM menu_items"
    );
    const reservationRows = await queryRows(
      client,
      "SELECT COUNT(*) AS total FROM reservations"
    );
    const row = rows[0];
    return {
      totalOrders: Number(row?.total_orders ?? 0),
      pendingOrders: Number(row?.pending_orders ?? 0),
      preparingOrders: Number(row?.preparing_orders ?? 0),
      outForDeliveryOrders: Number(row?.out_for_delivery_orders ?? 0),
      deliveredOrders: Number(row?.delivered_orders ?? 0),
      cancelledOrders: Number(row?.cancelled_orders ?? 0),
      totalRevenue: toNumber(row?.total_revenue),
      totalMenuItems: Number(menuRows[0]?.total ?? 0),
      totalReservations: Number(reservationRows[0]?.total ?? 0)
    };
  }
};

// src/services/paymentService.ts
var import_axios = __toESM(require("axios"));
var import_node_crypto = __toESM(require("crypto"));

// src/repositories/userRepository.ts
var mapUser = (row) => ({
  id: Number(row.id),
  name: row.name,
  email: row.email,
  passwordHash: row.password_hash,
  phone: row.phone,
  role: row.role,
  createdAt: toIsoString(row.created_at),
  isApproved: row.is_approved
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
  async findByEmail(email, client = pool) {
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns2} FROM users WHERE email = ? LIMIT 1`,
      [email.toLowerCase()]
    );
    return rows[0] ? mapUser(rows[0]) : null;
  },
  async findById(id, client = pool) {
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns2} FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] ? mapUser(rows[0]) : null;
  },
  async isApproved(id, client = pool) {
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns2} FROM users WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0]?.is_approved ?? false;
  },
  async updateApproval(id, approved, client = pool) {
    await executeStatement(
      client,
      `UPDATE users SET is_approved = ? WHERE id = ?`,
      [approved ? 1 : 0, id]
    );
  },
  async create(data, client = pool) {
    const isApproved = data.isApproved ?? (data.role === "customer" || data.role === "admin");
    const result = await executeStatement(
      client,
      `INSERT INTO users (name, email, password_hash, phone, role, is_approved)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email.toLowerCase(),
        data.passwordHash,
        data.phone,
        data.role,
        isApproved ? 1 : 0
      ]
    );
    return Number(result.insertId);
  }
};

// src/services/paymentService.ts
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
    const connection = await pool.getConnection();
    let orderId = 0;
    try {
      await connection.beginTransaction();
      const menuItems = await menuRepository.findByIds(menuItemIds, connection);
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
      orderId = await orderRepository.insertOrder(connection, {
        userId,
        totalAmount,
        deliveryAddress: input.deliveryAddress,
        paymentMethod,
        notes: input.notes?.trim() || null
      });
      for (const item of validatedItems) {
        await orderRepository.insertOrderItem(connection, {
          orderId,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          priceAtPurchase: item.price
        });
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
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
    if (user.role !== "admin" && order.userId !== user.id) {
      throw ApiError.forbidden("\u0644\u0627 \u064A\u0645\u0643\u0646\u0643 \u0639\u0631\u0636 \u0637\u0644\u0628 \u0644\u0627 \u064A\u062E\u0635\u0643");
    }
    const items = await orderRepository.findItemsByOrderId(orderId);
    return toOrderDto(order, items);
  },
  async updateStatus(orderId, status) {
    const order = await orderRepository.findById(orderId);
    if (!order) throw ApiError.notFound("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");
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
    const id = parseId(String(req.params.id), "\u0645\u0639\u0631\u0651\u0641 \u0627\u0644\u0637\u0644\u0628");
    const status = req.body.orderStatus;
    const order = await orderService.updateStatus(id, status);
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
  }
};

// src/repositories/reservationRepository.ts
var mapReservation = (row) => ({
  id: Number(row.id),
  userId: row.user_id === null ? null : Number(row.user_id),
  name: row.name,
  phone: row.phone,
  email: row.email,
  date: row.date instanceof Date ? row.date.toISOString().slice(0, 10) : String(row.date).slice(0, 10),
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
  async create(data, client = pool) {
    const result = await executeStatement(
      client,
      `INSERT INTO reservations
         (user_id, name, phone, email, date, time, guests, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?)`,
      [
        data.userId,
        data.name,
        data.phone,
        data.email ?? null,
        data.date,
        data.time,
        data.guests,
        data.notes ?? null
      ]
    );
    return Number(result.insertId);
  },
  async findById(id, client = pool) {
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns3} FROM reservations WHERE id = ? LIMIT 1`,
      [id]
    );
    return rows[0] ? mapReservation(rows[0]) : null;
  },
  async list(filters, page, client = pool) {
    const conditions = [];
    const params = [];
    if (filters.userId !== void 0) {
      conditions.push("user_id = ?");
      params.push(filters.userId);
    }
    if (filters.status) {
      conditions.push("status = ?");
      params.push(filters.status);
    }
    if (filters.fromDate) {
      conditions.push("date >= ?");
      params.push(filters.fromDate);
    }
    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const countRows = await queryRows(
      client,
      `SELECT COUNT(*) AS total FROM reservations ${where}`,
      params
    );
    const rows = await queryRows(
      client,
      `SELECT ${selectColumns3} FROM reservations ${where}
       ORDER BY date DESC, time DESC
       LIMIT ? OFFSET ?`,
      [...params, page.limit, page.offset]
    );
    return {
      reservations: rows.map(mapReservation),
      total: Number(countRows[0]?.total ?? 0)
    };
  },
  async updateStatus(id, status, client = pool) {
    const result = await executeStatement(
      client,
      "UPDATE reservations SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows > 0;
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
var isRole = (value) => value === "customer" || value === "admin" || value === "kitchen" || value === "cashier";
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
    const requiresApproval = user.role === "kitchen" || user.role === "cashier";
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
    if ((user.role === "kitchen" || user.role === "cashier") && !user.isApproved) {
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

// src/app.ts
var createApp = () => {
  const app = (0, import_express8.default)();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(
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
  app.use(
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
  app.use(
    import_express8.default.json({
      limit: "100kb",
      verify: (req, _res, buffer) => {
        req.rawBody = Buffer.from(buffer);
      }
    })
  );
  app.use(import_express8.default.urlencoded({ extended: true, limit: "100kb" }));
  app.get("/api/health", (_req, res) => {
    res.json({
      success: true,
      data: {
        status: "ok",
        environment: env.nodeEnv,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  });
  app.use("/api", generalLimiter);
  app.use("/api/auth", authRoutes);
  app.use("/api/menu", menuRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/reservations", reservationRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/config", configRoutes);
  app.use("/api", (_req, res) => {
    res.status(404).json({ success: false, message: "\u0627\u0644\u0645\u0633\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
  });
  const clientDist = import_node_path2.default.resolve(__dirname, "../../client/dist");
  const clientIndex = import_node_path2.default.join(clientDist, "index.html");
  if (import_node_fs2.default.existsSync(clientDist)) {
    app.use(
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
    app.use((req, res, next) => {
      if (req.method !== "GET" || req.path.startsWith("/api")) {
        next();
        return;
      }
      res.sendFile(clientIndex);
    });
  }
  app.use(errorHandler);
  return app;
};

// src/db/bootstrap.ts
var import_promise2 = __toESM(require("mysql2/promise"));
var ensureDatabase = async () => {
  const databaseName = env.database.name;
  if (!/^[A-Za-z0-9_]+$/.test(databaseName)) {
    throw new Error("DB_NAME may only contain letters, numbers and underscores");
  }
  const connection = await import_promise2.default.createConnection({
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password
  });
  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await connection.end();
  }
};

// src/db/schema.ts
var statements = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    role ENUM('customer', 'admin', 'kitchen', 'cashier') NOT NULL DEFAULT 'customer',
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS menu_items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NULL,
    description TEXT NULL,
    description_en TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500) NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_menu_category (category),
    KEY idx_menu_available (is_available)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS orders (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    payment_status ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    order_status ENUM('PENDING', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    payment_id VARCHAR(100) NULL,
    payment_url VARCHAR(1000) NULL,
    payment_method ENUM('ONLINE','CASH') NOT NULL DEFAULT 'ONLINE',
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_orders_user (user_id),
    KEY idx_orders_payment_status (payment_status),
    KEY idx_orders_status (order_status),
    KEY idx_orders_payment_id (payment_id),
    KEY idx_orders_created (created_at),
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS order_items (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_order_items_order (order_id),
    KEY idx_order_items_menu (menu_item_id),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_menu FOREIGN KEY (menu_item_id) REFERENCES menu_items (id) ON DELETE RESTRICT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS reservations (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests INT NOT NULL DEFAULT 1,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_reservations_date (date),
    KEY idx_reservations_status (status),
    KEY idx_reservations_user (user_id),
    CONSTRAINT fk_reservations_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
];
var columnMigrations = [
  {
    table: "users",
    column: "is_approved",
    definition: "BOOLEAN NOT NULL DEFAULT FALSE",
    after: "role"
  },
  {
    table: "orders",
    column: "payment_method",
    definition: "ENUM('ONLINE','CASH') NOT NULL DEFAULT 'ONLINE'",
    after: "payment_url"
  }
];
var columnExists = async (connection, table, column) => {
  const rows = await queryRows(
    connection,
    `SELECT COLUMN_NAME
       FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
      LIMIT 1`,
    [table, column]
  );
  return rows.length > 0;
};
var runSchemaStatement = async (connection, sql) => {
  try {
    await connection.query(sql);
    return true;
  } catch (err) {
    console.warn("Schema init note:", err.message);
    return false;
  }
};
var initializeSchema = async () => {
  const connection = await pool.getConnection();
  try {
    for (const statement of statements) {
      await runSchemaStatement(connection, statement);
    }
    for (const migration of columnMigrations) {
      if (await columnExists(connection, migration.table, migration.column)) {
        continue;
      }
      const after = migration.after ? ` AFTER \`${migration.after}\`` : "";
      const added = await runSchemaStatement(
        connection,
        `ALTER TABLE \`${migration.table}\` ADD COLUMN \`${migration.column}\` ${migration.definition}${after}`
      );
      if (added) {
        console.info(
          `Schema init: added column ${migration.table}.${migration.column}`
        );
      }
    }
    await runSchemaStatement(
      connection,
      `ALTER TABLE users MODIFY COLUMN role ENUM('admin','kitchen','cashier','customer') NOT NULL DEFAULT 'customer'`
    );
    await runSchemaStatement(
      connection,
      `ALTER TABLE orders MODIFY COLUMN order_status ENUM('PENDING','PREPARING','READY','OUT_FOR_DELIVERY','DELIVERED','CANCELLED') NOT NULL DEFAULT 'PENDING'`
    );
    await runSchemaStatement(
      connection,
      `UPDATE users SET is_approved = TRUE WHERE role IN ('admin','customer') AND is_approved = FALSE`
    );
  } finally {
    connection.release();
  }
};

// src/db/seed.ts
var import_bcryptjs3 = __toESM(require("bcryptjs"));
var menuSeed = [
  {
    name: "\u0645\u0646\u062F\u064A \u0644\u062D\u0645 \u0636\u0627\u0646\u064A",
    nameEn: "Lamb Mandi",
    description: "\u0644\u062D\u0645 \u0636\u0627\u0646\u064A \u0637\u0631\u064A \u0645\u0637\u0628\u0648\u062E \u0641\u064A \u0627\u0644\u062A\u0646\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062D\u062C\u0631 \u0645\u0639 \u0623\u0631\u0632 \u0628\u0633\u0645\u062A\u064A \u0645\u0639\u0637\u0651\u0631",
    descriptionEn: "Tender lamb slow-cooked in a stone tandoor with spiced basmati rice",
    price: 320,
    category: "mandi",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0645\u0646\u062F\u064A \u062F\u062C\u0627\u062C",
    nameEn: "Chicken Mandi",
    description: "\u0646\u0635\u0641 \u062F\u062C\u0627\u062C\u0629 \u0628\u0644\u062F\u064A\u0629 \u0645\u062A\u0628\u0651\u0644\u0629 \u0628\u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u062D\u0636\u0631\u0645\u064A\u0629 \u0645\u0639 \u0623\u0631\u0632 \u0627\u0644\u0645\u0646\u062F\u064A",
    descriptionEn: "Free-range chicken marinated in Hadrami spices with mandi rice",
    price: 180,
    category: "mandi",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0645\u0646\u062F\u064A \u0644\u062D\u0645 \u0628\u0642\u0631\u064A",
    nameEn: "Beef Mandi",
    description: "\u0642\u0637\u0639 \u0644\u062D\u0645 \u0628\u0642\u0631\u064A \u0645\u0637\u0647\u0648\u0629 \u0628\u0628\u0637\u0621 \u062D\u062A\u0649 \u0627\u0644\u0637\u0631\u0627\u0648\u0629 \u0645\u0639 \u0623\u0631\u0632 \u0628\u0633\u0645\u062A\u064A",
    descriptionEn: "Slow-cooked beef cuts served over fragrant basmati rice",
    price: 260,
    category: "mandi",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0645\u062F\u0641\u0648\u0646 \u0644\u062D\u0645",
    nameEn: "Lamb Madhbi",
    description: "\u0644\u062D\u0645 \u0645\u0634\u0648\u064A \u0639\u0644\u0649 \u0627\u0644\u062D\u062C\u0631 \u0627\u0644\u062D\u0627\u0631 \u0628\u0646\u0643\u0647\u0629 \u0645\u062F\u062E\u0651\u0646\u0629 \u0645\u0645\u064A\u0632\u0629",
    descriptionEn: "Lamb grilled on hot stone with a distinctive smoky flavour",
    price: 350,
    category: "madhbi",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0645\u062F\u0641\u0648\u0646 \u062F\u062C\u0627\u062C",
    nameEn: "Chicken Madhbi",
    description: "\u062F\u062C\u0627\u062C \u0645\u062A\u0628\u0651\u0644 \u0628\u0627\u0644\u0623\u0639\u0634\u0627\u0628 \u0648\u0627\u0644\u0644\u064A\u0645\u0648\u0646 \u0627\u0644\u0623\u0633\u0648\u062F \u0645\u0634\u0648\u064A \u0639\u0644\u0649 \u0627\u0644\u062D\u062C\u0631",
    descriptionEn: "Chicken marinated with herbs and black lime, stone-grilled",
    price: 200,
    category: "madhbi",
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0645\u0638\u0644\u0629 \u0644\u062D\u0645",
    nameEn: "Lamb Mathloutha",
    description: "\u0644\u062D\u0645 \u0645\u0637\u0628\u0648\u062E \u0645\u0639 \u0627\u0644\u062E\u0636\u0627\u0631 \u0648\u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0623\u0631\u0632 \u0639\u0644\u0649 \u0627\u0644\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062D\u0636\u0631\u0645\u064A\u0629",
    descriptionEn: "Lamb cooked with vegetables, spices and rice, Hadrami style",
    price: 300,
    category: "mathloutha",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0645\u0638\u0644\u0629 \u062F\u062C\u0627\u062C",
    nameEn: "Chicken Mathloutha",
    description: "\u062F\u062C\u0627\u062C \u0648\u0623\u0631\u0632 \u0628\u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062A \u0627\u0644\u062D\u0636\u0631\u0645\u064A\u0629 \u0645\u0639 \u0637\u0628\u0642 \u062C\u0627\u0646\u0628\u064A \u0645\u0646 \u0627\u0644\u0645\u0631\u0642",
    descriptionEn: "Chicken and rice with Hadrami spices and a side of broth",
    price: 170,
    category: "mathloutha",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0633\u0644\u0637\u0629 \u062D\u0636\u0631\u0645\u0648\u062A",
    nameEn: "Hadramout Salad",
    description: "\u062E\u0636\u0631\u0648\u0627\u062A \u0637\u0627\u0632\u062C\u0629 \u0645\u0639 \u062F\u0628\u0633 \u0627\u0644\u0631\u0645\u0627\u0646 \u0648\u0627\u0644\u0644\u064A\u0645\u0648\u0646",
    descriptionEn: "Fresh vegetables with pomegranate molasses and lemon",
    price: 45,
    category: "appetizers",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0634\u0648\u0631\u0628\u0629 \u0639\u062F\u0633",
    nameEn: "Lentil Soup",
    description: "\u0634\u0648\u0631\u0628\u0629 \u0639\u062F\u0633 \u062F\u0627\u0641\u0626\u0629 \u0645\u0639 \u0627\u0644\u0643\u0645\u0648\u0646 \u0648\u0627\u0644\u0644\u064A\u0645\u0648\u0646",
    descriptionEn: "Warm lentil soup with cumin and lemon",
    price: 35,
    category: "appetizers",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0633\u0645\u0628\u0648\u0633\u0629 \u0644\u062D\u0645",
    nameEn: "Meat Samosas",
    description: "\u062B\u0644\u0627\u062B \u062D\u0628\u0627\u062A \u0633\u0645\u0628\u0648\u0633\u0629 \u0645\u0642\u0631\u0645\u0634\u0629 \u0645\u062D\u0634\u0648\u0629 \u0628\u0627\u0644\u0644\u062D\u0645 \u0627\u0644\u0645\u0641\u0631\u0648\u0645",
    descriptionEn: "Three crispy pastries filled with seasoned minced meat",
    price: 60,
    category: "appetizers",
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0644\u064A\u0645\u0648\u0646 \u0628\u0627\u0644\u0646\u0639\u0646\u0627\u0639",
    nameEn: "Mint Lemonade",
    description: "\u0639\u0635\u064A\u0631 \u0644\u064A\u0645\u0648\u0646 \u0637\u0627\u0632\u062C \u0645\u0639 \u0627\u0644\u0646\u0639\u0646\u0627\u0639 \u0627\u0644\u0628\u0644\u062F\u064A",
    descriptionEn: "Fresh lemon juice blended with mint",
    price: 35,
    category: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0634\u0627\u064A \u062D\u0636\u0631\u0645\u0648\u062A\u064A",
    nameEn: "Hadrami Tea",
    description: "\u0634\u0627\u064A \u0628\u0627\u0644\u062D\u0644\u064A\u0628 \u0648\u0627\u0644\u0647\u064A\u0644 \u0648\u0627\u0644\u0642\u0631\u0646\u0641\u0644",
    descriptionEn: "Black tea brewed with milk, cardamom and cloves",
    price: 20,
    category: "drinks",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0643\u0646\u0627\u0641\u0629 \u0628\u0627\u0644\u0642\u0634\u0637\u0629",
    nameEn: "Kunafa with Cream",
    description: "\u0643\u0646\u0627\u0641\u0629 \u0630\u0647\u0628\u064A\u0629 \u0628\u0627\u0644\u0642\u0634\u0637\u0629 \u0627\u0644\u0637\u0627\u0632\u062C\u0629 \u0648\u0627\u0644\u0642\u0637\u0631",
    descriptionEn: "Golden kunafa filled with fresh cream and syrup",
    price: 75,
    category: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "\u0645\u0647\u0644\u0628\u064A\u0629 \u062D\u0636\u0631\u0645\u064A\u0629",
    nameEn: "Hadrami Muhallebi",
    description: "\u0645\u0647\u0644\u0628\u064A\u0629 \u0646\u0627\u0639\u0645\u0629 \u0628\u0627\u0644\u0641\u0633\u062A\u0642 \u0648\u0627\u0644\u0648\u0631\u062F",
    descriptionEn: "Silky milk pudding topped with pistachio and rose",
    price: 40,
    category: "desserts",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80"
  }
];
var ensureAccount = async (account) => {
  if (account.password.length < 8) {
    throw new Error(
      `${account.role.toUpperCase()}_PASSWORD must be at least 8 characters`
    );
  }
  const email = account.email.trim().toLowerCase();
  const [rows] = await pool.execute(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  if (rows.length === 0) {
    const passwordHash = await import_bcryptjs3.default.hash(account.password, env.bcryptRounds);
    await pool.execute(
      `INSERT INTO users (name, email, password_hash, phone, role, is_approved)
       VALUES (?, ?, ?, NULL, ?, TRUE)`,
      [account.name, email, passwordHash, account.role]
    );
    return;
  }
  if (account.updateExistingPassword) {
    const passwordHash = await import_bcryptjs3.default.hash(account.password, env.bcryptRounds);
    await pool.execute(
      `UPDATE users
          SET name = ?, password_hash = ?, role = ?, is_approved = TRUE
        WHERE email = ?`,
      [account.name, passwordHash, account.role, email]
    );
    return;
  }
  await pool.execute(
    "UPDATE users SET is_approved = TRUE WHERE email = ?",
    [email]
  );
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
};
var seedDatabase = async () => {
  await ensureDefaultAccounts();
  const [menuCountRows] = await pool.execute(
    "SELECT COUNT(*) AS total FROM menu_items"
  );
  const menuCount = Number(menuCountRows[0]?.total ?? 0);
  if (menuCount === 0) {
    for (const item of menuSeed) {
      await pool.execute(
        `INSERT INTO menu_items
           (name, name_en, description, description_en, price, category, image_url, is_available)
         VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`,
        [
          item.name,
          item.nameEn,
          item.description,
          item.descriptionEn,
          item.price,
          item.category,
          item.imageUrl
        ]
      );
    }
  }
};
var runSeed = async () => {
  await initializeSchema();
  await seedDatabase();
};
if (require.main === module) {
  void runSeed().then(() => {
    console.log("Database seeded successfully");
    process.exitCode = 0;
  }).catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  }).finally(() => {
    void pool.end();
  });
}

// src/index.ts
var start = async () => {
  await ensureDatabase();
  await initializeSchema();
  await ensureDefaultAccounts();
  await verifyDatabaseConnection();
  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(
      `${brand.name} API is running on http://localhost:${env.port} (${env.nodeEnv})`
    );
  });
  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(() => {
      void pool.end().finally(() => process.exit(0));
    });
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};
void start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
