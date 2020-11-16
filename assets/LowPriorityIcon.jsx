import React from 'react';
import { Path, Svg } from 'react-native-svg';
import PropTypes from 'prop-types';

const LowPriorityIcon = ({ width, height }) => (
  <Svg width={width} height={height} viewBox="2 0 14 1" fill="#000">
    <Path stroke="#000" d="M0 .5h15" />
  </Svg>
);

LowPriorityIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

LowPriorityIcon.defaultProps = {
  width: 14,
  height: 1,
};

export default LowPriorityIcon;
