import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import { HabitProvider } from "./contexts/HabitContext";

function App() {
  return (
    <HabitProvider>
      <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
        <Header />
        <HabitForm />
        <HabitList />
      </div>
    </HabitProvider>
  );
}

export default App;
