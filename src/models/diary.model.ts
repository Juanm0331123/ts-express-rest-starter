import { DiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from '../types'

export class DiaryModel {
  private readonly id: number
  private readonly date: string
  private readonly weather: Weather
  private readonly visibility: Visibility
  private readonly comment: string

  constructor (diary: DiaryEntry) {
    this.id = diary.id
    this.date = diary.date
    this.weather = diary.weather
    this.visibility = diary.visibility
    this.comment = diary.comment
  }

  toJSON (): DiaryEntry {
    return {
      id: this.id,
      date: this.date,
      weather: this.weather,
      visibility: this.visibility,
      comment: this.comment
    }
  }

  toNonSensitiveJSON (): NonSensitiveDiaryEntry {
    return {
      id: this.id,
      date: this.date,
      weather: this.weather,
      visibility: this.visibility
    }
  }
}
