import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';

export default inputTemplate = locals => {
  return (
    <View style={styles.viewContainer}>
      <Input
        placeholder={locals.config.placeholder}
        password={locals.config.password}
        secureTextEntry={locals.config.secureTextEntry}
        onChangeText={value => locals.onChange(value)}
        rightIcon={
          <Icon
            name={locals.config.iconName}
            type={locals.config.iconType}
            size={24}
            color="#b3b3b3"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 12,
    marginButton: 12
  }
});
