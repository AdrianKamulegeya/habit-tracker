import { useState, type SubmitEvent } from "react";
import Button from "./Button";
import { useHabitContext } from "../contexts/useHabitContext";

function HabitForm() {
  const { addHabit } = useHabitContext();
  const [habit, setHabit] = useState("");

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (habit.trim() === "") return;

    addHabit(habit);
    setHabit("");
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        type="text"
        id="habit"
        placeholder="New habit..."
        className="bg-zinc-800 flex-1 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
      />

      <Button
        disabled={habit.trim() === ""}
        className="rounded-lg px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  );
}

export default HabitForm;
