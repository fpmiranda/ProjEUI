import {FlatList, StyleSheet, View, StatusBar, Text} from 'react-native';
import {ModuleCard} from '../components/ModuleCard';
import {useEffect, useState} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {FIRESTORE_DB} from '../data/firebaseConfig';

export function HomeScreen({navigation, props}) {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    const moduleRef = collection(FIRESTORE_DB, 'user01');
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
      {moduleData.length > 0 ? (
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
      ) : (
        <Text style={styles.aviso}>Não há módulos conectados</Text>
      )}
      <View style={styles.space} />
    </>
  );
}

const styles = StyleSheet.create({
  space: {
    marginTop: 20,
  },
  aviso: {
    fontSize: 20,
    flex: 1,
    alignSelf: 'center',
    marginTop: 25,
  },
});
