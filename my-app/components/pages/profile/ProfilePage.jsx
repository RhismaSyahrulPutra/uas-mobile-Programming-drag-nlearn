import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function ProfilePage() {
  const [fullName, setFullName] = useState(""); // Ini untuk Nama Lengkap
  const [noAbsen, setNoAbsen] = useState(""); // Ini untuk No Absen
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigation = useNavigation();

  const handleLogout = () => {
    alert("Logout Successful");
    navigation.navigate("Welcome");
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white pt-10 pb-3 px-5 flex justify-center items-start shadow-lg fixed top-0 left-0 right-0 z-10">
        <Text className="text-blue-500 text-lg font-bold">Profile Page</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex items-center mb-4">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Nama Lengkap</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nama Lengkap"
            className="border border-gray-500 p-2 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Umur</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Umur"
            keyboardType="numeric"
            className="border border-gray-500 p-2 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Jenis Kelamin</Text>
          <View className="border border-gray-500 p-2 rounded-lg h-12 justify-center">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{ height: 40 }} // Atur tinggi agar sejajar
            >
              <Picker.Item label="Pilih Jenis Kelamin" value="" />
              <Picker.Item label="Laki-laki" value="Laki-laki" />
              <Picker.Item label="Perempuan" value="Perempuan" />
            </Picker>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Kelas</Text>
          <View className="border border-gray-500 p-2 rounded-lg h-12 justify-center">
            <Picker
              selectedValue={className}
              onValueChange={(itemValue) => setClassName(itemValue)}
              style={{ height: 40 }} // Atur tinggi agar sejajar
            >
              <Picker.Item label="Pilih Kelas" value="" />
              <Picker.Item label="10A" value="10A" />
              <Picker.Item label="10B" value="10B" />
              <Picker.Item label="10C" value="10C" />
            </Picker>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">No Absen</Text>
          <TextInput
            value={noAbsen}
            onChangeText={setNoAbsen}
            placeholder="No Absen"
            className="border border-gray-500 p-2 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Guru</Text>
          <TextInput
            value={teacher}
            onChangeText={setTeacher}
            placeholder="Guru"
            className="border border-gray-500 p-2 rounded-lg"
          />
        </View>

        <View className="mb-4 border-b border-gray-300">
          <Text className="text-gray-500 text-xl">Account</Text>
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            className="border border-gray-500 p-2 rounded-lg w-full"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            className="border border-gray-500 p-2 rounded-lg"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            className="border border-gray-500 p-2 rounded-lg"
          />
        </View>

        <View className="mt-2">
          <TouchableOpacity
            className="bg-blue-500 p-3 rounded-lg"
            onPress={() => alert("Update")}
          >
            <Text className="text-white text-center text-lg font-semibold text-sm">
              Update
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <TouchableOpacity
            className="bg-red-500 p-3 rounded-lg"
            onPress={handleLogout}
          >
            <Text className="text-white text-center text-lg font-semibold text-sm">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
