import React from 'react';
import { Path, Svg } from 'react-native-svg';
import PropTypes from 'prop-types';
import colors from '../src/utils/colors';

const MediumPriorityIcon = ({ width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 14 8" fill={colors.primaryDarker}>
    <Path fillRule="evenodd" clipRule="evenodd" d="M6.646.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L7 1.707 1.354 7.354a.5.5 0 11-.708-.708l6-6z" fill={colors.primaryDarker} />
  </Svg>
);

MediumPriorityIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

MediumPriorityIcon.defaultProps = {
  width: 15,
  height: 8,
};

export default MediumPriorityIcon;
