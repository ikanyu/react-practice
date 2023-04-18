export default function AddDayButton({ days, setDays, workouts, setWorkouts }) {
  function isNotSunday() {
    return days !== 7;
  }

  const addWorkoutByDay = (dayId) => {
    const updatedWorkouts = workouts.concat({
      id: dayId,
      links: [],
    });
    setWorkouts(updatedWorkouts);
  };

  function handleAddDay(e) {
    const updatedCounter = days + 1;
    setDays(updatedCounter);

    const dayId = parseInt(e.target.dataset.id);
    addWorkoutByDay(dayId);
  }

  return (
    <div>
      {' '}
      {isNotSunday() && (
        <button
          onClick={handleAddDay}
          data-id={days + 1}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Add Day {days + 1} Workout
        </button>
      )}
    </div>
  );
}
