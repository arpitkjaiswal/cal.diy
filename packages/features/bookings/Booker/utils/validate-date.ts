import dayjs from "@calcom/dayjs";

const MONTH_FORMAT = "YYYY-MM";
const DATE_FORMAT = "YYYY-MM-DD";

const parseMonth = (month: string | null | undefined) => {
  if (!month) return null;
  return dayjs(month, MONTH_FORMAT, true);
};

export const getValidMonth = (monthParam: string | null | undefined): string | null => {
  const month = parseMonth(monthParam);
  if (!month?.isValid()) return null;

  const currentMonth = dayjs().startOf("month");
  return month.isBefore(currentMonth) ? currentMonth.format(MONTH_FORMAT) : month.format(MONTH_FORMAT);
};

export const getValidDate = (dateParam: string | null | undefined): string | null => {
  if (!dateParam) return null;

  const date = dayjs(dateParam, DATE_FORMAT, true);
  if (!date.isValid() || date.isBefore(dayjs().startOf("day"))) return null;

  return date.format(DATE_FORMAT);
};

export const getInitialBookerDateState = (
  monthParam: string | null | undefined,
  dateParam: string | null | undefined
): { month: string; selectedDate: string | null } => {
  const month = parseMonth(monthParam);
  const currentMonth = dayjs().startOf("month");
  const selectedDate = getValidDate(dateParam);

  return {
    month:
      month?.isValid() && !month.isBefore(currentMonth)
        ? month.format(MONTH_FORMAT)
        : selectedDate
          ? dayjs(selectedDate).format(MONTH_FORMAT)
          : currentMonth.format(MONTH_FORMAT),
    selectedDate,
  };
};
