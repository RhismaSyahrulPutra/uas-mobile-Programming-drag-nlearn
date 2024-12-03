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

export default function PersonalAndPublic() {
  const navigation = useNavigation();
  const route = useRoute();

  const [informationData, setInformationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInformationData = async () => {
      try {
        const { data, error } = await supabase.from("information").select("*");

        if (error) throw error;

        setInformationData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching information data: ", error);
        setLoading(false);
      }
    };

    fetchInformationData();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handlePlayGamePress = () => {
    navigation.navigate("PersonalAndPublicGame");
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
              {informationData.length > 0 ? (
                informationData.map((info, index) => (
                  <View key={index} className="mb-6">
                    <Text className="text-2xl font-bold mb-4">
                      {info.category}
                    </Text>
                    <Text className="text-gray-700 mb-4 text-justify">
                      {info.description}
                    </Text>

                    <Text className="text-xl font-semibold mb-2">
                      Karakteristik
                    </Text>
                    {info.characteristics && info.characteristics.length > 0 ? (
                      <View className="pl-4 mb-4">
                        {info.characteristics.map((item, index) => (
                          <Text
                            key={index}
                            className="text-gray-700 mb-1 text-justify"
                          >
                            - {item}
                          </Text>
                        ))}
                      </View>
                    ) : null}

                    <Text className="text-xl font-semibold mb-2">Contoh</Text>
                    {info.examples && info.examples.length > 0 ? (
                      <View className="pl-4 mb-4">
                        {info.examples.map((example, index) => (
                          <Text
                            key={index}
                            className="text-gray-700 mb-1 text-justify"
                          >
                            - {example}
                          </Text>
                        ))}
                      </View>
                    ) : null}
                  </View>
                ))
              ) : (
                <Text className="text-center text-gray-500">
                  No data available
                </Text>
              )}

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
