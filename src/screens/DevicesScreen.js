import {View, Text, StyleSheet} from 'react-native';

export function DevicesScreen() {
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
