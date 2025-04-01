import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Graph = ({ solutionGA }) => {
    if (!solutionGA || !Array.isArray(solutionGA.coveredAreas)) {
        return <p>No data available to display the chart.</p>;
    }

    const chartData = solutionGA.coveredAreas.map((covered, index) => ({
        iteration: index + 1,
        coveredCells: covered
    }));

    return (
        <LineChart
            width={1100}
            height={500}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
            <XAxis dataKey="iteration" label={{ value: 'Iterácia', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Pokryté bunky', angle: -90, position: 'insideLeft', offset: -10 }} />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="coveredCells" stroke="#8884d8" name="Pokryté bunky" />
        </LineChart>
    );
};

export default Graph;
