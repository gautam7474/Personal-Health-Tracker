import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ActivityLogScreen({ route, navigation }) {
  const { type } = route.params || { type: "Water" };

  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  const saveActivity = async () => {
    if (!value.trim()) {
      Alert.alert("Error", `Please enter ${type} amount!`);
      return;
    }

    const newLog = {
      id: Date.now().toString(),
      type: type,
      value: parseFloat(value),
      notes: notes,
      date: new Date().toDateString(),
      timestamp: new Date().toISOString(),
    };

    try {
      const existingLogs = await AsyncStorage.getItem("activities");
      const logs = existingLogs ? JSON.parse(existingLogs) : [];

      logs.push(newLog);

      await AsyncStorage.setItem("activities", JSON.stringify(logs));

      Alert.alert("Success", "Activity Logged Successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Could not save data");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.headerTitle}>Add {type}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          {type === "Water"
            ? "Amount (Glasses)"
            : type === "Steps"
            ? "Count (Steps)"
            : "Duration (Hours)"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Add any notes..."
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={saveActivity}>
          <Text style={styles.btnText}>Save Record</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  label: { fontSize: 16, color: "#7f8c8d", marginBottom: 5, marginTop: 10 },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveBtn: {
    backgroundColor: "#27ae60",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
