import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Card } from "../../elements/card/Card";
import { TxnItem } from "./TxnItem";
import Animated from "react-native-reanimated";
import { normalizeHeight, normalize } from "../../../utils/normalize";
import { ITransaction, IAccount } from "bank-core/src/types";
import { Header } from "react-navigation-stack";
import { TxnHeader } from "./TxnHeader";
import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { getTabBarHeight } from "../../common/TabBar";
import { RectButton } from "react-native-gesture-handler";
import {
  withNavigation,
  NavigationInjectedProps,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams
} from "react-navigation";

const renderContent = (
  sections: {
    [key: string]: {
      name: string;
      transactions: any[];
    };
  },
  loading: boolean,
  navigation: NavigationScreenProp<
    NavigationRoute<NavigationParams>,
    NavigationParams
  >
) => (
  <Card style={styles.card}>
    <View
      style={{
        backgroundColor: "#fff",
        height: 30,
        justifyContent: "center"
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
    </View>
    {Object.keys(sections).map(sectionKey => [
      <TxnHeader key={sections[sectionKey].name} data={sections[sectionKey]} />,
      ...sections[sectionKey].transactions.map((item, index) => (
        <TxnItem key={item.id} data={item} index={index} />
      ))
    ])}
    <RectButton
      style={{
        borderColor: "#039be5",
        marginVertical: 10,
        borderWidth: 1,
        width: 150,
        height: 40,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 3
      }}
      onPress={() => {
        navigation.navigate("Transactions", {
          accountId: navigation.state.params.accountId
        });
      }}
    >
      <Text
        style={{
          textAlign: "center",
          textAlignVertical: "center",
          color: "#039be5",
          fontSize: 16
        }}
      >
        More transactions
      </Text>
    </RectButton>
    <ActivityIndicator animating={loading} />
  </Card>
);

type Props = {
  loading: boolean;
  transactions: ITransaction[];
  account: IAccount;
  sheetRef?: React.LegacyRef<BottomSheet>;
  height: number;
};

const topPosition =
  Dimensions.get("window").height -
  Constants.statusBarHeight -
  Header.HEIGHT -
  getBottomSpace();

export const TransactionSheet = withNavigation(
  memo(
    ({
      sheetRef,
      transactions,
      loading,
      height,
      navigation
    }: Props & NavigationInjectedProps) => {
      const sections: {
        [key: string]: {
          name: string;
          transactions: any[];
        };
      } = {};

      transactions.forEach(txn => {
        if (!(txn.date in sections)) {
          sections[txn.date] = {
            name: txn.date,
            transactions: []
          };
        }
        sections[txn.date].transactions.push(txn);
      });
      const finalTopPosition = topPosition - getTabBarHeight();
      return (
        <Animated.View style={{ flex: 1, elevation: 5 }}>
          <BottomSheet
            snapPoints={[
              finalTopPosition,
              finalTopPosition - height / 2,
              finalTopPosition - height
            ]}
            renderContent={() => renderContent(sections, loading, navigation)}
            initialSnap={2}
            ref={sheetRef}
            enabledContentTapInteraction={false}
          />
        </Animated.View>
      );
    }
  )
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "99%"
  },
  txnList: {
    marginTop: 10
  },
  txnListHeader: {
    paddingLeft: 10,
    fontSize: normalize(20)
  }
});
