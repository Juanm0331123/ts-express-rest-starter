import { Request, Response } from 'express'
import diaryService from '../services/diary.service'
import { parseComment, parseDate, parseVisibility, parseWeather } from '../validations/diary.validation'

export const getAllDiaries = (_req: Request, res: Response): void => {
  res.json(diaryService.getNonSensitiveEntries())
}

export const getDiaryById = (req: Request, res: Response): void => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID debe ser un número' })
      return
    }

    const diary = diaryService.findById(id)

    if (diary != null) {
      res.json(diary)
    } else {
      res.status(404).json({ error: 'Entrada de diario no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el diario' })
  }
}

export const addDiary = (req: Request, res: Response): void => {
  try {
    const { date, weather, visibility, comment } = req.body

    const newDiaryEntry = {
      date: parseDate(date),
      weather: parseWeather(weather),
      visibility: parseVisibility(visibility),
      comment: parseComment(comment)
    }

    const addedDiary = diaryService.addEntry(newDiaryEntry)
    res.status(201).json(addedDiary)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const updateDiary = (req: Request, res: Response): void => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID debe ser un número' })
      return
    }

    const { date, weather, visibility, comment } = req.body

    const updatedFields: any = {}

    if (date !== undefined) updatedFields.date = parseDate(date)
    if (weather !== undefined) updatedFields.weather = parseWeather(weather)
    if (visibility !== undefined) updatedFields.visibility = parseVisibility(visibility)
    if (comment !== undefined) updatedFields.comment = parseComment(comment)

    const updatedDiary = diaryService.updateEntry(id, updatedFields)

    if (updatedDiary != null) {
      res.json(updatedDiary)
    } else {
      res.status(404).json({ error: 'Entrada de diario no encontrada' })
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteDiary = (req: Request, res: Response): void => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID debe ser un número' })
      return
    }

    const success = diaryService.deleteEntry(id)

    if (success) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Entrada de diario no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el diario' })
  }
}
