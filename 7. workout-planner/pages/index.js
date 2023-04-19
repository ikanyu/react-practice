import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import Header from '@/components/header';
import AddDayButton from '@/components/add_day_button';
import WorkoutDescription from '@/components/workout_description';
import WorkoutVideos from '@/components/workout_videos';

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
                      <WorkoutDescription
                        id={workout.id}
                        workouts={workouts}
                        setWorkouts={setWorkouts}
                      />
                      <WorkoutVideos
                        workout={workout}
                        workouts={workouts}
                        setWorkouts={setWorkouts}
                      />
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
