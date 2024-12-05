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
  const [courses, setCourses] = useState([]);
  const [profileImage, setProfileImage] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("account")
          .select("username")
          .eq("id", userId)
          .single(); // Ambil 1 data sesuai `userId`.

        if (error) throw error;

        // Set username dari tabel account
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching account data:", error.message);
        setError("Error fetching account data. Please try again.");
      }
    };

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profile")
          .select("profile_image")
          .eq("account_id", userId)
          .single(); // Ambil 1 data sesuai `account_id`.

        if (error) throw error;

        // Set profile_image dari tabel profile
        setProfileImage(data.profile_image || ""); // Jika null, gunakan default kosong
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
        setError("Error fetching profile data. Please try again.");
      }
    };

    const fetchData = async () => {
      try {
        await Promise.all([fetchAccount(), fetchProfile()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("card_course").select("*");

        if (error) {
          throw error;
        }

        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses data:", error.message);
        setError("Error fetching courses data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
                source={{
                  uri: profileImage || "https://via.placeholder.com/50",
                }}
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
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : error ? (
                <Text className="text-red-500">{error}</Text>
              ) : (
                courses.map((course) => (
                  <TouchableOpacity
                    key={course.id_card}
                    className="bg-white p-4 rounded-lg shadow-md w-60"
                    onPress={() => {
                      if (course.id_card === 1) {
                        navigation.navigate("FactOrHoax", {
                          courseId: course.id_card,
                        });
                      } else if (course.id_card === 2) {
                        navigation.navigate("PassCourse", {
                          courseId: course.id_card,
                        });
                      } else if (course.id_card === 3) {
                        navigation.navigate("PersonalAndPublic", {
                          courseId: course.id_card,
                        });
                      } else {
                        navigation.navigate("CourseDetail", {
                          courseId: course.id_card,
                        });
                      }
                    }}
                  >
                    <Text className="text-lg font-bold text-gray-800 mb-2">
                      {course.course_title}
                    </Text>
                    <Text className="text-gray-600 text-xs text-justify mb-4">
                      {course.course_description}
                    </Text>
                    <Text className="text-blue-600 text-sm font-medium">
                      View Details
                    </Text>
                  </TouchableOpacity>
                ))
              )}
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
