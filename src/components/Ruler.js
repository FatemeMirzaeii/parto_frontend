import React from 'react';
import Svg, { Line, Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { COLOR } from '../styles/static';
const Ruler = () => {
  const cycle = useSelector((state) => state.cycle);
  return (
    <Svg height="100" width="20">
      <Circle cx="10" cy="7" r="7" fill={COLOR.white} />
      <Line
        x1="10"
        y1="0"
        x2="10"
        y2="45"
        stroke={COLOR.white}
        strokeWidth="1.5"
        strokeDasharray="5, 5"
      />
      <Circle cx="10" cy="45" r="5" fill={COLOR.white} />
      {!cycle.isPregnant && (
        <>
          <Line
            x1="10"
            y1="45"
            x2="10"
            y2="100"
            stroke={COLOR.white}
            strokeWidth="1.5"
            strokeDasharray="5, 5"
          />
          <Circle cx="10" cy="96" r="4" fill={COLOR.white} />
        </>
      )}
    </Svg>
  );
};
export default Ruler;
