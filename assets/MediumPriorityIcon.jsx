import React from 'react';
import { Path, Svg } from 'react-native-svg';
import colors from '../src/utils/colors';

const MediumPriorityIcon = () => (
  <Svg width={15} height={8} viewBox="0 0 14 8" fill={colors.primary}>
    <Path fillRule="evenodd" clipRule="evenodd" d="M6.646.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L7 1.707 1.354 7.354a.5.5 0 11-.708-.708l6-6z" fill={colors.primary} />
  </Svg>
);

export default MediumPriorityIcon;
