import React from 'react';

import PropTypes from 'prop-types';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { Overlay, ContentContainer } from './styles';

// FIX: Clicking on content calls onPressOpacity
// TODO: Animate Content going up and Overlay transparency

const OrggBottomSheet = ({ children, onPressOpacity }) => (
  <Modal transparent>
    <TouchableWithoutFeedback onPress={onPressOpacity}>
      <Overlay>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Overlay>
    </TouchableWithoutFeedback>
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
