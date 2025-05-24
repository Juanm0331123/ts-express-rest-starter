import { DiaryModel } from '../models/diary.model'
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types'
import diaryData from './diaries.json'

class DiaryService {
  private diaries: DiaryModel[]

  constructor () {
    this.diaries = diaryData.map(diary => new DiaryModel(diary as DiaryEntry))
  }

  getAll (): DiaryEntry[] {
    return this.diaries.map(diary => diary.toJSON())
  }

  getNonSensitiveEntries (): NonSensitiveDiaryEntry[] {
    return this.diaries.map(diary => diary.toNonSensitiveJSON())
  }

  findById (id: number): DiaryEntry | undefined {
    const diary = this.diaries.find(d => d.toJSON().id === id)
    return diary?.toJSON()
  }

  addEntry (newDiaryEntry: Omit<DiaryEntry, 'id'>): DiaryEntry {
    const newId = Math.max(...this.diaries.map(d => d.toJSON().id)) + 1

    const newDiary = new DiaryModel({
      id: newId,
      ...newDiaryEntry
    })

    this.diaries.push(newDiary)
    return newDiary.toJSON()
  }

  updateEntry (id: number, updatedEntry: Partial<Omit<DiaryEntry, 'id'>>): DiaryEntry | undefined {
    const diaryIndex = this.diaries.findIndex(d => d.toJSON().id === id)

    if (diaryIndex === -1) return undefined

    const currentDiary = this.diaries[diaryIndex].toJSON()
    const updatedDiary = new DiaryModel({
      ...currentDiary,
      ...updatedEntry
    })

    this.diaries[diaryIndex] = updatedDiary
    return updatedDiary.toJSON()
  }

  deleteEntry (id: number): boolean {
    const initialLength = this.diaries.length
    this.diaries = this.diaries.filter(d => d.toJSON().id !== id)
    return initialLength !== this.diaries.length
  }
}

export default new DiaryService()
