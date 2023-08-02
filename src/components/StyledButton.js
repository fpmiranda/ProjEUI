import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

export function StyledButton(props) {
  return (
    <>
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(60,60,60)',
    width: 60,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 5,
  },
  text: {
    textAlign: 'auto',
    fontWeight: '400',
  },
});
