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
  const getTextForPhysical = (value) => {
    if (value >= 0 && value <= 10) {
      return "Your physical energy is at a low point. It’s a good time for rest and relaxation. Try to avoid strenuous activities.";
    } else if (value >= 11 && value <= 20) {
      return " You’re starting to feel more energetic. Light exercise like stretching or a short walk would be beneficial.";
    } else if (value >= 21 && value <= 30) {
      return " Your energy levels are increasing. You can handle moderate physical activities like a brisk walk or light workout.";
    }else if (value >= 31 && value <= 40) {
      return "You’re feeling strong and capable. It’s a good time for more strenuous physical activities like a run or a gym workout.";
    }else if (value >= 41 && value <= 50) {
      return "You’re at the peak of your physical cycle. You can handle high-intensity workouts. This is a great time to push your limits.";
    }else if (value >= 51 && value <= 60) {
      return "Your physical energy is still high, but starting to decline. Continue with your regular activities, but start to wind down.";
    }else if (value >= 61 && value <= 70) {
      return " Your energy levels are decreasing. It’s a good time to start focusing on recovery activities like yoga or meditation.";
    }else if (value >= 71 && value <= 80) {
      return " You’re entering a period of lower physical energy. Focus on rest and recuperation. Light activities like walking or stretching can help.";
    }else if (value >= 81 && value <= 90) {
      return "Your physical energy is low. It’s a good time for gentle activities and relaxation. Consider activities like reading or listening to music.";
    }else if (value >= 91 && value <= 100) {
      return "You’re at the lowest point of your physical cycle. Your body needs time to rejuvenate. Prioritize restful activities like sleep and gentle yoga.";
    }
    else {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    }
  };

  const getTextForEmotional = (value) => {
    if (value >= 0 && value <= 10) {
      return "Your emotional energy is at a low point. It’s a good time for relaxation and self-care. Try to avoid stressful situations.";
    } else if (value >= 11 && value <= 20) {
      return "You’re starting to feel more emotionally balanced. Light social activities like chatting with a friend or spending time with family would be beneficial.";
    } else if (value >= 21 && value <= 30) {
      return " Your emotional stability is increasing. You can handle moderate social interactions like attending a social gathering or meeting new people.";
    }else if (value >= 31 && value <= 40) {
      return "You’re feeling emotionally strong and capable. It’s a good time for more challenging social activities like public speaking or resolving conflicts.";
    }else if (value >= 41 && value <= 50) {
      return " You’re at the peak of your emotional cycle. You can handle high-intensity social interactions. This is a great time to engage in activities that require emotional strength.";
    }else if (value >= 51 && value <= 60) {
      return "Your emotional energy is still high, but starting to decline. Continue with your regular activities, but start to wind down.";
    }else if (value >= 61 && value <= 70) {
      return "Your emotional stability is decreasing. It’s a good time to start focusing on self-care. Light activities like reading a book or taking a bath can help.";
    }else if (value >= 71 && value <= 80) {
      return " You’re entering a period of lower emotional energy. Focus on rest and self-care. Consider activities like meditation or spending time with loved ones.";
    }else if (value >= 81 && value <= 90) {
      return " Your emotional energy is low. It’s a good time for gentle activities and relaxation. Consider activities like watching a movie or enjoying a hobby.";
    }else if (value >= 91 && value <= 100) {
      return "You’re at the lowest point of your emotional cycle. Your emotional resilience is low. Engage in self-care activities that promote emotional well-being, like meditation or spending time with loved ones.";
    }
    else {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    }
  };

  const getTextForIntellectual = (value) => {
    if (value >= 0 && value <= 10) {
      return "Your intellectual energy is at a low point. It’s a good time for relaxation and non-demanding tasks. Try to avoid complex problem-solving tasks.";
    } else if (value >= 11 && value <= 20) {
      return " You’re starting to feel more mentally alert. Light cognitive activities like reading a newspaper or solving a crossword puzzle would be beneficial.";
    } else if (value >= 21 && value <= 30) {
      return "Your intellectual capabilities are increasing. You can handle moderate cognitive tasks like studying a new topic or learning a new skill.";
    }else if (value >= 31 && value <= 40) {
      return " You’re feeling mentally strong and capable. It’s a good time for more challenging cognitive activities like solving complex problems or brainstorming ideas.";
    }else if (value >= 41 && value <= 50) {
      return "You’re at the peak of your intellectual cycle. You can handle high-intensity cognitive tasks. This is a great time to tackle challenging intellectual work.";
    }else if (value >= 51 && value <= 60) {
      return "Your intellectual energy is still high, but starting to decline. Continue with your regular activities, but start to wind down.";
    }else if (value >= 61 && value <= 70) {
      return " Your intellectual capabilities are decreasing. It’s a good time to start focusing on relaxation. Light activities like reading a novel or watching a movie can help.";
    }else if (value >= 71 && value <= 80) {
      return "You’re entering a period of lower intellectual energy. Focus on rest and recuperation. Consider activities like meditation or listening to music.";
    }else if (value >= 81 && value <= 90) {
      return "Your intellectual energy is low. It’s a good time for gentle activities and relaxation. Consider activities like taking a walk or enjoying nature.";
    }else if (value >= 91 && value <= 100) {
      return "You’re at the lowest point of your intellectual cycle. Your cognitive resources are depleted. Engage in relaxing activities that don’t require much mental effort, like watching a movie or listening to music.";
    }
    else {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    }
  };

  const getTextForAverage = (value) => {
    if (value >= 0 && value <= 10) {
      return "Your overall energy is at a low point. It’s a good time for rest and relaxation. Try to avoid demanding tasks.";
    } else if (value >= 11 && value <= 20) {
      return "You’re starting to feel more balanced. Light activities like taking a walk or doing some light reading would be beneficial.";
    } else if (value >= 21 && value <= 30) {
      return " Your overall capabilities are increasing. You can handle moderate tasks like doing some housework or studying a new topic.";
    }else if (value >= 31 && value <= 40) {
      return "You’re feeling strong and capable. It’s a good time for more challenging activities like tackling a complex project or learning a new skill.";
    }else if (value >= 41 && value <= 50) {
      return " You’re at the peak of your average cycle. You can handle high-intensity tasks. This is a great time to push your limits.";
    }else if (value >= 51 && value <= 60) {
      return "Your overall energy is still high, but starting to decline. Continue with your regular activities, but start to wind down";
    }else if (value >= 61 && value <= 70) {
      return "Your overall capabilities are decreasing. It’s a good time to start focusing on relaxation. Light activities like reading a book or watching a movie can help";
    }else if (value >= 71 && value <= 80) {
      return "You’re entering a period of lower overall energy. Focus on rest and recuperation. Consider activities like taking a bath or listening to music.";
    }else if (value >= 81 && value <= 90) {
      return " Your overall energy is low. It’s a good time for gentle activities and relaxation. Consider activities like taking a walk or enjoying nature.";
    }else if (value >= 91 && value <= 100) {
      return "You’re at the lowest point of your average cycle. Overall, your energy levels are low. It’s a good time to engage in calming activities like reading a book or taking a leisurely walk.";
    }
    else {
      return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
    }
  };


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
                <div className="text-box" data-aos='fade-right' data-aos-duration='1000' ><h2>Physical</h2>  <p>{getTextForPhysical(presentDayPhysical)}</p></div>
                <div className="text-box" data-aos='fade-up-left' data-aos-duration='1000'><h2>Intellectual</h2><p>{getTextForIntellectual(presentDayIntellectual)}</p></div>
                <div className="text-box" data-aos='fade-up-right' data-aos-duration='1000'><h2>Emotional</h2>  <p>{getTextForEmotional(presentDayEmotional)}</p></div>
                <div className="text-box" data-aos='fade-up' data-aos-duration='1000'><h2>Average</h2>  <p>{getTextForAverage(presentDayAverage)}</p></div>
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