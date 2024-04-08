import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

const PresentDayChart = ({ physical, emotional, intellectual, average }) => {
    const data = [
        { name: 'Physical', value: physical },
        { name: 'Emotional', value: emotional },
        { name: 'Intellectual', value: intellectual },
        { name: 'Average', value: average}
    ];

    return (
        <BarChart width={400} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" >
            <LabelList dataKey="value" position="centerTop" fill="white"/>
            </Bar>
        </BarChart>
    );
};

export default PresentDayChart;
