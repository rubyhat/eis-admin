import dayjs from "dayjs";
import "dayjs/locale/ru";

export const useFormatDate = (dateISO: string) => {
  dayjs.locale("ru"); // использование русской локализации глобально
  const date = dayjs(dateISO);
  const time = date.format("HH:mm");
  const dayAndMonth = date.format("D MMMM");
  const fullDate = date.format("DD.MM.YYYY");
  return { fullDate, dayAndMonth, time };
};
