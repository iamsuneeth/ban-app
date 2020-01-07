import React from "react";
import { View, TextInput, SectionList } from "react-native";
import { PaymentItem } from "./PaymentItem";
import { PaymentHeader } from "./PaymentHeader";
import { normalize } from "../../../utils/normalize";

export const FuturePayments = () => {
  let payments = [];
  let grouperPayments: { [key: string]: any } = {};
  payments.forEach(txn => {
    if (!(txn.date in grouperPayments)) {
      grouperPayments[txn.date] = [];
    }
    grouperPayments[txn.date].push(txn);
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1
        }}
      >
        <TextInput
          placeholder={"Filter.."}
          autoCapitalize={"none"}
          autoCorrect={false}
          style={{
            borderColor: "#ccc",
            borderWidth: normalize(1),
            height: normalize(40),
            borderRadius: 3,
            paddingHorizontal: normalize(10),
            margin: normalize(10)
          }}
        />
        <SectionList
          stickySectionHeadersEnabled
          sections={[
            ...Object.keys(grouperPayments).map(key => ({
              name: key,
              data: grouperPayments[key]
            }))
          ]}
          renderSectionHeader={({ section }) => (
            <PaymentHeader data={section as any} />
          )}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <PaymentItem data={item} index={index} />
          )}
        />
      </View>
    </View>
  );
};
