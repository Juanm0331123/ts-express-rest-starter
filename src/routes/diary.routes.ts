import express from 'express'
import * as diaryController from '../controllers/diary.controller'

const router = express.Router()

router.get('/', diaryController.getAllDiaries)
  .get('/:id', diaryController.getDiaryById)
  .post('/', diaryController.addDiary)
  .put('/:id', diaryController.updateDiary)
  .delete('/:id', diaryController.deleteDiary)

export default router
