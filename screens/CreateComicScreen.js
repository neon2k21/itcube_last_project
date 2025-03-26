// screens/CreateComicScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import InputField from '../components/InputField';

const CreateComicScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    navigation.navigate('Comic', { title, description });
    setTitle('');
    setDescription('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Название комикса:"
        placeholder="Введите название"
        value={title}
        onChangeText={setTitle}
      />
      <InputField
        label="Описание:"
        placeholder="Введите описание"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.buttonContainer}>
        <Button title="Создать" onPress={handleCreate} />
        <Button title="Отмена" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default CreateComicScreen;