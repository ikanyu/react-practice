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

  function handleSubmit(e) {
    e.preventDefault();

    const urlParams = new URL(e.target.link.value).searchParams;
    const videoId = urlParams.get('v');

    const dayId = parseInt(e.target.link.id);
    const result = addWorkoutById(dayId, videoId);

    setWorkouts(result);
  }

  return (
    <>
      <h1>Hello World!</h1>
      Counter: {daysOfWeek[days]}
      <br />
      https://www.youtube.com/watch?v=njpftTeOu_c
      {workouts.map((workout) => (
        <div key={uuidv4()}>
          <h2>{daysOfWeek[workout.id]} Workout</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" id={workout.id} name="link" />
            <button type="submit">Add Link</button>
          </form>
          <h3>Links</h3>
          {workout.links.map((link) => (
            <div>
              {/* {link} */}
              <iframe
                key={uuidv4()}
                width="420"
                height="315"
                src={link}
              ></iframe>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
