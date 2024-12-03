import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../../../client/supabaseClient";

export default function KataSandiCourse() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId } = route.params;

  const [kataSandiData, setKataSandiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKataSandiData = async () => {
      try {
        const { data, error } = await supabase
          .from("kata_sandi")
          .select("*")
          .eq("card_id", courseId);

        if (error) throw error;

        setKataSandiData(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching kata sandi data: ", error);
        setLoading(false);
      }
    };

    fetchKataSandiData();
  }, [courseId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayGamePress = () => {
    navigation.navigate("PassCourseGame");
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header Bar */}
      <View className="bg-white pt-10 pb-3 px-5 flex-row items-center shadow-lg fixed top-0 left-0 right-0 z-10">
        {/* Back Button */}
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text className="text-blue-500 text-lg font-bold ml-3">
          Materi Pembelajaran
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5">
          {loading ? (
            <ActivityIndicator size="large" color="#007BFF" />
          ) : (
            <>
              <Text className="text-2xl font-bold mb-4">Kata Sandi</Text>
              <Text className="text-gray-700 mb-4 text-justify">
                {kataSandiData?.description}
              </Text>

              <Text className="text-xl font-semibold mb-2">
                Tips untuk Kata Sandi yang Kuat
              </Text>
              {kataSandiData?.tips && kataSandiData.tips.length > 0 ? (
                <View className="pl-4 mb-4">
                  {kataSandiData.tips.map((tip, index) => (
                    <Text
                      key={index}
                      className="text-gray-700 mb-1 text-justify"
                    >
                      - {tip}
                    </Text>
                  ))}
                </View>
              ) : null}

              <TouchableOpacity
                className="mt-8 bg-blue-500 py-3 px-6 rounded-full"
                onPress={handlePlayGamePress}
              >
                <Text className="text-white text-center text-md">
                  Bermain Game
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
