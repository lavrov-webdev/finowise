import dayjs from "dayjs";

export function formatSprintName(
  startDate: string | Date,
  endDate: string | Date,
): string {
  const start = dayjs(startDate).locale("ru");
  const end = dayjs(endDate).locale("ru");

  const startYear = start.year();
  const endYear = end.year();
  const startMonth = start.month();
  const endMonth = end.month();

  const shortStartYear = `'${startYear.toString().slice(-2)}`;
  const shortEndYear = `'${endYear.toString().slice(-2)}`;

  if (startYear === endYear && startMonth === endMonth) {
    const monthName = start.format("MMM");
    return `${start.date()} - ${end.date()} ${monthName} ${shortStartYear}`;
  }

  if (startYear === endYear) {
    const startMonthName = start.format("MMM");
    const endMonthName = end.format("MMM");
    return `${start.date()} ${startMonthName} - ${end.date()} ${endMonthName} ${shortStartYear}`;
  }

  const startMonthName = start.format("MMM");
  const endMonthName = end.format("MMM");
  return `${start.date()} ${startMonthName} ${shortStartYear} - ${end.date()} ${endMonthName} ${shortEndYear}`;
}
