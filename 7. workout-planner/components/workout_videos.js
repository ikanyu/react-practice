import { v4 as uuidv4 } from 'uuid';

export default function WorkoutVideos({ workout, workouts, setWorkouts }) {
  function handleDelete(e) {
    console.log(e.target);
    const dayId = parseInt(e.target.dataset.id);
    const linkToDelete = e.target.dataset.link;

    const updatedWorkouts = workouts.map((workout) => ({
      ...workout,
      links:
        workout.id === dayId
          ? workout.links.filter((link) => link !== linkToDelete)
          : workout.links,
    }));
    setWorkouts(updatedWorkouts);
  }

  return (
    <div key={uuidv4()} className="col-span-2 row-auto">
      <div className="grid grid-cols-2 gap-4">
        {workout.links.map((link) => (
          <div>
            <iframe
              className="w-full aspect-auto"
              src={link}
              allowFullScreen
            ></iframe>
            <button
              type="Button"
              onClick={handleDelete}
              data-id={workout.id}
              data-link={link}
              className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
