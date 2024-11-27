import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../client/supabaseClient";

export default function CoursePage() {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari tabel card_course
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase.from("card_course").select("*");

        if (error) throw error;
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  // Logika navigasi berdasarkan id_card
  const handleNavigate = (id_card) => {
    if (id_card === 1) {
      navigation.navigate("FactOrHoax", { courseId: id_card });
    } else if (id_card === 2) {
      navigation.navigate("PassCourse", { courseId: id_card });
    } else if (id_card === 3) {
      navigation.navigate("PersonalAndPublic", { courseId: id_card });
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex justify-center items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Course Page</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingTop: 25 }}
      >
        {/* Menampilkan data kursus */}
        {courses.map((course) => (
          <View
            key={course.id_card}
            className="p-5 mb-5 bg-white rounded-lg shadow-md"
          >
            <Image
              source={{ uri: course.image_banner }}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <Text className="text-lg font-bold text-gray-800 mb-3">
              {course.course_title}
            </Text>
            <Text className="text-gray-400 mb-3 text-justify">
              {course.course_description}
            </Text>
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-full justify-center items-center mt-4"
              onPress={() => handleNavigate(course.id_card)}
            >
              <Ionicons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Menampilkan "Coming Soon" setelah semua data selesai */}
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
