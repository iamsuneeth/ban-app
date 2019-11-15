import BottomSheet from "reanimated-bottom-sheet";
import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export class Payments extends React.Component {
  renderContent = () =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
      <View key={value} style={{ height: 200, alignItems: "center" }}>
        <Text>dfsdfsdfsf</Text>
      </View>
    ));

  renderHeader = () => (
    <View
      style={{
        width: 50,
        height: 10,
        backgroundColor: "gray",
        borderRadius: 50,
        alignSelf: "center"
      }}
    ></View>
  );

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          snapPoints={[600, 400, 300]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          initialSnap={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    borderWidth: 1,
    borderColor: "#ccc"
  }
});
