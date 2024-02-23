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

// Function to dynamically assign color sets to keys
const assignColorSetsToKeys = (bars) => {
    const keys = [...new Set(bars.map(bar => bar.data.id))];
    const colorSetKeys = Object.keys(colorSets);
    const keyColorMapping = {};

    keys.forEach((key, index) => {
        keyColorMapping[key] = colorSets[colorSetKeys[index % colorSetKeys.length]];
    });

    return keyColorMapping;
};

// Function to dynamically assign color sets to index values (e.g., years)
const assignColorSetsToIndexValues = (bars) => {
    const indexValues = [...new Set(bars.map(bar => bar.data.indexValue))];
    const colorSetKeys = Object.keys(colorSets);
    const indexValueColorMapping = {};

    indexValues.forEach((value, index) => {
        indexValueColorMapping[value] = colorSets[colorSetKeys[index % colorSetKeys.length]];
    });
    return indexValueColorMapping;
};
const assignColorSetsToColumnValues = (bars, columnName) => {
    // Access the nested 'data' object
    const columnValues = [...new Set(bars.map(bar => bar.data.data[columnName]))];
    const colorSetKeys = Object.keys(colorSets);
    const columnValueColorMapping = {};

    columnValues.forEach((value, index) => {
        columnValueColorMapping[value] = colorSets[colorSetKeys[index % colorSetKeys.length]];
    });

    return columnValueColorMapping;
};

const CustomLayer = ({ bars, colorMode, selectedColorSet, dynamicColoringMode, columnName }) => {
    let colorMapping;
    if (colorMode === 'dynamic') {
        if (dynamicColoringMode === 'key') {
            colorMapping = assignColorSetsToKeys(bars);
        } else if (dynamicColoringMode === 'indexValue') {
            colorMapping = assignColorSetsToIndexValues(bars);
        } else if (dynamicColoringMode === 'columnValue' && columnName) {
            colorMapping = assignColorSetsToColumnValues(bars, columnName);
        }
    } else {
        // Use a solid color set for all bars
        const solidColorSet = colorSets[selectedColorSet];
        colorMapping = bars.reduce((acc, bar) => {
            acc[bar.data.id] = solidColorSet;
            return acc;
        }, {});
    }

    return (
        <g>
            {bars.map(bar => {
                console.log(bar)
                let colorSet;
                if (colorMode === 'dynamic') {
                    if (dynamicColoringMode === 'key') {
                        colorSet = colorMapping[bar.data.id];
                    } else if (dynamicColoringMode === 'indexValue') {
                        colorSet = colorMapping[bar.data.indexValue];
                    } else if (dynamicColoringMode === 'columnValue' && columnName) {
                        colorSet = colorMapping[bar.data.data[columnName]];
                    }
                } else {
                    colorSet = colorMapping[bar.data.id];
                }
                const { mainColor, shadowColor, lightColor, borderColor } = colorSet || colorSets.BLUES;
                // console.log(bar.data.data[columnName])
                console.log([columnName])

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
                            {parseFloat(bar.data.formattedValue).toFixed(0)}
                        </text>
                    </React.Fragment>
                );
            })}
        </g>
    );
};

export default CustomLayer