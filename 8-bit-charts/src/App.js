import React, { useRef } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import domToImage from 'dom-to-image';


// Sample data
const data = [
  { country: 'Watson', food: 60 },
  { country: 'Froud', food: 80 },
  { country: 'Kofi', food: 45 },
  { country: 'George', food: 70 },
  { country: 'Steve', food: 50 },
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
        "outlineColor": "transparent",
        "fontFamily": '"Space Mono", monospace'
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
        console.log(bar.data.formattedValue);
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
            <text
              x={bar.x + bar.width / 2}
              y={bar.y - 25} // Adjusted to place the text just above the bar
              textAnchor="middle"
              style={{ fill: '#fff', fontFamily: '"Press Start 2P"', fontSize:'16px' }} // Ensure the fill color makes the text visible
            >
              {bar.data.formattedValue}
            </text>
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
      layers={['grid', 'axes', 'bars',  CustomLayer, 'markers', 'legends', 'annotations']}
      // enableLabel={true}
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
      <h2 className='title' style={{ textAlign: 'center', fontSize: '48px', padding: '0px', color: 'white' }}>Messages Sent</h2>
      <h2 className='subtitle' style={{ textAlign: 'center', fontSize: '32px', color: '#6b7280' }}>Per Person, 2023</h2>
      <div ref={chartRef}><MyResponsiveBar /></div>
      <div style={{ textAlign: 'center' }}>
        <button style={{ margin: '30px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }} onClick={exportToPNG}>Export as PNG</button>
      </div>

    </div>
  );
}

export default App;
