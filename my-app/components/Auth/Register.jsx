import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "react-native-vector-icons";
import { registerSchema } from "./validates/form-regis";
import { supabase } from "../client/supabaseClient";

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-white p-5">
      <View className="absolute top-12 left-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Text className="text-3xl font-bold mb-8 text-blue-500">
        Sign Up Page
      </Text>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (!values.password) {
              throw new Error("Password is required.");
            }

            const { data, error } = await supabase.from("account").insert([
              {
                username: values.username,
                email: values.email,
                password: values.password,
                role: "student",
                account_create: new Date().toISOString(),
                last_login: new Date().toISOString(),
              },
            ]);

            if (error) {
              throw new Error(error.message);
            }

            Alert.alert(
              "Registration Successful",
              `Username: ${values.username}, Email: ${values.email}`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    resetForm();
                    navigation.navigate("Login");
                  },
                },
              ]
            );
          } catch (error) {
            Alert.alert("Registration Failed", error.message);
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
              <Text className="text-lg mb-2 text-gray-700 text-sm">Email</Text>
              <TextInput
                className="border border-gray-300 p-3 rounded-lg w-full text-gray-800"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              {touched.email && errors.email ? (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.email}
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
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-5">
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-blue-500 text-center">
                  Sudah punya akun? <Text className="font-bold">Masuk</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
