import { getLocationFor5daysProps, ItemgetLocationFor5daysProps } from "../../functions/getLocationFor5days";
import { handleTime } from "../../functions/handleTime";
import { IconsWeather } from "../../icons/Icons";

export const weekdays = [
  {
    id: 1,
    title: "Segunda",
  },
  {
    id: 2,
    title: "Terça",
  },
  {
    id: 3,
    title: "Quarta",
  },
  {
    id: 4,
    title: "Quinta",
  },
  {
    id: 5,
    title: "Sexta",
  },
];

export const NextDaysProps = (dataDays: getLocationFor5daysProps[]) => {
  if (dataDays.length !== 0) {
    let datesWithHours: any[] = [];

    dataDays.forEach((item) => {
      datesWithHours.push({
        date: item,
        info:handleTime(item.dt).day,
      });
    });

    const fiveDays = [
      ...new Map(datesWithHours.map((item) => [item["info"], item])).values(),
    ];
    console.log("A", fiveDays);
    return (
      <div className="flex justify-center ">
        <div className="grid grid-cols-5 space-x-8 mx-auto">
          {fiveDays.map((item: ItemgetLocationFor5daysProps) => (
            <div key={item.date.dt_txt} className="flex text-center flex-col w-40 mx-auto mt-12 bg-slate-900 bg-opacity-60 text-white rounded-xl py-6 px-1 ">
              <p className="px-1 font-bold text-white mb-2">
                {handleTime(item.date.dt, "short").week}
              </p>
              <p className="px-1 text-3xl font-bold text-white mb-2">
                {handleTime(item.date.dt).day}
              </p>
              <p className="px-1 font-bold text-white mb-2">
                {handleTime(item.date.dt).month}
              </p>
              <div className="flex justify-center">
              <img
                      className="w-10 "
                      src={IconsWeather[item.date.weather[0].main]} 
                      alt="icon-weather"
                    />
                    </div>
              <p className="px-1 text-3xl font-bold text-white mb-2">
                {item.date.main.temp} ºC
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export const NextDays = () => {
  return (
    <div className="flex justify-center max-w-6xl mx-auto mt-12 bg-slate-900 bg-opacity-60 text-white rounded-xl py-10">
      <div className="grid grid-cols-5 space-x-8">
        {weekdays.map((weekday) => (
          <div key={weekday.id}>
            <p>{weekday.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
