import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { WebView } from "react-native-webview";

export default function PersonalAndPublicGame() {
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

        <Text className="text-blue-500 text-lg font-bold ml-3">Game</Text>
      </View>

      <WebView
        source={{
          uri: "https://wordwall.net/id/embed/f6eb4bbd89454ceebc41eb2606553a0f?themeId=62&templateId=2&fontStackId=0",
        }}
        style={{ flex: 1, marginTop: 10 }}
        scalesPageToFit={true}
        startInLoadingState={true} // Menampilkan indikator loading
        javaScriptEnabled={true} // Mengaktifkan JavaScript
        domStorageEnabled={true} // Mengaktifkan penyimpanan DOM
      />
    </View>
  );
}
