import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {defaultData} from '../data/datafile';

export function ModuleCard(props) {
  let cover = defaultData.filter(obj => {
    return obj.planta == props.data.nome;
  });

  let timestamp = new Object(props.data.diaPlantio);
  const diasPlantado = Math.ceil(
    (new Date().getTime() - timestamp.seconds * 1000) / 86400000,
  );

  const image = cover[0].capa;

  return (
    <>
      <View>
        <View>
          <TouchableOpacity
            onPress={props.onPress}
            style={[styles.card, styles.base]}>
            <ImageBackground
              source={image}
              resizeMode="cover"
              imageStyle={styles.base}>
              <View style={[styles.overlay, styles.base]}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.title}>
                    {props.data.nome.toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text style={styles.body}>
                    Umidade: {props.data.umidadeAgora}%
                  </Text>
                  <Text style={styles.body}>
                    Dias Plantado: {!props.data.diaPlantio ? '0' : diasPlantado}{' '}
                    {diasPlantado == '1' ? 'dia' : 'dias'}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 350,
    height: 150,
    alignSelf: 'center',
    borderRadius: 10,
  },
  card: {
    marginTop: 15,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowRadius: 10,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.80)',
  },
  title: {
    color: '#fff',
    fontSize: 25,
    marginTop: 15,
    marginLeft: 25,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  sub: {
    color: 'rgb(180,180,180)',
    marginTop: 30,
    marginLeft: 10,
    fontSize: 10,
  },
  body: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    marginLeft: 25,
  },
});
