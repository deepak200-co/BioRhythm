import React, { useState, useEffect } from 'react';
import BiorhythmForm from '../Biorhythm/BiorhythmForm';
import BiorhythmChart from '../Biorhythm/BiorhythmChart';
import PresentDayBiorhythm from '../PresentDay/PresentDayChart';
import './Main.css';
import Navbar from '../Navbar/Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'
import { set } from 'mongoose';

function Main({ user }) {
  const [birthDate, setBirthDate] = useState('');
  const [presentDayPhysical, setPresentDayPhysical] = useState(null);
  const [presentDayEmotional, setPresentDayEmotional] = useState(null);
  const [presentDayIntellectual, setPresentDayIntellectual] = useState(null);
  const [presentDayAverage, setPresentDayAverage] = useState(null);
  const [userData, setUserData] = useState({})

  useEffect(() => {
    AOS.init({ duration: 1000 });
    axios.get(`http://localhost:5000/${user.email}`).then((res) => {
      setUserData(res.data)
      if (res.data.dob !== '') {
        setBirthDate(res.data.dob)
        const currentDate = new Date();
        const daysSinceBirth = Math.floor((currentDate - new Date(res.data.dob)) / (1000 * 60 * 60 * 24));
        const presentDayPhysicalValue = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 23) + 1) * 50);
        const presentDayEmotionalValue = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 28) + 1) * 50);
        const presentDayIntellectualValue = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 33) + 1) * 50);

        const presentDayAverageValue = Math.round((presentDayPhysicalValue + presentDayEmotionalValue + presentDayIntellectualValue) / 3);

        setPresentDayPhysical(presentDayPhysicalValue);
        setPresentDayEmotional(presentDayEmotionalValue);
        setPresentDayIntellectual(presentDayIntellectualValue);
        setPresentDayAverage(presentDayAverageValue);
      }
    })

  }, []);

  const handleSubmit = (date) => {
    setBirthDate(date);

    const currentDate = new Date();
    const daysSinceBirth = Math.floor((currentDate - new Date(date)) / (1000 * 60 * 60 * 24));

    const presentDayPhysicalValue = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 23) + 1) * 50);
    const presentDayEmotionalValue = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 28) + 1) * 50);
    const presentDayIntellectualValue = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 33) + 1) * 50);
    const presentDayAverageValue = Math.round((presentDayPhysicalValue + presentDayEmotionalValue + presentDayIntellectualValue) / 3);

    setPresentDayPhysical(presentDayPhysicalValue);
    setPresentDayEmotional(presentDayEmotionalValue);
    setPresentDayIntellectual(presentDayIntellectualValue);
    setPresentDayAverage(presentDayAverageValue);
    axios.post(`http://localhost:5000/dob`, { dob: date, email: user.email })
      .then(res => {
        setUserData(res.data)
      })
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <BiorhythmForm onSubmit={handleSubmit} date={userData.dob} isFirst={userData.isFirst} />
        <div className="mt-8">
          {birthDate && (
            <>
              <BiorhythmChart
                birthDate={birthDate}
                presentDayPhysical={presentDayPhysical}
                presentDayEmotional={presentDayEmotional}
                presentDayIntellectual={presentDayIntellectual}
              />
              <PresentDayBiorhythm
                physical={presentDayPhysical}
                emotional={presentDayEmotional}
                intellectual={presentDayIntellectual}
                average={presentDayAverage}
              />
              <h1 className='inter' data-aos='fade-up' data-aos-duration='1000'> Daily Interpretation </h1>
              <div className="text-boxes">
                <div className="text-box" data-aos='fade-right' data-aos-duration='1000' ><h2>Physical</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> </div>
                <div className="text-box" data-aos='fade-up-left' data-aos-duration='1000'><h2>Intellectual</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> </div>
                <div className="text-box" data-aos='fade-up-right' data-aos-duration='1000'><h2>Emotional</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> </div>
                <div className="text-box" data-aos='fade-up' data-aos-duration='1000'><h2>Average</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p> </div>
              </div>

            </>
          )}
        </div>

        <h1 className='Main-para' data-aos='fade-up' data-aos-duration='1000'> The BioRhythm Cycle</h1>
        <div className='Para'>
          <div className='ParaBox' data-aos='fade-right'>
            <h2>The Physical Cycle</h2>
            <p>The Physical cycle, with its 23-day span, touches upon our body's stamina, strength,
              and overall well-being. It influences various physical attributes, including energy levels,
              recovery speed, and even disease resistance, marking our capacity for physical activities and challenges.
            </p>
          </div>
          <div className='ParaBox' data-aos='fade-right'> </div>
          <div className='ParaBox' data-aos='fade-right'> </div>
          <div className='ParaBox' data-aos='fade-up'>
            <h2>The Emotional Cycle</h2>
            <p>The Emotional cycle, lasting 28 days, mirrors the moon's cycle and deeply affects our psychological state.
              It guides our feelings, moods, and emotional responses, impacting our interactions, creativity, and emotional resilience.
            </p>
          </div>
          <div className='ParaBox' data-aos='fade-left'>
            <h2>The Intellectual Cycle</h2>
            <p>Spanning 33 days, the Intellectual cycle shapes our mental faculties. It affects cognitive functions like memory,
              analytical thinking, and problem-solving, indicating periods of heightened intellectual activity or the need for mental rest.
            </p>
          </div>
          <div className='ParaBox' data-aos='fade-right'> </div>
          <div className='ParaBox' data-aos='fade-right'> </div>

          <div className='ParaBox' data-aos='fade-right'>
            <h2>The Average</h2>
            <p>The combined average of physical, emotional, and intellectual levels provides a holistic view of one's current state.
              This overall biorhythm score can guide decisions, indicating general well-being or suggesting caution.
            </p>
          </div>
          <div className='ParaBox' data-aos='fade-up'>
            <h2>The Critical Days</h2>
            <p>Critical days, or transition days, occur when a biorhythm cycle shifts polarity,
              moving across the boundary from positive to negative phases. These shifts lead to life's natural fluctuations,
              contributing to periods of instability that can affect an individual's behavior and actions unusually. While not inherently negative,
              these days call for increased caution, as one might be more prone to accidents compared to other times in the cycle.
              Noteworthy are the double and triple transition days, though they are rare, happening once every 7 or 8 years, signaling even more significant shifts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;