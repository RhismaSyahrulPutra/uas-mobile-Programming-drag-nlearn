import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker
import { Ionicons } from "@expo/vector-icons";

export default function SetAchievementModal({ isVisible, onClose }) {
  const [achievementName, setAchievementName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleSave = () => {
    if (achievementName && description && selectedEvent) {
      Alert.alert("Achievement Saved", `${achievementName} has been added.`);
      onClose();
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white w-11/12 p-6 rounded-lg shadow-lg">
          {/* Header Modal */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Set Achievement
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Achievement Name
            </Text>
            <TextInput
              value={achievementName}
              onChangeText={setAchievementName}
              placeholder="Enter achievement name"
              className="border border-gray-300 rounded-md p-3"
              style={{ height: 40 }}
            />
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              multiline
              numberOfLines={4}
              className="border border-gray-300 rounded-md p-3"
              style={{ textAlignVertical: "top" }} // Untuk teks multiline
            />
          </View>

          <View className="mb-4">
            <Text className="text-lg font-semibold mb-1 text-gray-800">
              Ketika apa?
            </Text>
            <View className="border border-gray-300 p-2 rounded-lg h-12 justify-center">
              <Picker
                selectedValue={selectedEvent}
                onValueChange={(itemValue) => setSelectedEvent(itemValue)}
                style={{ height: 40 }} // Atur tinggi agar sejajar
              >
                <Picker.Item label="Pilih Kejadian" value="" />
                <Picker.Item
                  label="Mendapat Nilai Tertinggi"
                  value="highest_score"
                />
                <Picker.Item label="Menjadi Pemimpin Tim" value="team_leader" />
                <Picker.Item label="Selesai Proyek" value="project_completed" />
                {/* Tambahkan lebih banyak opsi sesuai kebutuhan */}
              </Picker>
            </View>
          </View>

          {/* Button Simpan */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-500 p-4 rounded-md flex-row justify-center items-center mt-4"
          >
            <Ionicons name="save" size={18} color="white" />
            <Text className="text-white font-semibold text-md ml-2">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
