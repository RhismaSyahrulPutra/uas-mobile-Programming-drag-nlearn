import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import DraggableFlatList from "react-native-draggable-flatlist";

export default function PersonalAndPublicGame() {
  const navigation = useNavigation(); // Get navigation object

  // Function to handle back navigation
  const handleBackPress = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  // Sample sentences for the drag-and-drop list
  const [data, setData] = useState([
    { key: "1", sentence: "This is a fact." },
    { key: "2", sentence: "This is a hoax." },
    { key: "3", sentence: "Cats can fly." },
    { key: "4", sentence: "The Earth is round." },
    { key: "5", sentence: "Water is wet." },
  ]);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex-row items-center shadow-lg fixed top-0 left-0 right-0 z-10">
        {/* Back Button */}
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>

        <Text className="text-blue-500 text-lg font-bold ml-3">Game</Text>
      </View>

      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)} // Update state when drag ends
        keyExtractor={(item) => item.key}
        renderItem={({ item, drag, isActive }) => (
          <TouchableOpacity
            onLongPress={drag} // Trigger drag on long press
            className={`p-5 my-2 mx-2 bg-white rounded-lg border border-gray-300 shadow-md ${
              isActive ? "bg-gray-200" : ""
            }`}
          >
            <Text className="text-base">{item.sentence}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
