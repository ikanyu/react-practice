import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function Home() {
  const [days, setDays] = useState(1);
  const daysOfWeek = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  };
  const [workouts, setWorkouts] = useState([
    { id: 1, links: ['https://www.youtube.com/embed/B1CPE6WWsAQ'] },
  ]);

  const addWorkoutById = (dayId, link) => {
    return workouts.map((workout) => ({
      ...workout,
      links:
        workout.id === dayId
          ? workout.links.concat(`https://www.youtube.com/embed/${link}`)
          : workout.links,
    }));
  };

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

  function handleSubmit(e) {
    e.preventDefault();

    const urlParams = new URL(e.target.link.value).searchParams;
    const videoId = urlParams.get('v');

    const dayId = parseInt(e.target.link.id);
    const result = addWorkoutById(dayId, videoId);

    setWorkouts(result);
  }

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

  function isNotSunday() {
    return days !== 7;
  }

  return (
    <>
      <div className="bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 sm:pr-12">
          Workout Planner
        </h1>
        <section aria-labelledby="information-heading" className="mt-8">
          {workouts.map((workout) => (
            <div key={uuidv4()} className="mt-5">
              <h3 className="text-2xl font-bold text-gray-900 sm:pr-12">
                {daysOfWeek[workout.id]} Workout
              </h3>
              <form onSubmit={handleSubmit}>
                <input type="text" id={workout.id} name="link" />
                <button type="submit">Add Link</button>
              </form>
              {workout.links.map((link) => (
                <div key={uuidv4()}>
                  <iframe width="420" height="315" src={link}></iframe>
                  <button
                    type="Button"
                    onClick={handleDelete}
                    data-id={workout.id}
                    data-link={link}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  >
                    Delete Workout
                  </button>
                </div>
              ))}
            </div>
          ))}
          {isNotSunday() && (
            <button
              onClick={handleAddDay}
              data-id={days + 1}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Add {daysOfWeek[days + 1]} Workout
            </button>
          )}
        </section>
      </div>
    </>
  );
}
