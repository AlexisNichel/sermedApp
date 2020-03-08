import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from 'react-navigation';
import _ from 'lodash'
import { theme, NavBar } from "galio-framework";
import { argonTheme } from "../constants/";
import { Card3, Input, Icon } from "../components/";
import { AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
import Fuse from "fuse.js";
class Ciudad extends React.Component {
  state = {
    value: {
      respConsulta: []
    },
    ref: [],
    ciudades:
      []
  }
  animating = true;
  constructor(props) {
    super(props);
    this.timeout = 0;
    AsyncStorage.getItem('@MySuperStore:key').then(
      value => {
        { this.animating = false }
        const result = [];
        const map = new Map();
        for (const item of JSON.parse(value).respConsulta) {
          if (!map.has(item.ciudad_prest)) {
            map.set(item.ciudad_prest, true);    
            result.push({
              ciudad_prest: item.ciudad_prest
            });
          }
        }
        this.setState({ value: JSON.parse(value), ref: result, ciudades: result });
      },
      error => Alert.alert(error.message)
    )
  }
  renderCards = () => {
    return (
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.headers}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.ciudades}
        renderItem={({ item }) =>
        item.ciudad_prest?<TouchableOpacity style={{ paddingHorizontal: theme.SIZES.BASE }}
            onPress={() => {
              const navigateAction = NavigationActions.navigate({
                routeName: 'Medicos',
                action: NavigationActions.navigate({ routeName: 'Medicos', params: { ciudad_prest: item.ciudad_prest, especialidad: "" } })
              })
              this.props.navigation.dispatch(navigateAction)
            }}>
            <Card3 item={item} horizontal navigation={this.props.navigation} />
          </TouchableOpacity>:null
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
      keys: ['ciudad_prest']
    }
    var fuse = new Fuse(this.state.ref, options)
    var searchResult = fuse.search(search);
    if (search) {
        this.setState({
          ciudades:
            searchResult ? searchResult : [{}]
          ,
          ref: this.state.ref
        });
    }
    else {
      this.setState({
        value: this.state.ref,
        ciudades: this.state.ref
      });
    }
  };
  renderSearch = () => {
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="Buscar ciudad"
        placeholderTextColor={'#8898AA'}
        onChangeText={this.updateSearch}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, secondary, ...props } = this.props;
    const { routeName } = navigation.state;
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
export default Ciudad; 
