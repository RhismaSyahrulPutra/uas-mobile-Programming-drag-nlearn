import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const DetailTableStudent = ({ isVisible, selectedItem, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Memanggil fungsi onClose
      onSwipeComplete={onClose} // Tutup saat swipe (opsional)
      swipeDirection="down"
    >
      <View className="bg-white p-5 rounded-lg shadow-lg">
        <Text className="text-lg font-bold">Detail Data</Text>
        {selectedItem && (
          <View className="mt-4">
            <Text>Nama: {selectedItem.name}</Text>
            <Text>Username: {selectedItem.username}</Text>
            <Text>Kelas: {selectedItem.class}</Text>
            <Text>
              Kursus Selesai: {selectedItem.coursesCompleted}/
              {selectedItem.totalCourses}
            </Text>
          </View>
        )}
        <TouchableOpacity
          className="mt-4 bg-red-500 p-2 rounded-lg"
          onPress={onClose} // Pastikan fungsi onClose dipanggil
        >
          <Text className="text-white text-center">Tutup</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DetailTableStudent;
