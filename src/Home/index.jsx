import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import getAPIHost from '../../config/networking';
import Homeheader from './components/Homeheader';
import Haksik from './components/Haksik';
import mockData from '../Data/mockData.json';

const weekList = [
  {
    week: 'SUN',
    name: '일',
  },
  {
    week: 'MON',
    name: '월',
  },
  {
    week: 'TUE',
    name: '화',
  },
  {
    week: 'WED',
    name: '수',
  },
  {
    week: 'THU',
    name: '목',
  },
  {
    week: 'FRI',
    name: '금',
  },
  {
    week: 'SAT',
    name: '토',
  },
];

function Home() {
  const [isRefresh, setRefresh] = useState(false);
  const [data, setData] = useState({});
  const [week, setWeek] = useState('MON');
  const [date, setDate] = useState();

  const getMenu = async () => {
    try {
      // const url = getAPIHost();
      // const response = await fetch(`${url}/api/menu`);
      // const json = await response.json();
      // setData(json.menu);
      setData(mockData.menu);
    } catch (error) {
      console.error(error);
    } finally {
      setRefresh(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMenu();
    };
    fetchData();
    const localDate = new Date();
    const year = localDate.getFullYear();
    const month = localDate.getMonth() + 1;
    const day = localDate.getDate();

    console.log(year, month, day);
  }, [isRefresh]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Homeheader setRefresh={setRefresh} />
      <Haksik weekList={weekList} setWeek={setWeek} week={week} data={data} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F5F5',
  },
  haksikMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  haksikTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingRight: 10,
    color: '#333D4B',
  },
  haksikStatus: {
    backgroundColor: '#34C759',
    paddingVertical: 4,
    paddingHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 30,
  },
  haksikStatusText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default Home;
