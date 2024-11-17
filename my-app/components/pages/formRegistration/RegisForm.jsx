import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RegisForm() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nis, setNis] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [school, setSchool] = useState("");

  const navigation = useNavigation();

  const handleSave = () => {
    console.log("Data Saved", {
      firstName,
      lastName,
      gender,
      age,
      className,
      school,
      teacher,
    });

    navigation.navigate("Tabs");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Gambar bulat di atas username */}
        <View className="flex items-center my-12">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
        </View>

        <View className="flex-row mb-4">
          <View className="flex-1 pr-2">
            <Text className="text-sm mb-1 text-gray-700">Nama Depan</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Nama Depan"
              className="border border-gray-500 p-2 rounded-lg"
            />
          </View>

          <View className="flex-1 pl-2">
            <Text className="text-sm mb-1 text-gray-700">Nama Belakang</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Nama Belakang"
              className="border border-gray-500 p-2 rounded-lg"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">NIS</Text>
          <TextInput
            value={nis}
            onChangeText={setNis}
            placeholder="NIS"
            className="border border-gray-500 p-2 rounded-lg"
          />
        </View>

        <View className="flex-row mb-4">
          <View className="flex-1 pr-2">
            <Text className="text-sm mb-1 text-gray-700">Umur</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              placeholder="Umur"
              keyboardType="numeric"
              className="border border-gray-500 p-2 rounded-lg"
            />
          </View>

          <View className="flex-1 pl-2">
            <Text className="text-sm mb-1 text-gray-700">Jenis Kelamin</Text>
            <TextInput
              value={gender}
              onChangeText={setGender}
              placeholder="Jenis Kelamin"
              className="border border-gray-500 p-2 rounded-lg"
            />
          </View>
        </View>

        <View className="flex-row mb-4">
          <View className="flex-1 pr-2">
            <Text className="text-sm mb-1 text-gray-700">Kelas</Text>
            <TextInput
              value={className}
              onChangeText={setClassName}
              placeholder="Kelas"
              className="border border-gray-500 p-2 rounded-lg"
            />
          </View>

          <View className="flex-1 pl-2">
            <Text className="text-sm mb-1 text-gray-700">Guru</Text>
            <TextInput
              value={teacher}
              onChangeText={setTeacher}
              placeholder="Guru"
              className="border border-gray-500 p-2 rounded-lg"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Sekolah</Text>
          <TextInput
            value={school}
            onChangeText={setSchool}
            placeholder="Sekolah"
            className="border border-gray-500 p-2 rounded-lg w-full"
          />
        </View>

        <View className="mt-2">
          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-500 p-3 rounded-lg"
          >
            <Text className="text-white text-center text-lg font-semibold text-sm">
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
