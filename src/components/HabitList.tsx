import HabitItem from "./HabitItem";
import { useHabitContext } from "../contexts/useHabitContext";

function HabitList() {
  const { habits } = useHabitContext();

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500 py-12 text-center">No habits yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
}

export default HabitList;
