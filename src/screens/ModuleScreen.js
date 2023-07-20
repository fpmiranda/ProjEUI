import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import {doc, updateDoc} from 'firebase/firestore';

import {defaultData} from '../data/datafile';
import {FIRESTORE_DB} from '../data/firebaseConfig';

import {HeaderImg} from '../components/HeaderImg';

export function ModuleScreen({navigation, route}) {
  const {id, nome, diasPlantado, umidadeAgora} = route.params.data;
  const index = defaultData.findIndex(x => x.planta == nome);

  const [selectedItem, setSelectedItem] = useState(defaultData[index]);
  const [isEditable, setIsEditable] = useState(false);

  const ref = doc(FIRESTORE_DB, `A8:42:E3:48:A2:98/${id}`);

  const updateModule = async () => {
    updateDoc(ref, {
      nome: selectedItem.planta,
      umidadeMin: selectedItem.umidadeMin,
    });
    navigation.setOptions({
      headerTitle:
        selectedItem.planta.charAt(0).toUpperCase() +
        selectedItem.planta.slice(1),
      headerBackground: () => <HeaderImg title={selectedItem.planta} />,
    });
  };

  return (
    <>
      <ScrollView>
        <View style={{marginTop: 10}} />
        <View style={styles.infoTextBox}>
          <Picker
            enabled={isEditable}
            style={styles.dropdown}
            selectedValue={selectedItem.planta}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedItem(defaultData[itemIndex]);
            }}>
            {defaultData.map(item => {
              return (
                <Picker.Item
                  key={index}
                  label={
                    item.planta.charAt(0).toUpperCase() + item.planta.slice(1)
                  }
                  value={item.planta}
                  style={{fontSize: 12}}
                />
              );
            })}
          </Picker>
          {isEditable == false ? (
            <Button title={'Editar'} onPress={() => setIsEditable(true)} />
          ) : (
            <Button
              title={'Salvar'}
              onPress={() => {
                setIsEditable(false);
                updateModule();
              }}
            />
          )}
        </View>
        <View style={[styles.info, styles.conf]}>
          <View style={styles.infoTextBox}>
            <Text style={styles.infoText}>
              Umidade mínima: {selectedItem.umidadeMin}%
            </Text>
            <View style={{marginLeft: 10}} />
            <Text style={styles.infoText}>Atual: {umidadeAgora} %</Text>
          </View>
          <View style={styles.infoTextBox}>
            <Text style={styles.infoText}>
              Dias plantado: {diasPlantado} dias
            </Text>
          </View>
        </View>
        <Text style={styles.title}>Sobre</Text>
        <View style={styles.info}>
          <Text style={styles.text}>{selectedItem.sobre}</Text>
        </View>
        <Text style={styles.title}>Dicas</Text>
        <View style={styles.info}>
          <Text style={styles.text}>{selectedItem.dicas}</Text>
        </View>
        <View style={{marginBottom: 30}} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'rgb(60,60,60)',
    width: 300,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'center',
    color: 'rgb(90,90,90)',
  },
  info: {
    width: 380,
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    color: '#fff',
    marginTop: 20,
    marginLeft: 10,
    fontSize: 20,
  },
  text: {
    color: '#fff',
    textAlign: 'justify',
    marginHorizontal: 20,
    marginTop: 10,
  },
  conf: {
    borderColor: 'rgb(100,100,100)',
    borderWidth: 1,
    height: 110,
    borderRadius: 10,
  },
  infoText: {
    color: '#fff',
    marginHorizontal: 10,
    fontSize: 20,
  },
  infoTextBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
});
