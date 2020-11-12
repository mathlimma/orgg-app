import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import colors from '../src/utils/colors';

function StartingAddButtonIcon() {
  return (
    <Svg width={155} height={155} viewBox="0 0 155 155" fill="none">
      <Circle cx="77.5" cy="77.5" r="77.5" fill={colors.primary} />
      <Path stroke="#fff" strokeWidth="5" d="M78 43v70M112 79H42" />
    </Svg>
  );
}

export default StartingAddButtonIcon;
