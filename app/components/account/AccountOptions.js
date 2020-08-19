// import liraries
import React, { useState } from 'react';
import { ListItem } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import ChangeDisplayNameForm from './updatesForms/ChangeDisplayNameForm';
import ChangeEmailForm from './updatesForms/ChangeEmailForm';
import ChangePasswordForm from './updatesForms/ChangePasswordForm';

// create a component
const AccountOptions = props => {
  const { userInfo, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const menuOptions = [
    {
      key: 'displayName',
      title: 'Cambiar nombre',
      iconTypes: 'material-commuinity',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => {
        selectedComponent('displayName');
      },
    },
    {
      key: 'email',
      title: 'Cambiar email',
      iconTypes: 'material-commuinity',
      iconNameLeft: 'email',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => {
        selectedComponent('email');
      },
    },
    {
      key: 'password',
      title: 'Cambiar contraseña',
      iconTypes: 'material-commuinity',
      iconNameLeft: 'lock',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => {
        selectedComponent('password');
      },
    },
  ];

  const selectedComponent = key => {
    switch (key) {
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />,
        );
        break;

      case 'email':
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />,
        );
        break;
      case 'password':
        setRenderComponent(
          <ChangePasswordForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />,
        );
        break;
      default:
        break;
    }
    setIsVisibleModal(true);
  };

  return (
    <View>
      {menuOptions.map(menu => (
        <ListItem
          key={menu.key}
          title={menu.title}
          leftIcon={{
            type: menu.iconTypes,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconTypes,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          containerStyle={styles.menuItem}
        />
      ))}
      {renderComponent && (
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
        >
          {renderComponent}
        </Modal>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
});

AccountOptions.propTypes = {
  userInfo: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  setReloadData: PropTypes.func.isRequired,
  toastRef: PropTypes.shape({
    current: PropTypes.shape({
      show: PropTypes.func,
    }),
  }).isRequired,
};

// make this component available to the app
export default AccountOptions;
