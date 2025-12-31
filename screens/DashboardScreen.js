import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; //
export default function DashboardScreen({ navigation }) {
  const [summary, setSummary] = useState({ water: 0, steps: 0, sleep: 0 });
  const today = new Date().toDateString();

  const loadData = async () => {
    try {
      const existingLogs = await AsyncStorage.getItem("activities");
      const logs = existingLogs ? JSON.parse(existingLogs) : [];

      const todaysLogs = logs.filter((log) => log.date === today);

      let waterCount = 0;
      let stepsCount = 0;
      let sleepCount = 0;

      todaysLogs.forEach((log) => {
        if (log.type === "Water") waterCount += log.value;
        if (log.type === "Steps") stepsCount += log.value;
        if (log.type === "Sleep") sleepCount += log.value;
      });

      setSummary({ water: waterCount, steps: stepsCount, sleep: sleepCount });
    } catch (e) {
      console.log("Error loading data");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>OrgLance Technologies LLP</Text>
        <Text style={styles.date}>{today}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.card, { backgroundColor: "#e3f2fd" }]}>
          <Text style={styles.cardLabel}>💧 Water</Text>
          <Text style={styles.cardValue}>
            {summary.water} <Text style={styles.unit}>Glasses</Text>
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#fff3e0" }]}>
          <Text style={styles.cardLabel}>👣 Steps</Text>
          <Text style={styles.cardValue}>{summary.steps}</Text>
        </View>
      </View>

      <View
        style={[styles.card, { backgroundColor: "#e8f5e9", marginBottom: 20 }]}
      >
        <Text style={styles.cardLabel}>😴 Sleep</Text>
        <Text style={styles.cardValue}>
          {summary.sleep} <Text style={styles.unit}>Hours</Text>
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Log Activity</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("LogActivity", { type: "Water" })}
        >
          <Text style={styles.btnText}>+ Water</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("LogActivity", { type: "Steps" })}
        >
          <Text style={styles.btnText}>+ Steps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate("LogActivity", { type: "Sleep" })}
        >
          <Text style={styles.btnText}>+ Sleep</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.historyBtn}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.historyText}>View 7-Day History →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { marginBottom: 20, marginTop: 10 },
  greeting: { fontSize: 28, fontWeight: "bold", color: "#333" },
  date: { fontSize: 16, color: "#888", marginTop: 5 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#555",
  },
  cardValue: { fontSize: 24, fontWeight: "bold", color: "#000" },
  unit: { fontSize: 14, fontWeight: "normal", color: "#666" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionBtn: {
    backgroundColor: "#2c3e50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
  historyBtn: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  historyText: { color: "#3498db", fontSize: 16, fontWeight: "bold" },
});
