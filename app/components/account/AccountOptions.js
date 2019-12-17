// import liraries
import React from 'react';
import { ListItem } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const AccountOptions = () => {
  const menuOptions = [
    {
      title: 'Cambiar nombre',
      iconTypes: 'material-commuinity',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => {
        console.log('Change name');
      },
    },
    {
      title: 'Cambiar email',
      iconTypes: 'material-commuinity',
      iconNameLeft: 'email',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => {
        console.log('Change email');
      },
    },
    {
      title: 'Cambiar contraseña',
      iconTypes: 'material-commuinity',
      iconNameLeft: 'lock',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => {
        console.log('Change password');
      },
    },
  ];

  return (
    <View>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
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

// make this component available to the app
export default AccountOptions;
