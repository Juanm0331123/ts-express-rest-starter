export const config = {
  port: process.env.PORT ?? 3000,
  environment: process.env.NODE_ENV ?? 'development',
  logLevel: process.env.LOG_LEVEL ?? 'info'
}
