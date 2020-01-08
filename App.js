import React from 'react';
import { View, StyleSheet, Platform, InteractionManager } from 'react-native';
import Navigation from './app/navigations/Navigations';
// import loadImagesFromApi from './app/utils/RestaurantsFromApi';

const { setTimeout, clearTimeout } = global;
const MAX_TIMER_DURATION_MS = 60 * 1000;

export default function App() {
  if (Platform.OS === 'android') {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now();
      if (waitingTime <= 1) {
        InteractionManager.runAfterInteractions(() => {
          if (!timerFix[id]) {
            return;
          }
          delete timerFix[id];
          fn(...args);
        });
        return;
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
      timerFix[id] = setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
        const ttl = Date.now() + time;
        const id = `_lt_${Object.keys(timerFix).length}`;
        runTask(id, fn, ttl, args);
        return id;
      }
      return setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
      if (typeof id === 'string' && id.startWith('_lt_')) {
        clearTimeout(timerFix[id]);
        delete timerFix[id];
        return;
      }
      clearTimeout(id);
    };
  }
  // loadImagesFromApi();
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
