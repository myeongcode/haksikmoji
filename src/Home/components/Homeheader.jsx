import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';

const anounceList = [
  '식자재 수급상황에 따라 메뉴가 변경될 수있어요.',
  '매주 일요일에 메뉴가 업데이트 돼요.',
];

const messageList = [
  '오늘은 왠지\n예감이 좋은데요?',
  '오늘 수업도\n화이팅하세요!',
  '주말이 코앞이에요!\n조금만 더 힘내요!',
  '활기찬 한 주의 시작!\n화이팅이에요!',
  '끼니는 거르지 말고\n꼭꼭 챙겨먹기!',
  '모든 일이\n잘 풀릴거에요!',
];

function Homeheader(props) {
  const [isAnimatingRefresh, setAnimatingRefresh] = useState(false);
  const rotationValue = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRandomNumber, setRandomNumber] = useState(0);

  const rotate = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  function handlePress() {
    if (!isAnimatingRefresh) {
      setAnimatingRefresh(true);
      props.setRefresh(true);
      setRandomNumber(getRandomMessage(0, messageList.length - 1));
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bezier(0.5, 0.0, 0.5, 1.0),
        useNativeDriver: true,
      }).start(() => {
        setAnimatingRefresh(false);
        rotationValue.setValue(0);
      });
    }
  }

  function getRandomMessage(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    while (randomNumber === isRandomNumber) {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return randomNumber;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % anounceList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.headerReloadContainer}>
        <Pressable onPress={handlePress}>
          <Animated.View style={{transform: [{rotate}]}}>
            <FAIcon name="refresh" color="white" size={28} />
          </Animated.View>
        </Pressable>
      </View>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerText}>{messageList[isRandomNumber]}</Text>
      </View>
      <View style={styles.announceArea}>
        <Image source={require('../../../static/images/anounce.png')} />
        <Text style={styles.anounceText}>{anounceList[currentIndex]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#21252C',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerReloadContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  headerTitleContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  headerText: {
    color: '#FFF',
    fontSize: 28,
  },
  announceArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    gap: 10,
  },
  anounceText: {
    fontSize: 14,
    color: '#21252C',
    fontWeight: '600',
  },
});

export default Homeheader;
