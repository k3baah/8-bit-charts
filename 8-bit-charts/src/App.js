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

const theme = {
  "background": "#ffffff",
  "text": {
      "fontSize": 11,
      "fill": "#333333",
      "outlineWidth": 0,
      "outlineColor": "transparent"
  },
  "axis": {
      "domain": {
          "line": {
              "stroke": "#777777",
              "strokeWidth": 1
          }
      },
      "legend": {
          "text": {
              "fontSize": 12,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      },
      "ticks": {
          "line": {
              "stroke": "#777777",
              "strokeWidth": 1
          },
          "text": {
              "fontSize": 11,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      }
  },
  "grid": {
      "line": {
          "stroke": "#dddddd",
          "strokeWidth": 1
      }
  },
  "legends": {
      "title": {
          "text": {
              "fontSize": 11,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      },
      "text": {
          "fontSize": 11,
          "fill": "#333333",
          "outlineWidth": 0,
          "outlineColor": "transparent"
      },
      "ticks": {
          "line": {},
          "text": {
              "fontSize": 10,
              "fill": "#333333",
              "outlineWidth": 0,
              "outlineColor": "transparent"
          }
      }
  },
  "annotations": {
      "text": {
          "fontSize": 13,
          "fill": "#333333",
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      },
      "link": {
          "stroke": "#000000",
          "strokeWidth": 1,
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      },
      "outline": {
          "stroke": "#000000",
          "strokeWidth": 2,
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      },
      "symbol": {
          "fill": "#000000",
          "outlineWidth": 2,
          "outlineColor": "#ffffff",
          "outlineOpacity": 1
      }
  },
  "tooltip": {
      "container": {
          "background": "#ffffff",
          "fontSize": 12
      },
      "basic": {},
      "chip": {},
      "table": {},
      "tableCell": {},
      "tableCellValue": {}
  }
}

const val = 16;
const borderWidth = 4; // Width of the border

const CustomLayer = ({ bars }) => {
  return (
    <g>
      {bars.map(bar => {
        const mainColor = '#3b82f6'; // Main color of the bar
        const shadowColor = '#2877F6' // Darker shade for the shadow
        const lightColor = '#77A8F9' // Lighter shade for the light

        return (
          <React.Fragment key={bar.key}>
            {/* Main part of the bar */}
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={mainColor}
            />
            
            {/* Right edge (light) */}
            <rect
              x={bar.x + bar.width - val} // Position at the right of the main bar
              y={bar.y}
              width={val} // Width of the edge
              height={bar.height}
              fill={lightColor}
            />
             {/* Left edge (shadow) */}
             <rect
              x={bar.x}
              y={bar.y}
              width={val} // Width of the edge
              height={bar.height}
              fill={shadowColor}
            />
            {/* Top edge (light) */}
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={val} // Height of the edge
              fill={lightColor}
            />
            {/* Bottom edge (shadow) */}
            <rect
              x={bar.x}
              y={bar.y + bar.height - val} // Position at the bottom of the main bar
              width={bar.width}
              height={val} // Height of the edge
              fill={shadowColor}
            />
          </React.Fragment>
        );
      })}
    </g>
  );
};

// ... Rest of your MyResponsiveBar and App component

// ... Rest of your MyResponsiveBar and App component


const MyResponsiveBar = () => (
  <div className ="nivo-bar" style={{ height: 400 }}>
    <ResponsiveBar
      data={data}
      // barComponent={CustomBarComponent}
      layers={['grid', 'axes',  CustomLayer, 'markers', 'legends', 'annotations']}
      keys={['food']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#60a5fa']}
      // borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      borderColor = {['#000']}
      // borderWidth = {6}
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
      theme = {theme}
    />
  </div>
);

function App() {
  return <MyResponsiveBar />;
}

export default App;
