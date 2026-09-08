import Button from "./Button";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
  subDays,
} from "date-fns";
import { useHabitContext } from "../contexts/useHabitContext";
import type { Habit } from "../contexts/HabitContext";

function HabitItem({ habit }: { habit: Habit }) {
  const { deleteHabit, toggleHabit } = useHabitContext();

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const streakLength = getStreakLength(habit.completions);

  return (
    <div className="bg-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-3 items-center">
          <span className="font-medium ">{habit.name}</span>
          {streakLength !== 0 && (
            <span className="text-amber-400 text-sm">{streakLength}</span>
          )}
        </div>
        <Button
          variant="ghost-destructive"
          className="text-sm"
          onClick={() => deleteHabit(habit.id)}
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            key={date.toISOString()}
            disabled={isFuture(date)}
            onClick={() => toggleHabit(habit.id, date)}
            variant={
              habit.completions.some((d) => isSameDay(d, date))
                ? "primary"
                : "secondary"
            }
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function getStreakLength(completions: Date[]) {
  // Implementation for calculating streak length
  let streak = 0;
  let date = new Date();
  while (completions.some((d) => isSameDay(d, date))) {
    streak++;
    date = subDays(date, 1);
  }
  return streak;
}

export default HabitItem;
