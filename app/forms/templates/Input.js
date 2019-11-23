import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';

export default locals => {
  return (
    <View style={styles.viewContainer}>
      <Input
        placeholder={locals.config.placeholder}
        password={locals.config.password}
        secureTextEntry={locals.config.secureTextEntry}
        onChangeText={value => locals.onChange(value)}
        leftIcon={
          <Icon
            containerStyle={{ marginRight: 10 }}
            name={locals.config.iconName}
            type={locals.config.iconType}
            size={24}
            color="black"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
});
