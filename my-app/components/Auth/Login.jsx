import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { loginSchema } from "./validates/form-regis";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message"; // Import toast

// Dummy user credentials
const dummyUser = {
  username: "user1",
  password: "useruser1",
  role: "murid",
};
const dummyTeacher = {
  username: "guru1",
  password: "guruguru1",
  role: "guru",
};
const dummyAdmin = {
  username: "admin1",
  password: "adminadmin1",
  role: "guru",
};

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const showToast = (type, message) => {
    Toast.show({
      type: type, // 'success' or 'error'
      position: "top",
      text1: type === "success" ? "Login Successful" : "Login Failed",
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      {/* Back Button */}
      <View className="absolute top-12 left-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Text className="text-3xl font-bold mb-8 text-gray-800">Login</Text>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, { resetForm }) => {
          const username = values.username.trim().toLowerCase();
          const password = values.password.trim();

          // Check for dummyUser credentials
          if (
            username === dummyUser.username.toLowerCase() &&
            password === dummyUser.password
          ) {
            showToast("success", `Welcome ${dummyUser.username}`);
            resetForm();
            navigation.navigate("Tabs");
          }
          // Check for dummyTeacher credentials
          else if (
            username === dummyTeacher.username.toLowerCase() &&
            password === dummyTeacher.password
          ) {
            showToast("success", `Welcome ${dummyTeacher.username}`);
            resetForm();
            navigation.navigate("TabGuru");
          } else if (
            username === dummyAdmin.username.toLowerCase() &&
            password === dummyAdmin.password
          ) {
            showToast("success", `Welcome ${dummyAdmin.username}`);
            resetForm();
            navigation.navigate("TabAdmin");
          }
          // Invalid credentials
          else {
            showToast("error", "Invalid username or password");
            resetForm();
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="w-full">
            {/* Username Input */}
            <View className="my-4">
              <Text className="text-lg mb-2 text-gray-700 text-sm">
                Username
              </Text>
              <TextInput
                className="border border-gray-300 p-3 rounded-lg w-full text-gray-800"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholder="Enter your username"
              />
              {touched.username && errors.username ? (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.username}
                </Text>
              ) : null}
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-lg mb-2 text-gray-700 text-sm">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  className="border border-gray-300 p-3 rounded-lg w-full text-gray-800"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Enter your password"
                  secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-4"
                >
                  <Ionicons
                    name={passwordVisible ? "eye" : "eye-off"}
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password ? (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.password}
                </Text>
              ) : null}
            </View>

            {/* Login Button */}
            <View className="mt-4">
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-blue-500 p-3 rounded-lg"
              >
                <Text className="text-white text-center text-lg font-semibold text-sm">
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            {/* Navigate to Register */}
            <View className="mt-5">
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text className="text-blue-500 text-center">
                  Belum memiliki akun? <Text className="font-bold">Daftar</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
