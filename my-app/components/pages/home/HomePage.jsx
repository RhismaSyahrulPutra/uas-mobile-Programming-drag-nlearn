import React from "react";
import { View, Text, ScrollView, Image, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the arrow icon

export default function HomePage() {
  return (
    <View className="flex-1 bg-gray-100">
      {/* Fixed Header */}
      <View className="bg-white pt-10 pb-3 px-5 flex justify-start items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Home Page</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        <View className="flex-1 p-5">
          {/* User Profile Section */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Image
                source={{ uri: "https://via.placeholder.com/50" }} // Replace with real image
                className="rounded-full w-12 h-12 mr-4"
              />
              <View>
                <Text className="text-2xl font-bold text-gray-800">
                  Hi, User!
                </Text>
                <Text className="text-gray-600">Welcome back!</Text>
              </View>
            </View>
          </View>
          {/* Horizontal line */}
          <View className="border-b border-gray-400 mb-4"></View>

          {/* "Passed Courses" Section */}
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Passed Courses
          </Text>

          {/* Horizontal Scrollable Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-4">
              <View className="bg-white p-4 rounded-lg shadow-md w-60">
                <Text className="text-lg font-semibold text-gray-800">
                  Course 1
                </Text>
                <Text className="text-gray-600">Description of course 1.</Text>
                <Text className="text-blue-500 mt-2">View Details</Text>
              </View>

              <View className="bg-white p-4 rounded-lg shadow-md w-60">
                <Text className="text-lg font-semibold text-gray-800">
                  Course 2
                </Text>
                <Text className="text-gray-600">Description of course 2.</Text>
                <Text className="text-blue-500 mt-2">View Details</Text>
              </View>

              <View className="bg-white p-4 rounded-lg shadow-md w-60">
                <Text className="text-lg font-semibold text-gray-800">
                  Course 3
                </Text>
                <Text className="text-gray-600">Description of course 3.</Text>
                <Text className="text-blue-500 mt-2">View Details</Text>
              </View>

              <View className="bg-white p-4 rounded-lg shadow-md w-60">
                <Text className="text-lg font-semibold text-gray-800">
                  Course 4
                </Text>
                <Text className="text-gray-600">Description of course 4.</Text>
                <Text className="text-blue-500 mt-2">View Details</Text>
              </View>
            </View>
          </ScrollView>

          {/* Achievements Section */}
          <View className="mt-6">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Your Achievements
            </Text>
            <View className="bg-white p-4 rounded-lg shadow-md mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Courses Completed
              </Text>
              <Text className="text-gray-600">5 courses completed</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-md mb-4">
              <Text className="text-lg font-semibold text-gray-800">
                Average Rating
              </Text>
              <Text className="text-gray-600">4.5/5 based on 20 ratings</Text>
            </View>
          </View>

          {/* Recommended Courses Section */}
          <View className="mt-6">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Recommended Courses
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row space-x-4">
                <View className="bg-white p-4 rounded-lg shadow-md w-60">
                  <Text className="text-lg font-semibold text-gray-800">
                    Course A
                  </Text>
                  <Text className="text-gray-600">
                    Description of course A.
                  </Text>
                </View>

                <View className="bg-white p-4 rounded-lg shadow-md w-60">
                  <Text className="text-lg font-semibold text-gray-800">
                    Course B
                  </Text>
                  <Text className="text-gray-600">
                    Description of course B.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
