import { format, addDays, subDays, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function DateNavigator({ selectedDate, onDateChange }: Props) {
  const handleChange = (newDate: Date) => {
    onDateChange(newDate);
  };

  const handlePrev = () => handleChange(subDays(selectedDate, 1));

  const handleNext = () => {
    if (!isToday(selectedDate)) {
      handleChange(addDays(selectedDate, 1));
    }
  };

  const getDateLabel = () => {
    if (isToday(selectedDate)) return "Hoy";
    if (isYesterday(selectedDate)) return "Ayer";
    return format(selectedDate, "d 'de' MMMM", { locale: es });
  };

  return (
    <div className="flex items-center gap-4 p-2 bg-green-700 rounded-xl shadow h-13 m-3">
      <button onClick={handlePrev}>
        <ChevronLeft className="w-7 h-7 text-white hover:text-green-500" />
      </button>
      <span className="text-white font-medium">{getDateLabel()}</span>
      <button onClick={handleNext} disabled={isToday(selectedDate)}>
        <ChevronRight
          className={`w-7 h-7 ${
            isToday(selectedDate)
              ? "text-white opacity-30 cursor-not-allowed"
              : "text-white hover:text-green-500"
          }`}
        />
      </button>
    </div>
  );
}
