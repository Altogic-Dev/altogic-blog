import { DateTime } from 'luxon';

export function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function replaceTurkishChars(str) {
  return str
    .replace(/[Ç]/g, 'C')
    .replace(/[Ğ]/g, 'G')
    .replace(/[İ]/g, 'I')
    .replace(/[Ö]/g, 'O')
    .replace(/[Ş]/g, 'S')
    .replace(/[Ü]/g, 'U');
}
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL);
}
