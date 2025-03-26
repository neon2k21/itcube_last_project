// components/ComicCell.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ComicCell = ({ text }) => {
  return (
    <View style={styles.cell}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default ComicCell;