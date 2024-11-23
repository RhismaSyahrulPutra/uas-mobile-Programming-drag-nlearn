import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LogoApp from "../../assets/LogoApp.png";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <Image source={LogoApp} className="w-32 h-32 mb-2" resizeMode="contain" />
      <Text className="text-3xl font-extrabold text-blue-500 mb-4">
        Drag N'Learn
      </Text>
      <Text className="text-base text-gray-600 text-center mb-8 px-4 text-sm">
        Jelajahi berbagai fitur pembelajaran yang menarik dan mudah diakses.
      </Text>
      <View className="w-full mb-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="bg-blue-500 p-3 rounded-lg"
        >
          <Text className="text-white text-center text-lg font-semibold text-sm">
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mb-4">
        <Text className="text-gray-500">or</Text>
      </View>
      <View className="w-full mt-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          className="bg-blue-500 p-3 rounded-lg"
        >
          <Text className="text-white text-center text-lg font-semibold text-sm">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
