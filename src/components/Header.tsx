import { format, isSameDay } from "date-fns";
import Button from "../components/Button";
import { useHabitContext } from "../contexts/useHabitContext";

type HeaderProps = {
  visibleDates: Date[];
};

function Header({ visibleDates }: HeaderProps) {
  const { habits } = useHabitContext();

  const doneToday = habits.filter((habit) =>
    habit.completions.some((date) => {
      const today = new Date();
      return isSameDay(date, today);
    }),
  ).length;

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`;

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday} / {habits.length} done today
        </span>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
