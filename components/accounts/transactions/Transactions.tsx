import React, { memo, useMemo, useState, useRef, useEffect } from "react";
import {
  SectionList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  GestureResponderEvent
} from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { TxnHeader } from "./TxnHeader";
import { TxnItem } from "./TxnItem";
import { Card } from "../../elements/card/Card";
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
  FlatList
} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { panGestureHandler, onGestureEvent, spring } from "react-native-redash";
import { getTabBarHeight } from "../../common/TabBar";
import Constants from "expo-constants";

dayjs.extend(advancedFormat);

const transactions = [
  {
    id: "354erere",
    referenceNo: "GHB0034343488",
    date: "2019-11-11",
    description: "some where you made payment",
    merchant: "Travel London",
    amount: 1.5,
    currency: "INR",
    merchantId: "tfl",
    category: "transport"
  },
  {
    id: "232323sds",
    referenceNo: "GHB0034567488",
    date: "2019-09-05",
    merchant: "Travel London",
    amount: 1.7,
    currency: "GBP",
    merchantId: "tfl",
    category: "transport"
  },
  {
    id: "hjhj54545",
    referenceNo: "BNJ00GB5689089",
    date: "2019-09-04",
    merchant: "Asda",
    amount: 45.5,
    currency: "GBP",
    merchantId: "asda",
    category: "groceries"
  },
  {
    id: "fgff54544",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "rtht3434",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "fgdsff54544",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "jgsdf4545",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "tgfgdfgfg",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "45dfdsdsdssfsd",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "fgdfgdfsdd",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "45dfdssdsfgfsd",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "dssfdsf",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  }
];

const {
  Value,
  event,
  add,
  set,
  block,
  cond,
  eq,
  lessThan,
  multiply,
  stopClock,
  Clock,
  sub,
  defined,
  clockRunning,
  startClock,
  timing,
  Extrapolate,
  interpolate
} = Animated;

const getSection = (date: string, txns: typeof transactions) => {
  const currentDate = dayjs(date);
  const isToday = currentDate.isSame(dayjs().startOf("day"));
  const format =
    currentDate.get("year") === dayjs().get("year")
      ? "dddd, Do MMMM"
      : "dddd, Do MMMM YYYY";
  return {
    title: isToday ? "Today" : currentDate.format(format),
    data: txns
  };
};
const TOSS_SEC = 0.2;
const { height: screenheight } = Dimensions.get("window");
export const Transaction = memo(() => {
  let groupedTransactions: { [key: string]: any } = {};
  transactions.forEach(txn => {
    if (!(txn.date in groupedTransactions)) {
      groupedTransactions[txn.date] = [];
    }
    groupedTransactions[txn.date].push(txn);
  });
  const [translateY] = useState(new Value(0));
  const [dragY] = useState(new Value(0));
  const [prevDragY] = useState(new Value(0));
  const [dragVY] = useState(new Value(0));
  const [stateVar] = useState(new Value(0));
  const [clock] = useState(new Clock());
  const panRef = useRef();
  const scrollRef = useRef();
  const snapPoint = cond(
    lessThan(add(translateY, multiply(TOSS_SEC, dragVY)), 0),
    -260,
    0
  );

  const height = interpolate(translateY, {
    inputRange: [-260, 0],
    outputRange: [
      0.85 * (screenheight - getTabBarHeight() - getBottomSpace()),
      0.5 * (screenheight - getTabBarHeight() - getBottomSpace())
    ],
    extrapolate: Extrapolate.CLAMP
  });

  const innerHeight = interpolate(height, {
    inputRange: [
      0.5 * (screenheight - getTabBarHeight() - getBottomSpace()),
      0.85 * (screenheight - getTabBarHeight() - getBottomSpace())
    ],
    outputRange: [0, 250]
  });

  const handlePan = event([
    {
      nativeEvent: ({ translationY, velocityY, state }) =>
        block([
          set(dragY, translationY),
          set(stateVar, state),
          set(dragVY, velocityY),
          cond(
            eq(stateVar, State.ACTIVE),
            [
              stopClock(clock),
              set(translateY, add(translateY, sub(dragY, prevDragY))),
              set(prevDragY, dragY)
            ],
            [
              set(prevDragY, 0),
              set(
                translateY,
                cond(
                  defined(translateY),
                  spring({
                    clock,
                    velocity: dragVY,

                    from: translateY,
                    to: snapPoint
                  }),
                  0
                )
              )
            ]
          )
        ])
    }
  ]);

  return (
    <Animated.View
      style={[
        styles.listContainer,
        {
          transform: [{ translateY: translateY as any }],
          height,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10
        }
      ]}
    >
      <View
        style={{
          height: 30
        }}
      >
        <PanGestureHandler
          onGestureEvent={handlePan}
          onHandlerStateChange={handlePan}
          simultaneousHandlers={[scrollRef, panRef]}
          ref={panRef}
        >
          <Animated.View
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              flex: 1,
              alignItems: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <View
              style={{
                width: 50,
                height: 5,
                backgroundColor: "#ccc",
                borderRadius: 50,
                alignSelf: "center"
              }}
            ></View>
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Animated.View
        style={{ backgroundColor: "tomato", height: innerHeight }}
      ></Animated.View>
      <Card style={styles.card}>
        <SectionList
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          style={styles.txnList}
          stickySectionHeadersEnabled
          sections={[
            ...Object.keys(groupedTransactions).map(key =>
              getSection(key, groupedTransactions[key])
            )
          ]}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TxnItem data={item} index={index} />
          )}
        />
      </Card>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  listContainer: {
    elevation: 5,
    backgroundColor: "#fff",
    shadowOpacity: 1.0,
    shadowColor: "#ccc"
  },
  card: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    elevation: 0,
    shadowOpacity: 0
  },
  txnList: {
    marginTop: 10
  },
  txnListHeader: {
    paddingLeft: 10,
    fontSize: 20
  }
});
