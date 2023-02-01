import { isDate } from 'lodash'

export function padTo2Digits(num: number): string {
  return num.toString().padStart(2, '0')
}

export function formatDate(rawDate: Date | string): string {
  let date: Date

  if (isDate(rawDate)) {
    date = rawDate
  } else {
    date = new Date(rawDate)
  }

  return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/')
}

export function formatTime(rawDate: Date): string {
  let date: Date

  if (isDate(rawDate)) {
    date = rawDate
  } else {
    date = new Date(rawDate)
  }

  return [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
}

export const hexToRGBA = (hexCode: string, opacity: number): string => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export const randomColor = (): string => `#${Math.floor(Math.random() * 16777215).toString(16)}`

export const numberFormatter = (value: number | string): string =>
  !Number.isNaN(parseFloat(value as string)) ? `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '₺ '

export const wait = async (ms: number): Promise<unknown> => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, ms)
  })
}
