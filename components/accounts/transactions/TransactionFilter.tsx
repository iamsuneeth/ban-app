import React, { useRef, useReducer } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Card } from "../../elements/card/Card";
import { ScrollView, BorderlessButton } from "react-native-gesture-handler";

import BottomSheet from "reanimated-bottom-sheet";
import {
  TransactionType,
  IFilterTransactionPayload
} from "bank-core/src/types";
import dayjs from "dayjs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { DateTimePicker } from "../../elements/date-picker/DateTimePicker";
import { useTheme } from "@react-navigation/native";
import { Button } from "../../elements/button/Button";
import { normalize } from "../../../utils/normalize";
import Switch from "../../elements/switch/Switch";

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
  colors,
  stateRef
}) => (
  <Card style={[styles.card, { backgroundColor: colors.surface }]}>
    <ScrollView
      style={{ width: "100%", marginBottom: normalize(10, "height") }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: normalize(18), color: colors.text }}>
          Dates
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: normalize(10, "height"),
              justifyContent: "space-between"
            }}
          >
            <View>
              <Text
                style={{
                  color: colors.text,
                  marginBottom: normalize(5, "height"),
                  fontSize: normalize(16)
                }}
              >
                Start
              </Text>
              <DateTimePicker
                date={state.startDate}
                minimumDate={openDate.toDate()}
                maximumDate={dayjs().toDate()}
                onConfirm={date => setState({ startDate: date })}
                displayTextStyle={{
                  color: colors.text,
                  fontWeight: "600",
                  fontSize: normalize(16)
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: colors.text,
                  marginBottom: normalize(5, "height"),
                  fontSize: normalize(16)
                }}
              >
                End
              </Text>
              <DateTimePicker
                date={state.endDate}
                minimumDate={openDate.toDate()}
                maximumDate={dayjs().toDate()}
                onConfirm={date => setState({ endDate: date })}
                displayTextStyle={{
                  color: colors.text,
                  fontWeight: "600",
                  fontSize: normalize(16)
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: normalize(10, "height")
            }}
          >
            {filters.map(filter => {
              const isSelected =
                filter.start.isSame(dayjs(state.startDate)) &&
                filter.end.isSame(dayjs(state.endDate));
              return (
                <Button
                  key={filter.key}
                  onPress={() =>
                    setState({
                      startDate: filter.start.toDate(),
                      endDate: filter.end.toDate()
                    })
                  }
                  style={{
                    margin: normalize(5),
                    minWidth: 100
                  }}
                  primary={isSelected}
                  secondary={!isSelected}
                >
                  {filter.text}
                </Button>
              );
            })}
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginTop: normalize(10, "height") }}>
        <Text
          style={{
            fontSize: normalize(18),
            marginBottom: normalize(10, "height"),
            color: colors.text
          }}
        >
          Type
        </Text>
        <View>
          <View
            key={"all"}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Switch
              value={state.txnTypes.length === 0}
              onValueChange={value => onTxnTypeSelected("all", value)}
            />
            <Text
              style={{
                marginLeft: normalize(10),
                marginVertical: normalize(10, "height"),
                fontSize: normalize(16),
                color: colors.text
              }}
            >
              All
            </Text>
          </View>
          {Object.entries(TransactionType).map(([key, value]) => (
            <View
              key={key}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Switch
                value={state.txnTypes.includes(value)}
                onValueChange={boolValue => onTxnTypeSelected(value, boolValue)}
              />
              <Text
                style={{
                  marginLeft: normalize(10),
                  marginVertical: normalize(10, "height"),
                  fontSize: normalize(16),
                  color: colors.text
                }}
              >
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
        paddingVertical: normalize(5, "height"),
        alignItems: "center",
        flexDirection: "row"
      }}
    >
      <Button
        style={{
          flex: 2,
          margin: normalize(10),
          bottom: normalize(15, "height")
        }}
        primary
        onPress={handleApplyFilter}
      >
        Apply filters
      </Button>
      <Button
        style={{
          flex: 1,
          margin: normalize(10),
          bottom: normalize(15, "height")
        }}
        secondary
        onPress={handleClearFilter}
      >
        Clear
      </Button>
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
  const { colors } = useTheme();
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
                ? colors.primary
                : colors.primary,
              position: "absolute",
              height: normalize(50),
              width: normalize(50),
              borderRadius: normalize(25),
              bottom: 10,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              right: 10,
              shadowOffset: {
                width: normalize(10),
                height: normalize(10, "height")
              },
              shadowColor: "#ccc",
              shadowRadius: 10,
              shadowOpacity: 1.0
            }}
            onPress={() => filterRef.current.snapTo(state.filterOpen ? 0 : 1)}
          >
            {!state.filterOpen && (
              <FontAwesome name="filter" size={25} color={"#fff"} />
            )}
            {state.filterOpen && (
              <Ionicons name="ios-close" size={25} color={"#fff"} />
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
            colors,
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
    marginHorizontal: normalize(0),
    alignItems: "center",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: normalize(0),
      height: normalize(5, "height")
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    elevation: 20
  },
  txnList: {
    marginTop: normalize(10, "height")
  },
  txnListHeader: {
    paddingLeft: normalize(10),
    fontSize: normalize(20)
  }
});
