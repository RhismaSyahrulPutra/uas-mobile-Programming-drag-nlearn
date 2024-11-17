import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

export default function PassCourse() {
  const navigation = useNavigation(); // Get navigation object

  // Function to handle back navigation
  const handleBackPress = () => {
    navigation.goBack(); // Navigate to the previous screen
  };

  const handlePlayGamePress = () => {
    navigation.navigate("PassCourseGame");
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

      {/* ScrollView for content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Add your content here */}
        <View className="p-5">
          <Text className="text-2xl font-bold mb-4">Kursus Berhasil Lulus</Text>
          <Text className="text-gray-700 mb-2">
            Dalam kursus ini, kita akan membahas berbagai strategi dan teknik
            yang dapat membantu Anda untuk mencapai keberhasilan dalam belajar.
          </Text>
          <Text className="text-gray-700 mb-2">
            Kursus ini dirancang untuk memberikan pemahaman mendalam tentang
            pentingnya manajemen waktu, motivasi diri, dan keterampilan belajar
            yang efektif.
          </Text>

          <Text className="text-xl font-semibold mt-6 mb-2">Poin Penting</Text>
          <Text className="text-gray-700 mb-2">
            - Manajemen waktu yang efisien sangat penting untuk mencapai tujuan.
          </Text>
          <Text className="text-gray-700 mb-2">
            - Memahami cara belajar yang sesuai dengan gaya belajar pribadi.
          </Text>
          <Text className="text-gray-700 mb-2">
            - Menetapkan tujuan jangka pendek dan jangka panjang yang realistis.
          </Text>

          <Text className="text-xl font-semibold mt-6 mb-2">
            Contoh Penerapan
          </Text>
          <Text className="text-gray-700 mb-2">
            Misalnya, menggunakan teknik Pomodoro untuk mengatur waktu belajar
            dan istirahat dapat meningkatkan fokus dan produktivitas.
          </Text>

          <Text className="text-xl font-semibold mt-6 mb-2">
            Pertanyaan Diskusi
          </Text>
          <Text className="text-gray-700 mb-2">
            1. Apa metode belajar yang paling efektif bagi Anda?
          </Text>
          <Text className="text-gray-700 mb-2">
            2. Bagaimana Anda mengatur waktu belajar untuk mencapai tujuan?
          </Text>

          <Text className="text-gray-700 mb-2">
            Diskusikan pertanyaan-pertanyaan ini dengan teman sekelas Anda untuk
            berbagi pengalaman dan strategi yang berguna.
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
