import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  RefreshControl,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen() {
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = async () => {
    setRefreshing(true);
    try {
      const existingLogs = await AsyncStorage.getItem("activities");
      let logs = existingLogs ? JSON.parse(existingLogs) : [];

      logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const groupedData = logs.reduce((acc, log) => {
        const date = log.date;
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(log);
        return acc;
      }, {});

      const formattedSections = Object.keys(groupedData).map((date) => ({
        title: date,
        data: groupedData[date],
      }));

      setSections(formattedSections);
    } catch (error) {
      console.log("Error loading history");
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {item.type === "Water" ? "💧" : item.type === "Steps" ? "👣" : "😴"}
        </Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.typeText}>{item.type}</Text>
        <Text style={styles.notes}>{item.notes || "No notes added"}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{item.value}</Text>
        <Text style={styles.unitText}>
          {item.type === "Water"
            ? "Glass"
            : item.type === "Steps"
            ? "Steps"
            : "Hrs"}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {sections.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No activities logged yet.</Text>
          <Text style={styles.subText}>Go to Dashboard to add one!</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadHistory} />
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", paddingHorizontal: 15 },

  headerContainer: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 10,
    marginTop: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#555" },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  icon: { fontSize: 22 },
  details: { flex: 1 },
  typeText: { fontSize: 16, fontWeight: "bold", color: "#333" },
  notes: { fontSize: 12, color: "#999", marginTop: 2 },
  valueContainer: { alignItems: "flex-end" },
  valueText: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  unitText: { fontSize: 12, color: "#999" },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: { fontSize: 20, fontWeight: "bold", color: "#ccc" },
  subText: { fontSize: 14, color: "#ccc", marginTop: 5 },
});
