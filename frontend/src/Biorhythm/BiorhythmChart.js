import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import '../Style.css';

const BiorhythmChart = ({ birthDate, presentDayPhysical, presentDayEmotional, presentDayIntellectual }) => {
  const [userData, setUserData] = useState({
    birthDate: '',
    presentDayPhysical: 0,
    presentDayEmotional: 0,
    presentDayIntellectual: 0
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const currentDate = moment();
      const startDate = currentDate.clone().subtract(0, 'days');
      const chartData = [];

      for (let i = 0; i < 11; i++) {
        const currentDate = startDate.clone().add(i, 'days');
        const daysSinceBirth = Math.floor((currentDate - moment(birthDate)) / (1000 * 60 * 60 * 24));
        // const physical = Math.round(Math.sin((2 * Math.PI * daysSinceBirth) / 23) * 100);   
        // const emotional = Math.round(Math.sin((2 * Math.PI * daysSinceBirth) / 28) * 100);  
        // const intellectual = Math.round(Math.sin((2 * Math.PI * daysSinceBirth) / 33) * 100);
        const physical = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 23) + 1) * 50);
        const emotional = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 28) + 1) * 50);
        const intellectual = Math.round((Math.sin((2 * Math.PI * daysSinceBirth) / 33) + 1) * 50);
        
        const average = Math.round((physical + emotional + intellectual) / 3);

        chartData.push({
          day: currentDate.format('DD/MM'),
          physical,
          emotional,
          intellectual,
          average,
          daysfrombirth: daysSinceBirth,
        });
      }

      return chartData;
    };

    setChartData(generateData());
  }, [userData]);
  useEffect(() => {
    setUserData({
      birthDate,
      presentDayPhysical,
      presentDayEmotional,
      presentDayIntellectual
    });
  }, [birthDate, presentDayPhysical, presentDayEmotional, presentDayIntellectual]);


  const presentDayIndex = 10;
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: '', position: 'insideBottom' }} interval={0} />
          <YAxis type="number" domain={[0, 100]} label={{ value: 'Biorhythm Value', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value) => (value < 0 ? (-value).toFixed(3) : value.toFixed(3))}
          />
          <Legend verticalAlign="top" align="right" />
          <Line type="monotone" dataKey="physical" stroke="#ff6347" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="emotional" stroke="#00bfff" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="intellectual" stroke="#ffa500" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="average" stroke="#7D8980" strokeWidth={3} dot={{ r: 4 }} />
          <ReferenceArea x1={presentDayIndex - 0.5} x2={presentDayIndex + 0.5} fill="#f0f0f0" />
          <ReferenceArea x1={presentDayIndex - 0.5} x2={presentDayIndex + 0.5} fill="#f0f0f0" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiorhythmChart;
