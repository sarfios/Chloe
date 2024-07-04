import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const WellnessTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState({});

  const categories = ['Physical Activity', 'Sleep', 'Mental Well-being', 'Diet'];

  const updateCategory = (category, value) => {
    setData(prevData => ({
      ...prevData,
      [currentDate.toDateString()]: {
        ...prevData[currentDate.toDateString()],
        [category]: value[0]
      }
    }));
  };

  const renderDayCard = () => {
    const dayData = data[currentDate.toDateString()] || {};
    const chartData = categories.map(category => ({
      category,
      value: dayData[category] || 0
    }));

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center font-bold">
          {currentDate.toDateString()}
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          {categories.map(category => (
            <div key={category} className="mb-4">
              <label className="block mb-2">{category}</label>
              <Slider
                defaultValue={[dayData[category] || 0]}
                max={10}
                step={1}
                onValueChange={(value) => updateCategory(category, value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Chloe's Wellness Tracker</h1>
      <div className="flex justify-center space-x-4 mb-4">
        <Button onClick={() => changeDate(-1)}>Previous Day</Button>
        <Button onClick={() => changeDate(1)}>Next Day</Button>
      </div>
      {renderDayCard()}
    </div>
  );
};

export default WellnessTracker;
