import { Visibility, Weather } from '../types'

const WEATHER_VALUES = ['sunny', 'rainy', 'cloudy', 'windy', 'stormy']
const VISIBILITY_VALUES = ['great', 'good', 'ok', 'poor']

export const isString = (text: any): boolean => {
  return typeof text === 'string' || text instanceof String
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const isWeather = (param: any): boolean => {
  return isString(param) && WEATHER_VALUES.includes(param)
}

export const isVisibility = (param: any): boolean => {
  return isString(param) && VISIBILITY_VALUES.includes(param)
}

export const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Fecha incorrecta o faltante')
  }
  return dateFromRequest
}

export const parseWeather = (weatherFromRequest: any): Weather => {
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error('Clima incorrecto o faltante')
  }
  return weatherFromRequest as Weather
}

export const parseVisibility = (visibilityFromRequest: any): Visibility => {
  if (!isString(visibilityFromRequest) || !isVisibility(visibilityFromRequest)) {
    throw new Error('Visibilidad incorrecta o faltante')
  }
  return visibilityFromRequest as Visibility
}

export const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) {
    throw new Error('Comentario incorrecto o faltante')
  }
  return commentFromRequest
}
