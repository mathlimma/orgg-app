import React from 'react';
import { Path, Svg } from 'react-native-svg';
import PropTypes from 'prop-types';
import Colors from '../src/utils/colors';

const HighPriorityIcon = ({ width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 14 12" fill="none">
    <Path fillRule="evenodd" clipRule="evenodd" d="M6.646.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L7 1.707 1.354 7.354a.5.5 0 11-.708-.708l6-6z" fill={Colors.primaryDark} />
    <Path fillRule="evenodd" clipRule="evenodd" d="M6.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L7 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" fill={Colors.primaryDark} />
  </Svg>
);

HighPriorityIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

HighPriorityIcon.defaultProps = {
  width: 15,
  height: 12,
};

export default HighPriorityIcon;
