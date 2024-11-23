import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import HomePage from "../home/HomePage";
import CoursePage from "../course/CoursePage";
import ProfilePage from "../profile/ProfilePage";

const Tab = createBottomTabNavigator();

export default function Tabs({ route }) {
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
        name="HomePage"
        component={HomePage}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="CoursePage"
        component={CoursePage}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Courses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
