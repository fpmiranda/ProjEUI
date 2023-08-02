import {Text, View, StyleSheet} from 'react-native';

export function SettingsScreen() {
  return (
    <>
      <View style={styles.centeredView}>
        <Text>TBD</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
