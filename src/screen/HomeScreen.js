import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [inputTask, setInputTask] = useState(null);
  const [addedTask, setAddedTask] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const renderTasks = ({item, index}) => {
    if (item !== null)
      return (
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 12,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 20, flex: 1}}>
            {item.title}
          </Text>
          <MaterialCommunityIcons
            name="lead-pencil"
            size={25}
            color="#000"
            onPress={() => {
              setSelectedIndex(item.id);
              setInputTask(item.title);
            }}
          />
          <MaterialCommunityIcons
            name="delete"
            size={25}
            color="#000"
            onPress={() => handleDeleteFunction(item.id)}
          />
        </View>
      );
  };

  const handleAddEvent = async () => {
    if (inputTask === '') return;

    // setAddedTask([...addedTask, {id: Date.now().toString(), title: inputTask}]);

    //database
    try {
      await firestore().collection('todo').add({title: inputTask});

      setInputTask('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFunction = async index => {
    // const updatedTasks = addedTask.filter(item => item.id !== id);
    // setAddedTask(updatedTasks);

    // database
    await firestore().collection('todo').doc(index).delete();
  };

  const saveUpdatedTask = async () => {
    // const finalselectedIndex = addedTask.map(item => {
    //   if (item.id === selectedIndex.id) {
    //     return {...item, title: inputTask};
    //   }
    //   return item;
    // });
    // setAddedTask(finalselectedIndex);

    if (inputTask === '') return;
    //database
    try {
      await firestore().collection('todo').doc(selectedIndex).update({
        title: inputTask,
      });
      setSelectedIndex(null);
      setInputTask('');
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      firestore()
        .collection('todo')
        .onSnapshot(snap => {
          const tempArr = [];
          snap.forEach(item => {
            tempArr.push({...item.data(), id: item.id});
          });
          setAddedTask(tempArr);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: 10,
          color: '#000',
        }}>
        Todo App
      </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Write a task"
        value={inputTask}
        onChangeText={inputText => setInputTask(inputText)}
      />

      {selectedIndex ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            saveUpdatedTask();
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            handleAddEvent();
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      {/* Render todo list */}
      <Text style={{fontSize: 20, color: '#000', marginBottom: 5}}>Tasks</Text>

      <FlatList data={addedTask} renderItem={renderTasks} />

      {addedTask == null && <Text>Please add tasks</Text>}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 16,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 6,
    marginVertical: 30,
    alignItems: 'center',
  },
});
