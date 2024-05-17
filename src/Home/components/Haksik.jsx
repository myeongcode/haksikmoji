import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

function Haksik(props) {
  const [isMenuCategory, setMenuCategory] = useState(0);

  function renderHaksikMenuItems(day) {
    if (!(props.data[day] === undefined) && !(props.data[day] === '')) {
      return props.data[day].map((menu, idx) => {
        const key = Object.keys(menu)[0];
        const menuName = Object.values(menu)[0];
        return (
          <View key={idx} style={styles.menuBar}>
            <Text style={styles.menuTitle}>{key}메뉴</Text>
            <Text style={styles.menuName}>{menuName}</Text>
          </View>
        );
      });
    } else if (day === 'SAT') {
      return (
        <View style={styles.weekendBox}>
          <Image
            style={styles.weekendImg}
            source={require('../../../static/images/saturday-img.png')}
          />
          <Text style={[styles.weekendText, {paddingTop: 0}]}>
            <Text style={{fontWeight: '700', color: '#2355B1'}}>토요일</Text>은
            유동적인 메뉴변경으로{'\n'}파악하기 어려워요
          </Text>
        </View>
      );
    } else if (day === 'SUN') {
      return (
        <View style={styles.weekendBox}>
          <Image
            style={styles.weekendImg}
            source={require('../../../static/images/sunday-img.png')}
          />
          <Text style={[styles.weekendText, {paddingTop: 20}]}>
            <Text style={{fontWeight: '700', color: '#EC5F59'}}>일요일</Text>은
            운영하지 않아요
          </Text>
        </View>
      );
    }
    return null;
  }

  return (
    <View style={styles.haksikMenuContainer}>
      <View style={styles.haksikHeader}>
        <Text style={styles.haksikTitle}>카페테리아 현</Text>
        <View style={styles.haksikStatus}>
          <Text style={styles.haksikStatusText}>영업중</Text>
        </View>
      </View>
      <View style={styles.haksikDateContainer}>
        <Text style={styles.haksikDate}>2024.3.4</Text>
      </View>
      <View style={styles.haksikWeekContainer}>
        {props.weekList.map((weekData, idx) => {
          return (
            <Pressable
              key={idx}
              style={[
                styles.haksikWeekBtn,
                {borderBottomWidth: weekData.week === props.week ? 2 : 0},
              ]}
              onPress={() => {
                props.setWeek(weekData.week);
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color:
                    weekData.week === props.week
                      ? '#133B98'
                      : weekData.week === 'SUN'
                      ? '#EC5F59'
                      : weekData.week === 'SAT'
                      ? '#0053ED'
                      : '#333D4B',
                  fontWeight: weekData.week === props.week ? '900' : '500',
                }}>
                {weekData.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.hairline} />
      <View style={styles.menuBox}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            paddingVertical: 10,
          }}>
          <Pressable
            style={{
              flex: 1,
              borderWidth: 0.3,
              backgroundColor: isMenuCategory === 0 ? '#133B98' : '#FFFFFF',
              borderColor: isMenuCategory === 0 ? '' : '#BBBBBBC6',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              setMenuCategory(0);
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: isMenuCategory === 0 ? '900' : '300',
                color: isMenuCategory === 0 ? '#FFFFFF' : '#BBBBBBC6',
              }}>
              오늘의 특식
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              borderWidth: 0.3,
              backgroundColor: isMenuCategory === 1 ? '#133B98' : '#FFFFFF',
              borderColor: isMenuCategory === 1 ? '' : '#BBBBBBC6',
              alignItems: 'center',
              paddingVertical: 10,
              borderRadius: 50,
            }}
            onPress={() => {
              setMenuCategory(1);
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: isMenuCategory === 1 ? '900' : '300',
                color: isMenuCategory === 1 ? '#FFFFFF' : '#BBBBBBC6',
              }}>
              천원의 아침밥
            </Text>
          </Pressable>
        </View>
        {isMenuCategory === 0
          ? props.data
            ? renderHaksikMenuItems(props.week)
            : null
          : null}
        {}
      </View>
    </View>
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
  haksikHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  haksikDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 30,
  },
  haksikDate: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333D4B',
  },
  haksikWeekContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  haksikWeekBtn: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomColor: '#133B98',
  },
  hairline: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuBox: {
    paddingHorizontal: 10,
    gap: 20,
    paddingTop: 20,
  },
  menuBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    flex: 2,
    fontSize: 16,
    fontWeight: '600',
    color: '#333D4B',
  },
  menuName: {
    flex: 5,
    fontSize: 16,
    color: '#333D4B',
  },
  weekendBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  weekendImg: {
    width: 50,
    resizeMode: 'contain',
  },
  weekendText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333D4B',
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

export default Haksik;
