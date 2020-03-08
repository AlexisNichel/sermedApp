import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Linking,
  View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import call from 'react-native-phone-call'
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { createOpenLink } from 'react-native-open-maps';

import { NavigationActions } from 'react-navigation';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
class Profile extends React.Component {
  render() {
    const prestador_nombre = this.props.navigation.getParam("prestador_nombre") ? this.props.navigation.getParam("prestador_nombre") : "";
    const prestador_apellido = this.props.navigation.getParam("prestador_apellido") ? this.props.navigation.getParam("prestador_apellido") : "";
    const direccion_prestador = this.props.navigation.getParam("direccion_prestador") ? this.props.navigation.getParam("direccion_prestador") : "";
    const especialidad = this.props.navigation.getParam("especialidad") ? this.props.navigation.getParam("especialidad") : "";
    const institucion_prestadora = this.props.navigation.getParam("institucion_prestadora") ? this.props.navigation.getParam("institucion_prestadora") : "";
    const ciudad_prest = this.props.navigation.getParam("ciudad_prest") ? this.props.navigation.getParam("ciudad_prest") : "";
    const direccion_institucion = this.props.navigation.getParam("direccion_institucion") ? this.props.navigation.getParam("direccion_institucion") : "";
    const tel_prest = this.props.navigation.getParam("tel_prest") ? this.props.navigation.getParam("tel_prest") : "Sin Número";
    const longitud_ins = this.props.navigation.getParam("longitud_ins") ? this.props.navigation.getParam("longitud_ins") : 0;
    const latitud_ins = this.props.navigation.getParam("latitud_ins") ? this.props.navigation.getParam("latitud_ins") : 0;
    return (
      <View style={styles.container}>
        <Block flex style={styles.profile}>
          <Block flex>
            <ImageBackground
              source={Images.ProfileBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width, marginTop: '25%' }}
              >
                <Block flex style={styles.profileCard}>
                  <Block middle style={styles.avatarContainer}>
                    <Image
                      source={Images.Medico2}
                      style={styles.avatar}
                    />
                  </Block>
                  <Block style={styles.info}>
                    <Block
                      middle
                      row
                      space="evenly"
                      style={{ marginTop: 20, paddingBottom: 24 }}
                    >
                      <Button
                        small
                        onPress={() => {
                          var frg = tel_prest.split("/");
                          var result = frg[0];
                          const args = {
                            number: result,
                            prompt: false
                          }
                          call(args).catch(console.error)
                        }}
                        style={{ backgroundColor: argonTheme.COLORS.INFO }}
                      >
                        Llamar
                    </Button>
                
                    </Block>
                    <Block row space="between">
                      <Block middle>
                        <Text
                          bold
                          color="#525F7F"
                          size={12}
                          style={{ marginBottom: 4 }}
                        >
                        </Text>
                        <Text size={12}></Text>
                      </Block>
                      <Block middle>
                        <Text
                          bold
                          size={12}
                          color="#525F7F"
                          style={{ marginBottom: 4 }}
                        >
                          {tel_prest}
                        </Text>
                        <Text size={12}>Tel.</Text>
                      </Block>
                      <Block middle>
                        <Text
                          bold
                          color="#525F7F"
                          size={12}
                          style={{ marginBottom: 4 }}
                        >
                        </Text>
                        <Text size={12}></Text>
                      </Block>
                    </Block>
                  </Block>
                  <Block flex>
                    <Block middle style={styles.nameInfo}>
                      <Text bold size={16} color="#32325D">
                        {prestador_nombre} {prestador_apellido}
                      </Text>
                      <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                        {especialidad}
                      </Text>
                      <Text size={12} color="#32325D" style={{ marginTop: 10 }}>
                        {direccion_prestador}
                      </Text>
                      <Text size={12} color="#32325D" style={{ marginTop: 10 }}>
                        {ciudad_prest}
                      </Text>
                    </Block>
                    <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                      <Block style={styles.divider} />
                    </Block>
                    <Block middle>
                      <Text
                        size={16}
                        color="#525F7F"
                        style={{ textAlign: "center" }}
                      >
                        {institucion_prestadora}
                      </Text>
                      <Text size={12} color="#32325D" style={{ marginTop: 10 }}>
                        {direccion_institucion}
                      </Text>
                      { /*<Button
                        color="transparent"
                        textStyle={{
                          color: "#233DD2",
                          fontWeight: "500",
                          fontSize: 16
                        }}
                      >
                        Ver otros sanatorios
                      </Button>*/ }
                    </Block>
                    <Block
                      row
                      style={{ paddingVertical: 14, alignItems: "baseline" }}
                    >
                    </Block>
                    <Block
                      row
                      style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                    >
                    </Block>
                    <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                      <Block row space="between" style={{ flexWrap: "wrap" }}>
                        <MapView
                          style={styles.map}
                          pitchEnabled={true} rotateEnabled={true} zoomEnabled={true} scrollEnabled={true}
                          initialRegion={{
                            longitude: longitud_ins ? longitud_ins : 0,
                            latitude: latitud_ins ? latitud_ins : 0,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                          }}
                          onPress={() => {
                            if (Platform.OS === 'ios') 
                              Linking.openURL('maps://app?daddr=' + latitud_ins + '+' + longitud_ins);
                            else
                              Linking.openURL('google.navigation:q=' + latitud_ins + '+' + longitud_ins );
                          }}
                        >
                          <MapView.Marker
                            coordinate={{
                              longitude: longitud_ins,
                              latitude: latitud_ins,
                            }}
                            title={prestador_nombre + " " + prestador_apellido}
                            description={direccion_institucion}
                          />
                        </MapView>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </ScrollView>
            </ImageBackground>
          </Block>
        </Block>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  map: {
    width: width / 1.18,
    height: height / 3,
    zIndex: 2,
    marginBottom: 30
  }
});

export default Profile;
