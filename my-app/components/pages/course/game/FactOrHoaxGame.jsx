import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import icon library
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { WebView } from "react-native-webview"; // Import WebView for iframe rendering

export default function FactOrHoaxGame() {
  const navigation = useNavigation(); // Get navigation object

  // Function to handle back navigation
  const handleBackPress = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

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
      {/* Wordwall Game Iframe */}
      <View style={styles.webViewContainer}>
        <WebView
          source={{
            uri: "https://wordwall.net/id/embed/07da641d8b2f41a889f0bbc9c041c18e?themeId=62&templateId=3&fontStackId=0",
          }}
          style={styles.webView}
          allowsFullscreenVideo
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
    marginLeft: 10,
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
