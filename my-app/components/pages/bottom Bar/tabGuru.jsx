import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import HomeGuru from "../home/HomeGuru";
import Table from "../studentTable/Table";
import ProfileGuru from "../profile/ProfileGuru";

const Tab = createBottomTabNavigator();

export default function TabGuru({ route }) {
  const { userId } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: ["bg-blue-500", { height: 60 }],
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="homeGuru"
        component={HomeGuru}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="studentTable"
        component={Table}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Student Data",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileGuru"
        component={ProfileGuru}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Teacher Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
