"use client";

import { setSelectedDate } from "@/features/front-end/fixture/fixtureSlice";
import { RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";

export default function FormattedDate({
  date,
  daysOfWeekLang,
  monthOfYear
}: {
  date: string;
  daysOfWeekLang: any;
  monthOfYear: any;
}) {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state: RootState) => state.fixtureSlice);
  // const { lang } = useSelector((state: RootState) => state.langSlice);
  // const { daysOfWeek:day } = getDictionary;
  const today = new Date();
  const daysOfWeek = [
    daysOfWeekLang?.sun,
    daysOfWeekLang?.mon,
    daysOfWeekLang?.tue,
    daysOfWeekLang?.wed,
    daysOfWeekLang?.thu,
    daysOfWeekLang?.fri,
    daysOfWeekLang?.sat
  ];
  const months = [
    monthOfYear?.jan,
    monthOfYear.fab,
    monthOfYear?.mar,
    monthOfYear.apr,
    monthOfYear.may,
    monthOfYear.jun,
    monthOfYear.jul,
    monthOfYear.aug,
    monthOfYear.sep,
    monthOfYear.oct,
    monthOfYear.nov,
    monthOfYear.dec
  ];

  //   const { selectedDate, setSelectedDate, setIsRefetching } = useAppContext();
  const formattedDate = new Date(date);
  const dayOfWeek = daysOfWeek[formattedDate.getUTCDay()];
  const dayOfMonth = formattedDate.getUTCDate();
  const month = months[formattedDate.getUTCMonth()];

  const isToday = formattedDate.toDateString() === today.toDateString();

  const handleDateClick = (date: string) => {
    dispatch(setSelectedDate({ date }));
    // setIsRefetching(true);
  };

  return (
    <div onClick={() => handleDateClick(date)}>
      {isToday ? (
        <p
          className={`min-w-[60px] cursor-pointer select-none text-[11px]  lg:text-sm ${
            date === selectedDate ? "font-bold text-secondary " : "text-gray-300"
          } scale-105 text-center`}
        >
          {daysOfWeekLang?.today}
          <br />
          <span className='block text-[9px] lg:text-[10px]'>
            {`${dayOfMonth.toString().padStart(2, "0")} ${month}`}
          </span>
        </p>
      ) : (
        <p
          className={`cursor-pointer select-none text-[8px] lg:text-sm ${
            date === selectedDate ? "scale-105 font-bold text-secondary" : "  "
          } text-center`}
        >
          {dayOfWeek}
          <br />
          <span className='block text-[10px]'>{`${dayOfMonth.toString().padStart(2, "0")} ${month}`}</span>
        </p>
      )}
    </div>
  );
}
