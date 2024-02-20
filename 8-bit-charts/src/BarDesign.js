import React from 'react';

const val = 16;
export const colorSets = {
  BLUES: {
    mainColor: '#3b82f6',
    shadowColor: '#2877F6',
    lightColor: '#77A8F9',
    borderColor: '#0748B0',
  },
  BLUES2: {
    mainColor: '#0476E2',
    shadowColor: '#095ED3',
    lightColor: '#4CB4FD',
    borderColor: '#17499E',
  },
  GREENS: {
    mainColor: '#00CC3F',
    shadowColor: '#02AC45',
    lightColor: '#47FF46',
    borderColor: '#026F49',
  },
  YELLOWS: {
    mainColor: '#FFC740',
    shadowColor: '#FE8614',
    lightColor: '#FADEAE',
    borderColor: '#D45715',
  },
  REDS: {
    mainColor: '#E82023',
    shadowColor: '#C0060B',
    lightColor: '#FA7B83',
    borderColor: '#940002',
  },
  DARK_PURPLE: {
    mainColor: '#4119C6',
    shadowColor: '#300BA9',
    lightColor: '#552ED9',
    borderColor: '#362662',
  },
};
const currentColorSet = colorSets.YELLOWS;

// Function to dynamically assign color sets to categories
const assignColorSetsToCategories = (bars, colorByColumn) => {
    const uniqueCategories = [...new Set(bars.map(bar => bar.data[colorByColumn]))];
    const colorSetKeys = Object.keys(colorSets);
    const categoryColorMapping = {};
  
    uniqueCategories.forEach((category, index) => {
      // Cycle through color sets if there are more categories than color sets
      const colorSetKey = colorSetKeys[index % colorSetKeys.length];
      categoryColorMapping[category] = colorSets[colorSetKey];
    });
  
    return categoryColorMapping;
  };

const CustomLayer = ({ bars, colorByColumn = 'month' }) => {
    const categoryColorMapping = assignColorSetsToCategories(bars, colorByColumn);
    return (
      <g>
        {bars.map(bar => {
        //   const { mainColor, shadowColor, lightColor, borderColor } = currentColorSet;
        const category = bar.data[colorByColumn];
        const { mainColor, shadowColor, lightColor, borderColor } = categoryColorMapping[category];

  
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
                style={{ fill: '#fff', fontFamily: '"Press Start 2P"', fontSize: '16px' }} // Ensure the fill color makes the text visible
              >
                {bar.data.formattedValue}
              </text>
            </React.Fragment>
          );
        })}
      </g>
    );
  };

  export default CustomLayer