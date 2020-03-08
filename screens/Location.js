import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
//galio
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Block, Text, theme } from "galio-framework";
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card, Input, Icon, Header } from "../components/";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class Location extends React.Component {
  state = {
    value: {
      respConsulta: []
    },
    location :{
      coords :{}
    }
  }

  animating = true;
  constructor(props) {
    super(props);
    this.timeout = 0;
    AsyncStorage.getItem('@MySuperStore:key').then(
      value => {
        { this.animating = false }
        this.setState({ value: JSON.parse(value) });
        console.log(value);
        console.log("Data received..");
      },
      error => Alert.alert(error.message)
    )
  }


  renderProduct = (item, index) => {
    const { navigation } = this.props;
    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        onPress={() => navigation.navigate("Pro", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productPrice}
            >
              {item.price}
            </Text>
            <Text center size={34}>
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.description}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };
  renderSearch = () => {
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Busca por médico, especialista o especialidad"
        placeholderTextColor={'#8898AA'}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }
  renderCards = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.headers}>

      </ScrollView>
    )
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        this.setState({ location: location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
   {this.findCoordinates()}
   console.log(this.state.location)
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          pitchEnabled={true} rotateEnabled={true} zoomEnabled={true} scrollEnabled={true}
          initialRegion={{
            longitude: -54.6111107,
            latitude: -25.5097198,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.value.respConsulta.map((item, i) => (
            <MapView.Marker
              key={i}
              coordinate={{
                longitude: item.longitud_ins ? item.longitud_ins : 0,
                latitude: item.latitud_ins ? item.latitud_ins : 0,
              }}
              title={item.prestador_nombre + " " + item.prestador_apellido}
              description={item.direccion_prestador}
            />
          ))}
        </MapView>
      </View>
    );
  }

  renders() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  title2: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 3,
    color: argonTheme.COLORS.HEADER
  },
  map: {
    width: width,
    height: height,
    zIndex: 2,
  }
});

export default Location;
