import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { Block } from "galio-framework";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Ciudad from "../screens/Ciudad";
import Medicos from "../screens/Medicos";
import Location from "../screens/Location";
import Especialidad from "../screens/Especialidad";
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";
import Header from "../components/Header";
const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: { 
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  }, 
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });
    const scaleWithOpacity = { opacity };
    const screenName = "Search";
    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});
const CiudadStack = createStackNavigator({
  Ciudad: {
    screen: Ciudad,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Ciudad" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});
const EspecialidadStack = createStackNavigator({
  Especialidad: {
    screen: Especialidad,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Especialidad" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});
const LocationStack = createStackNavigator({
  Location: {
    screen: Location,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Localización" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});
const MedicosStack = createStackNavigator({
  Medicos: {
    screen: Medicos,
    navigationOptions: ({ navigation }) => ({
      header: <Header search={false} title="Médicos" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
  transitionConfig
});
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="Inicio" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header left={<Block />} white transparent title="" navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);
const AppStack = createDrawerNavigator(
  { 
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} title="Inicio" />
        )
      })
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
         null
        )
      })
    },
    Medicos: {
      screen: MedicosStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} search screen="Medicos" title="Médicos" />
        )
      })
    },
    Especialidad: {
      screen: EspecialidadStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Especialidades" title="Especialidades" />
        )
      })
    },
    Ciudad: {
      screen: CiudadStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Ciudades" title="Ciudades" />
        )
      })
    },
    Location: {
      screen: LocationStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Location" title="Localización" />
        )
      })
    }
  },
  Menu
);
const AppContainer = createAppContainer(AppStack);
export default AppContainer;
