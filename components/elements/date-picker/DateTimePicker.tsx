import React, { useState, ReactNode } from "react";
import { View, Text, TextStyle, ViewStyle } from "react-native";
import DateTimePickerModal, {
  DateTimePickerProps
} from "react-native-modal-datetime-picker";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "react-navigation";
import dayjs from "dayjs";

type Props = Omit<DateTimePickerProps, "onCancel"> & {
  onCancel?: (date: Date) => void;
  displayTextStyle?: TextStyle;
  displayTextContainerStyle?: ViewStyle;
  displayComponent?: ReactNode;
};

export const DateTimePicker = ({
  date = dayjs()
    .add(1, "day")
    .toDate(),
  onConfirm,
  onCancel,
  displayTextContainerStyle,
  displayTextStyle,
  displayComponent,
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
      <RectButton onPress={() => setVisible(true)}>
        {displayComponent ? (
          displayComponent
        ) : (
          <View style={displayTextContainerStyle}>
            <Text style={displayTextStyle}>{date && date.toDateString()}</Text>
          </View>
        )}
      </RectButton>
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
