import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from '@/components/header';
import AddDayButton from '@/components/add_day_button';

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
    {
      id: 1,
      links: ['https://www.youtube.com/embed/EWRvkLQ3mMg'],
    },
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
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Header />
          <div className="mx-auto mt-16 max-w-6xl">
            <dl className="grid max-w-6xl grid-cols-1 gap-x-8 gap-y-10">
              {workouts.map((workout) => (
                <div key={uuidv4()} className="relative bg-gray-200 rounded-lg">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="grid grid-rows-1 grid-flow-col m-10">
                      <div className="row-span-3">
                        <div className="text-3xl font-semibold">
                          Day {workout.id}
                        </div>
                        <div className="col-span-1">
                          {' '}
                          <form onSubmit={handleSubmit}>
                            <input type="text" id={workout.id} name="link" />
                            <button
                              type="submit"
                              className="px-4 py-3 rounded-full"
                            >
                              <div className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow">
                                Add Link
                              </div>
                            </button>
                          </form>
                        </div>
                      </div>
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
                    </div>
                  </dt>
                </div>
              ))}
              <AddDayButton
                days={days}
                setDays={setDays}
                workouts={workouts}
                setWorkouts={setWorkouts}
              />
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
