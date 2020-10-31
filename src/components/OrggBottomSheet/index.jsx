import React from 'react';

import PropTypes from 'prop-types';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { OpacityOverlay, ContentContainer } from './styles';

// TODO: Animate Content going up and Overlay transparency

const OrggBottomSheet = ({ children, onPressOpacity }) => (
  <Modal transparent>
    <TouchableWithoutFeedback onPress={onPressOpacity}>
      <OpacityOverlay />
    </TouchableWithoutFeedback>
    <ContentContainer>
      {children}
    </ContentContainer>
  </Modal>
);

OrggBottomSheet.propTypes = {
  children: PropTypes.element,
  onPressOpacity: PropTypes.func,
};

OrggBottomSheet.defaultProps = {
  children: null,
  onPressOpacity: () => null,
};

export default OrggBottomSheet;
