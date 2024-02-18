import React, { useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import domToImage from 'dom-to-image';


// Sample data
const data = [
  { country: 'USA', food: 60 },
  { country: 'France', food: 80 },
  { country: 'Germany', food: 45 },
  { country: 'Japan', food: 70 },
  { country: 'China', food: 50 },
];

const theme = {
  "background": "transparent",
  "text": {
    "fontSize": 24,
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
        "fontSize": 24,
        "fill": "transparent",
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
        "fontSize": 20,
        "fill": "#fff",
        "outlineWidth": 0,
        "outlineColor": "transparent"
      }
    }
  },
  "grid": {
    "line": {
      "stroke": "#dddddd",
      "strokeWidth": 0
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
        // BLUES
        // const mainColor = '#3b82f6'; // Main color of the bar
        // const shadowColor = '#2877F6' // Darker shade for the shadow
        // const lightColor = '#77A8F9' // Lighter shade for the light
        // const borderColor = '#0748B0' // Lighter shade for the light


        // BLUES 2
        // const mainColor = '#0476E2'; // Main color of the bar
        // const shadowColor = '#095ED3' // Darker shade for the shadow
        // const lightColor = '#4CB4FD' // Lighter shade for the light
        // const borderColor = '#17499E' // Lighter shade for the light

        // GREENS
        // const mainColor = '#00CC3F'; // Main color of the bar
        // const shadowColor = '#02AC45' // Darker shade for the shadow
        // const lightColor = '#47FF46' // Lighter shade for the light
        // const borderColor = '#026F49' // Lighter shade for the light

        // // YELLOWS
        const mainColor = '#FFC740'; // Main color of the bar
        const shadowColor = '#FE8614' // Darker shade for the shadow
        const lightColor = '#FADEAE' // Lighter shade for the light
        const borderColor = '#D45715' // Lighter shade for the light

        // // REDS
        // const mainColor = '#E82023'; // Main color of the bar
        // const shadowColor = '#C0060B' // Darker shade for the shadow
        // const lightColor = '#FA7B83' // Lighter shade for the light
        // const borderColor = '#940002' // Lighter shade for the light

        // DARK PURPLE
        // const mainColor = '#4119C6'; // Main color of the bar
        // const shadowColor = '#300BA9' // Darker shade for the shadow
        // const lightColor = '#552ED9' // Lighter shade for the light
        // const borderColor = '#362662' // Lighter shade for the light

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

            {/* Border */}
            <rect
              x={bar.x - val} // Position to the left of the main bar
              y={bar.y}
              width={val} // Width of the border
              height={bar.height}
              fill={borderColor}
            />
            <rect
              x={bar.x}
              y={bar.y - val} // Position above the main bar
              width={bar.width}
              height={val} // Height of the border
              fill={borderColor}
            />
            <rect
              x={bar.x + bar.width} // Position to the right of the main bar
              y={bar.y}
              width={val} // Width of the border
              height={bar.height}
              fill={borderColor}
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

const MyResponsiveBar = () => (
  <div className="nivo-bar" style={{ height: 400 }}>
    <ResponsiveBar
      data={data}
      layers={['grid', 'axes', CustomLayer, 'markers', 'legends', 'annotations']}
      keys={['food']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#60a5fa']}
      borderColor={['#000']}
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
      theme={theme}
    />
  </div>
);

function App() {
  const chartRef = useRef();

  const exportToPNG = () => {
    domToImage.toPng(chartRef.current, {
      style: {
        backgroundColor: 'transparent', // Set background color to transparent
      }
    })
      .then((dataUrl) => {
        // Create a link to download the image
        const link = document.createElement('a');
        link.download = 'my-chart.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting the chart:', error);
      });
  };
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '64px', padding: '20px', color: 'white' }}>My Nivo Chart</h2>
      <div ref={chartRef}><MyResponsiveBar /></div>
      <button style={{ margin: '30px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={exportToPNG}>Export as PNG</button>
    </div>
  );
}

export default App;
