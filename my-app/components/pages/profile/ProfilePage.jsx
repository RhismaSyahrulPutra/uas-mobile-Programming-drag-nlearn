import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../../client/supabaseClient";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [className, setClassName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const route = useRoute();
  const { userId } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("profile_image, full_name, birth_date, gender, class")
          .eq("account_id", userId)
          .single();

        const { data: accountData, error: accountError } = await supabase
          .from("account")
          .select("username, email, role")
          .eq("id", userId)
          .single();

        if (profileError || accountError) {
          console.error("Error fetching data:", profileError || accountError);
        } else {
          setFullName(profileData.full_name);
          setGender(profileData.gender);
          setClassName(profileData.class);
          setProfileImage(profileData.profile_image);
          setUsername(accountData.username);
          setEmail(accountData.email);
          setRole(accountData.role);

          if (profileData.birth_date) {
            const birthDateObject = new Date(profileData.birth_date);
            setBirthDate(birthDateObject);

            const ageDiff =
              new Date().getFullYear() - birthDateObject.getFullYear();
            const m = new Date().getMonth() - birthDateObject.getMonth();
            if (
              m < 0 ||
              (m === 0 && new Date().getDate() < birthDateObject.getDate())
            ) {
              ageDiff--;
            }
            setAge(ageDiff);
          } else {
            console.error("Invalid birth_date format:", profileData.birth_date);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleLogout = () => {
    alert("Logout Successful");
    navigation.navigate("Welcome");
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(false);
    setBirthDate(currentDate);

    const ageDiff = new Date().getFullYear() - currentDate.getFullYear();
    const m = new Date().getMonth() - currentDate.getMonth();
    if (m < 0 || (m === 0 && new Date().getDate() < currentDate.getDate())) {
      ageDiff--;
    }
    setAge(ageDiff);
  };

  const updateProfileAndAccount = async () => {
    try {
      const { error: profileError } = await supabase
        .from("profile")
        .update({
          full_name: fullName,
          birth_date: birthDate.toISOString().split("T")[0],
          gender: gender,
          class: className,
          age: age,
        })
        .eq("account_id", userId);

      const { error: accountError } = await supabase
        .from("account")
        .update({
          username: username,
          email: email,
        })
        .eq("id", userId);

      if (profileError || accountError) {
        console.error("Error updating data:", profileError || accountError);
        Alert.alert("Error", "Failed to update profile and account");
      } else {
        Alert.alert("Success", "Profile and account updated successfully");
      }
    } catch (err) {
      console.error("Error updating data:", err);
      Alert.alert("Error", "Failed to update profile and account");
    }
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
            source={
              profileImage
                ? { uri: profileImage }
                : { uri: "https://via.placeholder.com/150" }
            }
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Nama Lengkap</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nama Lengkap"
            className="border border-gray-400 p-2 rounded-lg h-12"
          />
        </View>

        <View className="mb-4 items-center">
          <Text className="text-sm mb-1 text-gray-700">Tanggal Lahir</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border border-gray-400 p-2 rounded-lg h-12 justify-center items-center"
          >
            <Text>{birthDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Umur</Text>
          <TextInput
            value={age.toString()}
            onChangeText={setAge}
            placeholder="Umur"
            keyboardType="numeric"
            editable={false}
            className="border border-gray-400 p-2 rounded-lg h-12"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Jenis Kelamin</Text>
          <View className="border border-gray-400 rounded-lg h-12 justify-center">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{ height: 100 }}
            >
              <Picker.Item label="Pilih Jenis Kelamin" value="" />
              <Picker.Item label="Laki-Laki" value="Laki-Laki" />
              <Picker.Item label="Perempuan" value="Perempuan" />
            </Picker>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-sm mb-1 text-gray-700">Kelas</Text>
          <View className="border border-gray-400 rounded-lg h-12 justify-center">
            <Picker
              selectedValue={className}
              onValueChange={(itemValue) => setClassName(itemValue)}
              style={{ height: 100 }}
            >
              <Picker.Item label="Pilih Kelas" value="" />
              <Picker.Item label="10A" value="10A" />
              <Picker.Item label="10B" value="10B" />
              <Picker.Item label="10C" value="10C" />
            </Picker>
          </View>
        </View>
        <Text className="text-xl font-semibold mb-2">Account Settings</Text>
        <View className="border-t border-gray-400 mb-4" />

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            className="border border-gray-400 p-2 rounded-lg h-12"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            className="border border-gray-400 p-2 rounded-lg h-12"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm mb-1 text-gray-700">Role</Text>
          <TextInput
            value={role}
            onChangeText={setRole}
            placeholder="Role"
            editable={false}
            className="border border-gray-400 p-2 rounded-lg h-12"
          />
        </View>

        <TouchableOpacity
          onPress={updateProfileAndAccount}
          className="bg-blue-500 py-3 rounded-lg mb-4 mt-4"
        >
          <Text className="text-center text-white font-semibold">
            Save Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 py-3 rounded-lg"
        >
          <Text className="text-center text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
