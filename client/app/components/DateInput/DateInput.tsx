import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./DateInput.styles";

interface DateInputProps {
  day: string;
  month: string;
  year: string;
  onDayChange: (text: string) => void;
  onMonthChange: (text: string) => void;
  onYearChange: (text: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Birth date</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputWrapperThird}>
          <TextInput
            style={styles.input}
            placeholder="Day"
            placeholderTextColor={styles.placeholder.color}
            value={day}
            onChangeText={onDayChange}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
        <View style={styles.inputWrapperThird}>
          <TextInput
            style={styles.input}
            placeholder="Month"
            placeholderTextColor={styles.placeholder.color}
            value={month}
            onChangeText={onMonthChange}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
        <View style={styles.inputWrapperThird}>
          <TextInput
            style={styles.input}
            placeholder="Year"
            placeholderTextColor={styles.placeholder.color}
            value={year}
            onChangeText={onYearChange}
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>
      </View>
    </View>
  );
};

export default DateInput;
