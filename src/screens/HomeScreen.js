import {FlatList, StyleSheet, View, StatusBar} from 'react-native';
import {ModuleCard} from '../components/ModuleCard';
import {useEffect, useState, useContext} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {FIRESTORE_DB} from '../data/firebaseConfig';

export function HomeScreen({navigation, props}) {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    const moduleRef = collection(FIRESTORE_DB, 'A8:42:E3:48:A2:98');
    const subscriber = onSnapshot(moduleRef, {
      next: snapshot => {
        const modules = [];
        snapshot.docs.forEach(doc => {
          modules.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setModuleData([...modules]);
      },
    });
    return () => subscriber();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'rgb(50, 50, 50)'} />
      <View style={styles.space} />
      <FlatList
        data={moduleData}
        renderItem={({item}) => (
          <ModuleCard
            onPress={() => {
              navigation.navigate('Module', {
                title: item.nome.charAt(0).toUpperCase() + item.nome.slice(1),
                data: item,
              });
            }}
            data={item}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.space} />
    </>
  );
}

const styles = StyleSheet.create({
  space: {
    marginTop: 20,
  },
});
