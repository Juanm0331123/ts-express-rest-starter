import { NextFunction, Request, Response } from 'express'

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(error.stack)

  res.status(500).json({
    error: error.message || 'Error interno del servidor'
  })
}

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    error: 'No se encontró el recurso solicitado'
  })
}
