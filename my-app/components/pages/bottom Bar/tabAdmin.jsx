import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "react-native-vector-icons";
import StudentDataAdmin from "../admin/StudentDataAdmin";
import TeacherDataAdmin from "../admin/TeacherDataAdmin";

const Tab = createBottomTabNavigator();

export default function TabAdmin({ route }) {
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
        name="TeacherDataAdmin"
        component={TeacherDataAdmin}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Teacher Data",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="StudentDataAdmin"
        component={StudentDataAdmin}
        initialParams={{ userId }}
        options={{
          tabBarLabel: "Student Data",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
