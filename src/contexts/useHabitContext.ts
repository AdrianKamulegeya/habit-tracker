import { createContext, useContext } from "react";

import type { ReactNode } from "react";

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

export type HabitProviderProps = {
  children: ReactNode;
};

export const HabitContext = createContext<HabitContextType | undefined>(
  undefined,
);

export const useHabitContext = () => {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error("useHabitContext must be used within a HabitProvider");
  }

  return context;
};
