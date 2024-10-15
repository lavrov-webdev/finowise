export function fomratSprintsDates(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };

  // Используем локаль 'ru-RU', чтобы получить месяцы на русском языке
  return new Intl.DateTimeFormat("ru-RU", options).format(dateObj);
}
