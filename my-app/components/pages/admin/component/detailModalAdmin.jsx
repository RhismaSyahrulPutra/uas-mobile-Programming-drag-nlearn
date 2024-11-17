import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal"; // Import Modal

const DetailModalAdmin = ({ isVisible, selectedItem, closeModal }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal} // Tutup modal ketika backdrop diklik
    >
      <View className="bg-white p-5 rounded-lg shadow-lg">
        <Text className="text-lg font-bold">Detail Data</Text>
        {selectedItem && (
          <View className="mt-4">
            <Text>Name: {selectedItem.name}</Text>
            <Text>Username: {selectedItem.username}</Text>
            <Text>Class: {selectedItem.class}</Text>
            <Text>
              Courses Completed: {selectedItem.coursesCompleted}/
              {selectedItem.totalCourses}
            </Text>
          </View>
        )}
        <TouchableOpacity
          className="mt-4 bg-red-500 p-2 rounded-lg"
          onPress={closeModal}
        >
          <Text className="text-white text-center">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DetailModalAdmin;
