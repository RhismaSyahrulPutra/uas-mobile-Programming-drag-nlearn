import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { loginSchema } from "./validates/form-regis";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { supabase } from "../client/supabaseClient";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const showToast = (type, message) => {
    Toast.show({
      type: type,
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
      <View className="absolute top-12 left-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Text className="text-3xl font-bold mb-8 text-blue-500">
        Sign In Page
      </Text>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { resetForm }) => {
          const username = values.username.trim().toLowerCase();
          const password = values.password.trim();

          try {
            const { data, error } = await supabase
              .from("account")
              .select("*")
              .eq("username", username)
              .single();

            if (error) {
              if (error.message.includes("not found")) {
                showToast("error", "User not found");
              } else {
                showToast("error", "An error occurred");
              }
              resetForm();
              return;
            }

            if (data.password !== password) {
              showToast("error", "Invalid password");
              resetForm();
              return;
            }

            showToast("success", `Welcome ${data.username}`);

            if (data.role === "student") {
              navigation.navigate("Tabs", { userId: data.id });
            } else if (data.role === "teacher") {
              navigation.navigate("TabGuru", { userId: data.id });
            } else if (data.role === "admin") {
              navigation.navigate("TabAdmin", { userId: data.id });
            }

            resetForm();
          } catch (error) {
            showToast("error", error.message);
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
                  className="absolute right-3 top-3"
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
