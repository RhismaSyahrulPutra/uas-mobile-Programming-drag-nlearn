import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CoursePage() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex justify-center items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Course Page</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingTop: 25 }}
      >
        <View className="p-5 mb-5 bg-white rounded-lg shadow-md">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Fakta, Opini, dan Hoax
          </Text>
          <Text className="text-gray-400 mb-3 text-justify">
            Pelajari cara membedakan antara fakta, opini, dan hoax dalam
            informasi yang beredar.
          </Text>
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-full justify-center items-center mt-4"
            onPress={() => navigation.navigate("FactOrHoax")}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="p-5 mb-5 bg-white rounded-lg shadow-md">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <Text className="text-xl font-bold text-gray-800 mb-3">
            Kata Sandi
          </Text>
          <Text className="text-gray-400 mb-3 text-justify">
            Pelajari cara membuat kata sandi yang kuat dan aman untuk melindungi
            informasi pribadi Anda.
          </Text>
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-full justify-center items-center mt-4"
            onPress={() => navigation.navigate("PassCourse")}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="p-5 mb-5 bg-white rounded-lg shadow-md">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Informasi Pribadi dan Publik
          </Text>
          <Text className="text-gray-400 mb-3 text-justify">
            Pelajari cara membagikan informasi pribadi dengan aman dan
            mengetahui informasi yang dapat diakses publik.
          </Text>
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-full justify-center items-center mt-4"
            onPress={() => navigation.navigate("PersonalAndPublic")}
          >
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="p-5 mb-5 bg-white rounded-lg shadow-md">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Coming Soon...
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
