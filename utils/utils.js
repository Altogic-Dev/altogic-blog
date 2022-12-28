import { DateTime } from 'luxon';
import { convert } from 'html-to-text';
import _ from 'lodash';

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

export function convertTime(seconds, limit) {
  if (seconds < 60) {
    return `${seconds.toFixed(1)} ${limit ? 'Sec' : 'Seconds'}`
  }
  if (seconds < 3600) {
    return `${(seconds / 60).toFixed(1)} ${limit ? 'Min' : 'Minutes'}`
  }
  if (seconds < 86400) {
    return `${(seconds / 3600).toFixed(1)} Hours`
  }
  return `${(seconds / 86400).toFixed(1)} Days`

}
export function convertTimeAccordingToType(type) {
  if (type === 'seconds') {
    return 1
  }
  if (type === 'minutes') {
    return 60
  }
  if (type === 'hours') {
    return 3600
  }
  return 86400

}
function sortingForMonth(data, value) {
  return data.sort((a, b) => {
    const [dayA, monthA] = a[value].split('.');
    const [dayB, monthB] = b[value].split('.');
    if (monthA === monthB) {
      return dayA - dayB;
    }
    return monthA - monthB;
  });
}

function sortByMonth(data, value) {
  const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return data.sort((a, b) => {
    const [dayA, monthA] = a[value].split(' ');
    const [dayB, monthB] = b[value].split(' ');
    if (monthsArray.indexOf(monthA) === monthsArray.indexOf(monthB)) {
      return dayA - dayB;
    }
    return monthsArray.indexOf(monthA) - monthsArray.indexOf(monthB);
  });

}
function sortByHour(data, value) {
  return data.sort((a, b) => {
    const [hourA, minuteA] = a[value].split(':');
    const [hourB, minuteB] = b[value].split(':');
    if (hourA === hourB) {
      return minuteA - minuteB;
    }
    return hourA - hourB;
  });

}

export function addZeroToHourAndMinute(hour, minute) {
  let tempHour = hour;
  let tempMinute = minute;

  if (hour < 10) {
    tempHour = `0${hour}`;
  }
  if (minute < 10) {
    tempMinute = `0${minute}`;
  }
  return `${tempHour}:${tempMinute}`;

}



export function sortDate(data, value, isHour) {
  if (isHour) {
    return sortByHour(data, value).map(time => {
      const [hour, minute] = time[value].split(':');
      return {
        ...time,
        [value]: addZeroToHourAndMinute(hour, minute)
      }
    }
    )
  }

  if (_.size(data) > 0 && data[0][value].split('.').length === 2) {
    return sortingForMonth(data, value)
  }

  return sortByMonth(data, value)

}


export function parseTextWithLastDot(text) {
  const lastDotIndex = text.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return text;
  }
  return text.slice(0, lastDotIndex + 1);
}

export function capitiliazeAllWords(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}