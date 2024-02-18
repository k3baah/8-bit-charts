import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

// Sample data
const data = [
  { country: 'USA', food: 60 },
  { country: 'France', food: 80 },
  { country: 'Germany', food: 45 },
  { country: 'Japan', food: 70 },
  { country: 'China', food: 50 },
];

const MyResponsiveBar = () => (
  <div style={{ height: 400 }}>
    <ResponsiveBar
      data={data}
      keys={['food']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'set1' }} // Using a predefined color scheme, but all bars will have the same color
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Country',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Food Quantity',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
);

function App() {
  return <MyResponsiveBar />;
}

export default App;
