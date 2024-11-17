import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DragAndDrop from "volkeno-react-native-drag-drop"; // Import DragAndDrop component
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function FactOrHoaxGame() {
  const navigation = useNavigation(); // Get navigation object

  // Function to handle back navigation
  const handleBackPress = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  const [items, setItems] = React.useState([
    { id: 1, text: "Air mengandung hidrogen dan oksigen." }, // Fakta
    { id: 2, text: "Menonton TV dapat membuat kamu lebih pintar." }, // Opini
    { id: 3, text: "Bumi datar dan bukan bulat." }, // Hoax
    { id: 4, text: "Kucing adalah hewan peliharaan yang sangat popular." }, // Fakta
    { id: 5, text: "Semua orang harus menjadi vegetarian untuk hidup sehat." }, // Opini
    { id: 6, text: "Vaksin menyebabkan autisme." }, // Hoax
    { id: 7, text: "Makanan pedas dapat mempercepat metabolisme." }, // Fakta
    { id: 8, text: "Jika kamu menyentuh katak, kamu akan sakit." }, // Hoax
    { id: 9, text: "Olahraga setiap hari sangat baik untuk kesehatan." }, // Fakta
    { id: 10, text: "Mendengarkan musik klasik membuat kamu lebih cerdas." }, // Opini
  ]);

  const [zones, setZones] = React.useState([
    { id: 1, text: "Fakta", items: [] },
    { id: 2, text: "Opini", items: [] },
    { id: 3, text: "Hoax", items: [] },
  ]);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex-row items-center shadow-lg fixed top-0 left-0 right-0 z-10">
        {/* Back Button */}
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text className="text-blue-500 text-lg font-bold ml-3">
          Drag and Drop Game
        </Text>
      </View>

      <ScrollView>
        <View style={styles.dragDropContainer}>
          <DragAndDrop
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            itemKeyExtractor={(item) => item.id.toString()}
            zoneKeyExtractor={(zone) => zone.id.toString()}
            zones={zones}
            items={items}
            onMaj={(zones, items) => {
              setItems(items);
              setZones(zones);
            }}
            itemsInZoneDisplay="column" // Set items in zone to display in a column
            itemsDisplay="column" // Set items to display in a column
            itemsNumColumns={1} // Display 1 item per row
            itemsInZoneNumColumns={1}
            renderItem={(item) => (
              <View style={styles.dragItemStyle}>
                <Text style={styles.dragItemTextStyle}>{item.text}</Text>
              </View>
            )} // Display 1 item per zone
            renderZone={(zone, children, hover) => (
              <View style={{ marginVertical: 10 }}>
                <Text style={{ marginBottom: 5, fontSize: 14 }}>
                  {zone.text}
                </Text>
                <View
                  style={{
                    ...styles.dragZoneStyle,
                    minHeight: 150,
                    backgroundColor: hover ? "#E2E2E2" : "#FFF",
                  }}
                >
                  {children}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dragDropContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 20,
    paddingTop: 20,
    backgroundColor: "#f3f4f6",
    height: "100%",
  },
  dragItemStyle: {
    borderColor: "#6b7280",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#F5F5F5",
    padding: 10,
    width: "100%", // Ensure the item takes the full width
  },
  dragItemTextStyle: {
    color: "#011F3B",
    fontWeight: "700",
    textAlign: "center",
  },
  dragZoneStyle: {
    borderColor: "#d1d5db",
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
  },
});
