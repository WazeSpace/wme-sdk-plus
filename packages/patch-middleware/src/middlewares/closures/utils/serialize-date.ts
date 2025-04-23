export function serializeDate(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, '0'),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0'),
        hours = date.getHours().toString().padStart(2, '0'),
        minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}