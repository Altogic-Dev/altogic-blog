import { DateTime } from 'luxon';
import { convert } from 'html-to-text';

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

export function removeSpaces(str) {
  if (!str) return '';
  return str.replace(/\s+/g, '');
}

export function formatDate(date) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL);
}

export function parseHtml(html) {
  return convert(html, {
    wordwrap: 130,
    selectors: [
      { selector: 'h1', options: { uppercase: false } },
      { selector: 'h2', options: { uppercase: false } },
      { selector: 'h3', options: { uppercase: false } },
      { selector: 'h4', options: { uppercase: false } },
      { selector: 'h5', options: { uppercase: false } },
      { selector: 'h6', options: { uppercase: false } },
      { selector: 'a', options: { ignoreHref: true } },
      { selector: 'img', format: 'skip' },
    ],
  });
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
export function timeAgo(date) {
  const time = DateTime.fromISO(date);
  return time.toRelative();
}
export function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}

export function getLicenseTitle(license) {
  switch (license) {
    case 'all':
      return 'All rights reserved';

    case 'some-attribution':
      return 'Attribution';
    case 'some-attributionNoDerrivates':
      return 'Attribution, no derrivates';
    case 'some-attributionShareALike':
      return 'Attribution, share a like';
    case 'some-attributionNonCommercial':
      return 'Attribution, non-commercial';
    case 'some-attributionNonCommercialNoDerrivates':
      return 'Attribution, non-commercial, no derrivates';
    case 'some-attributionNonCommercialShareALike':
      return 'Attribution, non-commercial, share a like';

    case 'no-creativeCommonsCopyrightWaiver':
      return 'Creative Commons copyright waiver';
    case 'no-publicDomain':
      return 'Public domain';

    default:
      return '-';
  }
}
