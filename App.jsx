import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/Home';
import Amenity from './src/Amenity';
import Question from './src/Question';
import Website from './src/Website';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import F6Icon from 'react-native-vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
        },
      }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            height: Platform.OS === 'ios' ? 90 : 80,
            paddingBottom: Platform.OS === 'ios' ? 30 : 15,
            paddingHorizontal: 0,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarActiveTintColor: '#003876',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '홈',
            tabBarIcon: ({color, size}) => {
              return <EIcon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Amenity"
          component={Amenity}
          options={{
            tabBarLabel: '편의시설',
            tabBarIcon: ({color, size}) => {
              return <MCIcon name="coffee" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Website"
          component={Website}
          options={{
            tabBarLabel: '웹사이트',
            tabBarIcon: ({color, size}) => {
              return <F6Icon name="location-arrow" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Question"
          component={Question}
          options={{
            tabBarLabel: '문의하기',
            tabBarIcon: ({color, size}) => {
              return <IIcon name="chatbox" size={size - 2} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
