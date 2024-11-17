import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function PersonalAndPublic() {
  const navigation = useNavigation(); // Get navigation object

  // Function to handle back navigation
  const handleBackPress = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  const handlePlayGamePress = () => {
    navigation.navigate("PersonalAndPublicGame");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex-row items-center shadow-lg fixed top-0 left-0 right-0 z-10">
        {/* Back Button */}
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>

        <Text className="text-blue-500 text-lg font-bold ml-3">
          Materi Pembelajaran
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dummy Header */}
        <View className="p-5">
          <Text className="text-2xl font-bold mb-4">Judul Konten</Text>
          <Text className="text-gray-700 mb-2">
            Ini adalah paragraf dummy pertama. Anda dapat menambahkan lebih
            banyak teks di sini untuk menggambarkan materi pembelajaran.
          </Text>
          <Text className="text-gray-700 mb-2">
            Paragraf kedua menjelaskan lebih lanjut tentang topik ini dan
            memberikan beberapa informasi tambahan. Misalnya, menjelaskan
            pentingnya pemahaman tentang topik ini dalam konteks pembelajaran.
          </Text>
          <Text className="text-gray-700 mb-2">
            Paragraf ketiga dapat berisi informasi tambahan, contoh, atau
            pertanyaan untuk merangsang pemikiran pembaca.
          </Text>

          {/* New Content Sections */}
          <Text className="text-xl font-semibold mt-6 mb-2">Poin Penting</Text>
          <Text className="text-gray-700 mb-2">
            - Pentingnya kolaborasi dalam belajar.
          </Text>
          <Text className="text-gray-700 mb-2">
            - Keterampilan komunikasi yang baik.
          </Text>
          <Text className="text-gray-700 mb-2">
            - Metode belajar yang efektif untuk pemahaman yang lebih dalam.
          </Text>

          <Text className="text-xl font-semibold mt-6 mb-2">
            Contoh Penerapan
          </Text>
          <Text className="text-gray-700 mb-2">
            Contoh: Dalam sebuah kelompok belajar, siswa dapat berbagi
            pengetahuan dan saling membantu untuk memahami materi yang sulit.
            Ini menciptakan lingkungan yang mendukung dan kolaboratif.
          </Text>

          <Text className="text-xl font-semibold mt-6 mb-2">
            Pertanyaan Diskusi
          </Text>
          <Text className="text-gray-700 mb-2">
            1. Apa tantangan terbesar yang Anda hadapi dalam belajar secara
            kolaboratif?
          </Text>
          <Text className="text-gray-700 mb-2">
            2. Bagaimana Anda dapat meningkatkan keterampilan komunikasi Anda
            dalam kelompok?
          </Text>

          <Text className="text-gray-700 mb-2">
            Diskusikan pertanyaan-pertanyaan ini dengan teman sekelas Anda dan
            bagikan pengalaman serta strategi yang efektif.
          </Text>

          <TouchableOpacity
            className="mt-8 bg-blue-500 py-3 px-6 rounded-full"
            onPress={handlePlayGamePress}
          >
            <Text className="text-white text-center text-md">Bermain Game</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
