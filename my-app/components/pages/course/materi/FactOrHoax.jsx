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

export default function FactOrHoax() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId } = route.params;

  const [factHoaxData, setFactHoaxData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari Supabase
    const fetchFactHoaxData = async () => {
      try {
        const { data, error } = await supabase
          .from("fact_hoax_opinion")
          .select("*")
          .eq("card_id", courseId);
        if (error) throw error;

        setFactHoaxData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fact/hoax data: ", error);
        setLoading(false);
      }
    };

    fetchFactHoaxData();
  }, [courseId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayGamePress = () => {
    navigation.navigate("FactOrHoaxGame");
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header Bar */}
      <View className="bg-white pt-10 pb-3 px-5 flex-row items-center shadow-lg fixed top-0 left-0 right-0 z-10">
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
            factHoaxData.map((item, index) => (
              <View key={index} className="mb-6">
                {/* Kategori */}
                <Text className="text-2xl font-bold mb-2">{item.category}</Text>
                <Text className="text-gray-700 mb-4 text-justify">
                  {item.description}
                </Text>

                {/* Karakteristik */}
                <Text className="text-xl font-semibold mt-4 mb-2">
                  Karakteristik:
                </Text>
                {item.characteristics && item.characteristics.length > 0 ? (
                  <View className="pl-4 mb-4">
                    {item.characteristics.map((char, i) => (
                      <Text key={i} className="text-gray-700 mb-1">
                        - {char}
                      </Text>
                    ))}
                  </View>
                ) : null}

                {/* Sub Kategori dan Sub Deskripsi */}
                {item.sub_category && (
                  <>
                    <Text className="text-xl font-semibold mt-4 mb-2">
                      Sub Kategori:
                    </Text>
                    <Text className="text-gray-700 mb-2">
                      {item.sub_category}
                    </Text>

                    <Text className="text-xl font-semibold mt-4 mb-2">
                      Deskripsi Sub Kategori:
                    </Text>
                    <Text className="text-gray-700 mb-4 text-justify">
                      {item.sub_description}
                    </Text>
                  </>
                )}
              </View>
            ))
          )}

          {/* Button untuk Bermain Game */}
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
