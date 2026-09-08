import { isSameDay } from "date-fns";
import { createContext, useState, type ReactNode } from "react";

export type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

export type HabitContextType = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (id: string) => void;
  toggleHabit: (id: string, date: Date) => void;
};

type HabitProviderProps = {
  children: ReactNode;
};

export const HabitContext = createContext<HabitContextType | undefined>(
  undefined,
);

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
