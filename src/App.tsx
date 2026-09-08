import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import { HabitProvider } from "./contexts/HabitContext";
import { useState } from "react";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

function App() {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return (
    <HabitProvider>
      <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
        <Header visibleDates={visibleDates} />
        <HabitForm />
        <HabitList />
      </div>
    </HabitProvider>
  );
}

export default App;
