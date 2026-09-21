import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().integer().min(1).max(65535).default(3000),
  API_PREFIX: Joi.string().default('api'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().integer().min(1).max(65535).default(5432),
  DB_NAME: Joi.string().default('cyberian'),
  DB_USER: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default('postgres'),
  OTP_EXPIRE_SECONDS: Joi.number().default(60),

  SMS_IR_API_KEY: Joi.string().required(),
  SMS_IR_OTP_TEMPLATE_ID: Joi.number().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN_MIN: Joi.number().required(),
  JWT_REFRESH_EXPIRES_IN_DAY: Joi.number().required(),
}).unknown(true);
