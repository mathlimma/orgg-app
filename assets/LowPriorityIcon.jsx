import React from 'react';
import { Path, Svg } from 'react-native-svg';
import colors from '../src/utils/colors';

const LowPriorityIcon = () => (
  <Svg width={14} height={1} viewBox="2 0 14 1" fill={colors.primary}>
    <Path stroke={colors.primary} d="M0 .5h15" />
  </Svg>
);

export default LowPriorityIcon;
