// import liraries
import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

// create a component
const Modal = props => {
  const { isVisible, setIsVisible, children } = props;

  const closeModal = () => setIsVisible(false);

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, .5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlayContainer}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
};

// define your styles
const styles = StyleSheet.create({
  overlayContainer: {
    height: 'auto',
    width: '90%',
    backgroundColor: '#fff',
  },
});

// make this component available to the app
export default Modal;
