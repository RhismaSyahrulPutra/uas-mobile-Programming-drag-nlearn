import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SetAchievementModal from "./component/SetAchivementModal";
import { supabase } from "../../client/supabaseClient";
import { useRoute } from "@react-navigation/native";

export default function HomeGuru() {
  const route = useRoute();
  const { userId } = route.params;

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("account")
          .select("username")
          .eq("id", userId)
          .single();

        if (error) {
          throw error;
        }

        setUsername(data.username);
      } catch (error) {
        setError("Error fetching username. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, [userId]);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex justify-start items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Home Page</Text>
      </View>

      <ScrollView>
        <View className="flex-1 p-5">
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                className="rounded-full w-12 h-12 mr-4"
              />
              <View>
                {loading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : error ? (
                  <Text className="text-red-500">{error}</Text>
                ) : (
                  <Text className="text-2xl font-bold text-gray-800">
                    Hi, {username || "Teacher"}!
                  </Text>
                )}
                <Text className="text-gray-600">Welcome back!</Text>
              </View>
            </View>
          </View>

          <View className="border-b border-gray-400 mb-4"></View>

          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Active Course
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-4">
              {[1, 2, 3, 4].map((num) => (
                <View
                  key={num}
                  className="bg-white p-4 rounded-lg shadow-md w-60"
                >
                  <Text className="text-lg font-semibold text-gray-800">
                    Course {num}
                  </Text>
                  <Text className="text-gray-600">
                    Description of course {num}.
                  </Text>
                  <Text className="text-blue-500 mt-2">View Details</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View className="mt-6">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Set Achievements
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

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              className="bg-blue-500 p-4 rounded-full flex-row items-center justify-center shadow-md mt-4"
            >
              <Ionicons name="add" size={18} color="white" />
              <Text className="text-white text-md font-semibold ml-2">
                Add Achievement
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <SetAchievementModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
