import React, { useState } from "react";
import { View, Text, Platform, StyleSheet, Dimensions } from "react-native";
import DateTimePickerModal, {
  DateTimePickerProps
} from "react-native-modal-datetime-picker";
import { BorderlessButton } from "react-native-gesture-handler";
import { useTheme } from "react-navigation";

type Props = Omit<DateTimePickerProps, "onCancel"> & {
  onCancel?: (date: Date) => void;
};

export const DateTimePicker = ({
  date,
  onConfirm,
  onCancel,
  ...rest
}: Props) => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const handleConfirm = date => {
    setVisible(false);
    onConfirm(date);
  };
  const handleCancel = date => {
    setVisible(false);
    onCancel && onCancel(date);
  };
  return (
    <>
      <BorderlessButton onPress={() => setVisible(true)}>
        <Text>{date && date.toDateString()}</Text>
      </BorderlessButton>
      <DateTimePickerModal
        {...rest}
        isDarkModeEnabled={theme === "dark"}
        isVisible={visible}
        date={date}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};
