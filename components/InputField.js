// components/InputField.js
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputField = ({ label, placeholder, value, onChangeText, multiline, numberOfLines }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  inputMultiline: {
    height: 100, // Можно настроить высоту
    paddingTop: 10,
    textAlignVertical: 'top', // Для Android, чтобы текст начинался сверху
  },
});

export default InputField;