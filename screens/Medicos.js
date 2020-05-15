import React from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { NavigationActions } from 'react-navigation';
import _ from 'lodash'
import {theme, NavBar } from "galio-framework";
import { argonTheme } from "../constants/";
import { Card, Input, Icon} from "../components/";
import { AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
import Fuse from "fuse.js";
class Medicos extends React.Component {
  state = {
    value: {
      respConsulta: []
    },
    ref: {
      respConsulta: []
    }
  }
  animating = true;
  constructor(props) {
    super(props);
    this.timeout = 0;
    AsyncStorage.getItem('@MySuperStore:key').then(
      value => {
        { this.animating = false }
        this.setState({ value: JSON.parse(value), ref: JSON.parse(value) });
        console.log("Data received..");
      },
      error => Alert.alert(error.message)
    )
  }
  searchValues = (obj, code) => {
    if (code) {
      return obj.filter(
        function (data) { return (data.especialidad == code || data.ciudad_prest == code) }
      );
    }
    else
      return obj;
  }
  renderCards = () => {
    var searchResult = this.searchValues(this.state.value.respConsulta, this.especialidad || this.ciudad_prest);
    return(  <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.headers}><SafeAreaView style={styles.container}>
      <FlatList
        data={searchResult}
        renderItem={({ item }) => 
        <TouchableOpacity style={{ paddingHorizontal: theme.SIZES.BASE }}
            onPress={() => {
              const navigateAction = NavigationActions.navigate({
                routeName: 'Profile',
                action: NavigationActions.navigate({ routeName: 'Profile', params: item  })
              })
              this.props.navigation.dispatch(navigateAction)
            }}
          >
            <Card item={item} horizontal navigation={this.props.navigation} />
          </TouchableOpacity>
      }
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView></ScrollView >);
  }
  renderLoading = () => {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator animating={this.animating} size="large" color="#0000ff" />
      </View>
    );
  }
  updateSearch = search => {
    var options = {
      keys: ['prestador_nombre', 'prestador_apellido', 'especialidad']
    }
    this.props.navigation.setParams({ search: search })

    var fuse = new Fuse(this.state.ref.respConsulta, options)
    var searchResult = fuse.search(search);
    
    if (search) {
      if (this.timeout) clearTimeout(this.timeout);
        this.setState({
          value: {
            "respConsulta":
              searchResult ? searchResult : [{}]
          },
          ref: this.state.ref
        });
    }
    else {
      this.setState({
        value: this.state.ref,
        ref: this.state.ref
      });
    }
  };
  renderSearch = () => {
    return (
      <Input
        value ={this.props.navigation.getParam("search")}
        right
        color="black"
        style={styles.search}
        placeholder="Busca por médico, especialista o especialidad"
        placeholderTextColor={'#8898AA'}
        onChangeText={this.updateSearch}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, secondary, ...props } = this.props;
    this.especialidad = this.props.navigation.getParam("especialidad");
    this.ciudad_prest = this.props.navigation.getParam("ciudad_prest");
    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];
    const navbarSecondary = [
      styles.navbarSecondary,
      bgColor && { backgroundColor: bgColor }
    ];
    return (
      <View style={styles.container}>
        <NavBar
          navigation={navigation}
          back={back}
          secondary={secondary}
          title={this.renderSearch()}
          style={secondary ? navbarSecondary : navbarStyles}
          transparent={transparent}
          rightStyle={{ alignItems: 'center' }}
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderCards()}
        {this.renderLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
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
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  navbarSecondary: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  headers: {
    paddingBottom: 100,
  }
});

export default Medicos; 
