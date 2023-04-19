export default function WorkoutDescription({ id, workouts, setWorkouts }) {
  const addWorkoutById = (dayId, link) => {
    return workouts.map((workout) => ({
      ...workout,
      links:
        workout.id === dayId
          ? workout.links.concat(`https://www.youtube.com/embed/${link}`)
          : workout.links,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    const urlParams = new URL(e.target.link.value).searchParams;
    const videoId = urlParams.get('v');

    const dayId = parseInt(e.target.link.id);
    const result = addWorkoutById(dayId, videoId);

    setWorkouts(result);
  }

  return (
    <div className="row-span-3">
      <div className="text-3xl font-semibold">Day {id}</div>
      <div className="col-span-1">
        {' '}
        <form onSubmit={handleSubmit}>
          <input type="text" id={id} name="link" />
          <button type="submit" className="px-4 py-3 rounded-full">
            <div className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
              Add Link
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
