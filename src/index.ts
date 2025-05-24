import express from 'express'
import { config } from './config/config'
import { errorHandler, notFoundHandler } from './middlewares/error.middleware'
import diaryRouter from './routes/diary.routes'

const app = express()

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.send({
    status: 'up',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/diaries', diaryRouter)

app.use(notFoundHandler)

app.use(errorHandler)

const PORT = config.port
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`)
  console.log(`   Entorno: ${config.environment}`)
})
