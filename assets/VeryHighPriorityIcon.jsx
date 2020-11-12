import React from 'react';
import { Path, Svg } from 'react-native-svg';
import colors from '../src/utils/colors';

const VeryHighPriorityIcon = () => (
  <Svg width={14} height={16} viewBox="0 0 14 16" fill="none">
    <Path fillRule="evenodd" clipRule="evenodd" d="M6.147.147a.5.5 0 01.708 0l6 6a.5.5 0 11-.708.708L6.5 1.208.855 6.855a.5.5 0 11-.708-.708l6-6z" fill={colors.primary} />
    <Path fillRule="evenodd" clipRule="evenodd" d="M6.147 4.147a.5.5 0 01.708 0l6 6a.5.5 0 11-.708.708L6.5 5.208.855 10.855a.5.5 0 01-.708-.708l6-6z" fill={colors.primary} />
    <Path fillRule="evenodd" clipRule="evenodd" d="M6.147 8.147a.5.5 0 01.708 0l6 6a.5.5 0 11-.708.708L6.5 9.208.855 14.855a.5.5 0 01-.708-.708l6-6z" fill={colors.primary} />
  </Svg>
);

export default VeryHighPriorityIcon;
