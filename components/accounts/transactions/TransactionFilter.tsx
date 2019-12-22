import React, { useRef, useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../../elements/card/Card";
import {
  ScrollView,
  Switch,
  BorderlessButton
} from "react-native-gesture-handler";
import { RectButton } from "react-native-gesture-handler";

import BottomSheet from "reanimated-bottom-sheet";
import {
  TransactionType,
  IFilterTransactionPayload
} from "bank-core/src/types";
import dayjs from "dayjs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
import { DateTimePicker } from "../../elements/date-picker/DateTimePicker";

type FilterProps = {
  lastFetched?: string;
  clearFilters: Function;
  applyFilter: (props: IFilterTransactionPayload) => void;
  openDate: dayjs.Dayjs;
};

const filters = [
  {
    key: "today",
    text: "Today",
    start: dayjs().startOf("day"),
    end: dayjs().startOf("day")
  },
  {
    key: "yesterday",
    text: "Yesterday",
    start: dayjs()
      .add(-1, "day")
      .startOf("day"),
    end: dayjs()
      .add(-1, "day")
      .startOf("day")
  },
  {
    key: "week",
    text: "This week",
    start: dayjs().startOf("week"),
    end: dayjs().startOf("day")
  },
  {
    key: "month",
    text: "This month",
    start: dayjs()
      .startOf("day")
      .startOf("month"),
    end: dayjs().startOf("date")
  },
  {
    key: "prevMonth",
    text: "Last month",
    start: dayjs()
      .add(-1, "month")
      .startOf("month"),
    end: dayjs()
      .add(-1, "month")
      .endOf("month")
      .startOf("day")
  }
];

const FilterContent = ({
  state,
  setState,
  onTxnTypeSelected,
  handleClearFilter,
  handleApplyFilter,
  openDate,
  themeColors,
  stateRef
}) => (
  <Card style={styles.card}>
    <ScrollView
      style={{ width: "100%", marginBottom: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18 }}>Dates</Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text>Start</Text>
              <DateTimePicker
                date={state.startDate}
                minimumDate={openDate.toDate()}
                maximumDate={dayjs().toDate()}
                onConfirm={date => setState({ startDate: date })}
              />
            </View>
            <View>
              <Text>End</Text>
              <DateTimePicker
                date={state.endDate}
                minimumDate={openDate.toDate()}
                maximumDate={dayjs().toDate()}
                onConfirm={date => setState({ endDate: date })}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 10
            }}
          >
            {filters.map(filter => {
              const isSelected =
                filter.start.isSame(dayjs(state.startDate)) &&
                filter.end.isSame(dayjs(state.endDate));
              return (
                <RectButton
                  key={filter.key}
                  style={{
                    borderColor: themeColors.primary,
                    margin: 5,
                    borderWidth: 1,
                    padding: 10,
                    minWidth: 100,
                    borderRadius: 3,
                    ...(isSelected && { backgroundColor: themeColors.primary })
                  }}
                  onPress={() =>
                    setState({
                      startDate: filter.start.toDate(),
                      endDate: filter.end.toDate()
                    })
                  }
                >
                  <Text
                    style={[
                      { color: themeColors.primary, textAlign: "center" },
                      isSelected && { color: "#fff" }
                    ]}
                  >
                    {filter.text}
                  </Text>
                </RectButton>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Type</Text>
        <View>
          <View
            key={"all"}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Switch
              value={state.txnTypes.length === 0}
              onValueChange={value => onTxnTypeSelected("all", value)}
              trackColor={{
                false: themeColors.gray,
                true: themeColors.primary
              }}
            />
            <Text style={{ marginLeft: 10, marginVertical: 10 }}>All</Text>
          </View>
          {Object.entries(TransactionType).map(([key, value]) => (
            <View
              key={key}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Switch
                value={state.txnTypes.includes(value)}
                trackColor={{
                  false: themeColors.gray,
                  true: themeColors.primary
                }}
                onValueChange={boolValue => onTxnTypeSelected(value, boolValue)}
              />
              <Text style={{ marginLeft: 10, marginVertical: 10 }}>
                {value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    <View
      style={{
        width: "100%",
        borderTopWidth: 1,
        flexDirection: "row",
        paddingTop: 5,
        borderColor: "#ccc"
      }}
    >
      <RectButton
        style={{
          backgroundColor: themeColors.primary,
          paddingHorizontal: 5,
          paddingVertical: 10,
          flex: 2,
          margin: 10,
          bottom: 10,
          borderRadius: 3
        }}
        onPress={handleApplyFilter}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          Apply filters
        </Text>
      </RectButton>
      <RectButton
        style={{
          borderColor: themeColors.primary,
          borderWidth: 1,
          paddingHorizontal: 5,
          paddingVertical: 10,
          flex: 1,
          margin: 10,
          bottom: 10,
          borderRadius: 3
        }}
        onPress={handleClearFilter}
      >
        <Text style={{ textAlign: "center", color: themeColors.primary }}>
          Clear
        </Text>
      </RectButton>
    </View>
  </Card>
);

interface ITransactionFilterState {
  filterOpen: boolean;
  dateSet: boolean;
  startDate: Date;
  endDate: Date;
  txnTypes: Array<TransactionType>;
  fromAmount: number;
  toAmount: number;
  filterSet: boolean;
}

export const TransactionFilter = ({
  lastFetched,
  applyFilter,
  clearFilters,
  openDate
}: FilterProps) => {
  const filterRef: React.LegacyRef<BottomSheet> = useRef();
  const stateRef = useRef("initial");
  const themeColors = ThemeColors[useTheme()];
  const [state, setState]: [
    ITransactionFilterState,
    React.Dispatch<any>
  ] = useReducer((oldState, newState) => ({ ...oldState, ...newState }), {
    dateFilterOpen: false,
    filterOpen: false,
    dateSet: false,
    endDate: dayjs()
      .startOf("date")
      .toDate(),
    startDate: lastFetched
      ? dayjs(lastFetched).toDate()
      : dayjs()
          .startOf("date")
          .subtract(1, "month")
          .toDate(),
    filterEndDate: dayjs()
      .startOf("date")
      .toDate(),
    filterStartDate: lastFetched
      ? dayjs(lastFetched).toDate()
      : dayjs()
          .startOf("date")
          .subtract(1, "month")
          .toDate(),
    txnTypes: [],
    fromAmount: "",
    toAmount: "",
    filterSet: false
  });

  const onTxnTypeSelected = (value, selected) => {
    let txnTypes = state.txnTypes;
    if (selected) {
      if (value === "all") {
        txnTypes = [];
      } else {
        txnTypes.push(value as TransactionType);
      }
    } else {
      txnTypes = txnTypes.filter(type => type !== value);
    }
    setState({
      txnTypes
    });
  };

  const onClose = () => {
    setState({ filterOpen: false });
    if (stateRef.current === "filter") {
      applyFilter({
        txnTypes: state.txnTypes,
        fromAmount: state.fromAmount,
        toAmount: state.toAmount,
        startDate: dayjs(state.startDate),
        endDate: dayjs(state.endDate)
      });
    } else {
      const restFilters = {
        txnTypes: [],
        formatAmount: "",
        toAmount: "",
        endDate: dayjs()
          .startOf("date")
          .toDate(),
        startDate: lastFetched
          ? dayjs(lastFetched).toDate()
          : dayjs()
              .startOf("date")
              .subtract(1, "month")
              .toDate(),
        filterEndDate: dayjs()
          .startOf("date")
          .toDate(),
        filterStartDate: lastFetched
          ? dayjs(lastFetched).toDate()
          : dayjs()
              .startOf("date")
              .subtract(1, "month")
              .toDate()
      };
      setState({ ...restFilters, filterSet: false });
      clearFilters();
    }
  };
  const handleApplyFilter = () => {
    stateRef.current = "filter";
    filterRef.current.snapTo(0);
  };

  const handleClearFilter = () => {
    stateRef.current = "clear";
    filterRef.current.snapTo(0);
  };

  return (
    <BottomSheet
      ref={filterRef}
      renderHeader={() => (
        <View style={{ backgroundColor: "#fff" }}>
          <BorderlessButton
            style={{
              backgroundColor: state.filterOpen
                ? themeColors.secondary
                : themeColors.primary,
              position: "absolute",
              height: 40,
              width: 40,
              borderRadius: 20,
              bottom: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              right: 10,
              shadowOffset: {
                width: 10,
                height: 10
              },
              shadowColor: "#ccc",
              shadowRadius: 10,
              shadowOpacity: 1.0
            }}
            onPress={() => filterRef.current.snapTo(state.filterOpen ? 0 : 1)}
          >
            {!state.filterOpen && (
              <FontAwesome name="filter" size={25} color={themeColors.white} />
            )}
            {state.filterOpen && (
              <Ionicons name="ios-close" size={25} color={themeColors.white} />
            )}
          </BorderlessButton>
        </View>
      )}
      renderContent={() => (
        <FilterContent
          {...{
            state,
            setState,
            onTxnTypeSelected,
            handleClearFilter,
            handleApplyFilter,
            openDate,
            themeColors,
            stateRef
          }}
        />
      )}
      snapPoints={[0, "60%"]}
      enabledContentTapInteraction={false}
      enabledGestureInteraction={false}
      enabledContentGestureInteraction={false}
      onOpenStart={() => setState({ filterOpen: true })}
      onCloseStart={onClose}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    alignItems: "center",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    elevation: 20
  },
  txnList: {
    marginTop: 10
  },
  txnListHeader: {
    paddingLeft: 10,
    fontSize: 20
  }
});
