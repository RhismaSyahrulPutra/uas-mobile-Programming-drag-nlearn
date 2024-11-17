import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      {/* Welcome Text */}
      <Text className="text-3xl font-bold mb-4 text-gray-800">
        Selamat Datang!
      </Text>

      {/* Subtitle Text */}
      <Text className="text-base text-gray-600 mb-8 text-center">
        Jelajahi fitur dan materi pembelajaran yang kami tawarkan
      </Text>

      {/* Sign In Button */}
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

      {/* Or Text */}
      <View className="">
        <Text className="text-gray-500">or</Text>
      </View>

      {/* Sign Up Button */}
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
