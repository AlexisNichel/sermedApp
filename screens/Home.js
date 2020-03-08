import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Block, Button as GaButton, theme } from "galio-framework";
import mock from '../constants/mock';
import { AsyncStorage, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation';
const { width } = Dimensions.get('screen');
import Carousel, { Pagination } from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import { argonTheme, tabs, Images } from "../constants/";
import { Button, Select, Icon, Input, Header, Switch, Card, Card2, Card5 } from "../components/";
import ActionButton from 'react-native-action-button';
import call from 'react-native-phone-call'

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(90);

class Home extends React.Component {
  constructor(props) {
    super(props);
    try {
      fetch('http://mail.sermed.com.py:8081/Infornet/ws/invoices/consulta')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Data ok..");
          AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(responseJson));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      // Error saving data
    }
  }

  renderMenus = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.headers}>
        <Text bold size={22} style={styles.title2} >
          Noticias
        </Text>
        <Block center style={styles.home}>
          <Carousel
            layout={'tinder'}
            autoplay={true}
            enableMomentum={false}
            lockScrollWhileSnapping={true}
            hasParallaxImages={true}
            ref={(c) => { this._carousel = c; }}
            data={mock}
            hasParallaxImages={true}
            renderItem={this._renderItem}
            sliderWidth={slideWidth}
            itemWidth={slideWidth}
            onSnapToItem={(index) => this.setState({ activeSlide: index })}
          />

        </Block>
        <Text bold size={22} style={styles.title}>
          Guía Médica
        </Text>

        <TouchableOpacity
          onPress={() => {
            const navigateAction = NavigationActions.navigate({
              routeName: 'Medicos',
              action: NavigationActions.navigate({ routeName: 'Medicos', params: { ciudad_prest: "", especialidad: "" } })
            })
            this.props.navigation.dispatch(navigateAction)
          }}>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Card5 item={{ imagen: Images.Medico, title: "Médicos", subtitle: "Buscar médico por nombre, apellido o especialidad" }} horizontal navigation={this.props.navigation} />
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Especialidad')}>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Card5 item={{ imagen: Images.Medical, title: "Especialidades", subtitle: "Buscar por especialidad" }} horizontal navigation={this.props.navigation} />
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Ciudad')}>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Card5 item={{ imagen: Images.Ciudad, title: "Ciudades", subtitle: "Buscar médicos por ciudad" }} horizontal navigation={this.props.navigation} />
          </Block>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')}>
          <Block style={{ marginBottom: theme.SIZES.BASE }}>
            <Card5 item={{ imagen: Images.Location, title: "Localización", subtitle: "Buscar médicos cercanos a tu ubicación actual" }} horizontal navigation={this.props.navigation} />
          </Block>
        </TouchableOpacity>
      </ScrollView>
    )
  }


  _renderItem = ({ item, index }) => {
    return (
      <Card2 item={mock[index]} full />
    );
  }

  render() {
    return (

      <Block flex center style={styles.home}>

        {this.renderMenus()}
        <ActionButton offsetY={25} offsetX={10} size={60} buttonColor={theme.COLORS.FACEBOOK} renderIcon={active => <Icon name="message" family="other" style={styles.actionButtonIcon} />}>>
          <ActionButton.Item buttonColor='#9b59b6' title="Ambulancia" onPress={() => {
            const args = {
              number: '09734543655',
              prompt: false
            }
            call(args).catch(console.error)

          }}>
            <Icon size={16} color={theme.COLORS.MUTED} name="bell" family="ArgonExtra" style={styles.actionButtonIcon}/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Llamanos" onPress={() => {
            const args = {
              number: '0985375700',
              prompt: false
            }
            call(args).catch(console.error)
          }}>
            <Icon family="other" name="call" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Ir a web" onPress={() => {
            Linking.openURL('http://sermed.com.py/')
          }}>
            <Icon family="other" name="web" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 25,
    color: 'white',
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  headers: {
    width: width
  },

  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 3,
    color: argonTheme.COLORS.HEADER
  },
  title2: {
    paddingBottom: 0,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  }

});

export default Home;
