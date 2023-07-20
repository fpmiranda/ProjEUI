import {ImageBackground, View, StatusBar} from 'react-native';
import {defaultData} from '../data/datafile';

export function HeaderImg({title}) {
  let card;

  defaultData.map(item => {
    if (item.planta == title.toLowerCase()) {
      card = item.capa;
    }
  });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={{
          width: '100%',
          height: 100,
        }}
        source={card}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.55)',
            width: '100%',
            height: 100,
          }}
        />
      </ImageBackground>
    </>
  );
}
