import { isSameDay } from "date-fns";
import { useState } from "react";
import {
  type HabitProviderProps,
  type HabitContextType,
  HabitContext,
  type Habit,
} from "./useHabitContext";

export const HabitProvider = ({ children }: HabitProviderProps) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((prevHabits) => [
      ...prevHabits,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function deleteHabit(id: string) {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id !== id) return habit;

        const isCompleted = habit.completions.some((d) => isSameDay(d, date));
        const completions = isCompleted
          ? habit.completions.filter((d) => !isSameDay(d, date))
          : [...habit.completions, date];

        return { ...habit, completions };
      }),
    );
  }

  const value: HabitContextType = {
    habits,
    addHabit,
    deleteHabit,
    toggleHabit,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};
