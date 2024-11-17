import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";

// Import Pages
// Starting Page
import Welcome from "./components/Auth/welcome";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
// Flow Register
import RegisForm from "./components/pages/formRegistration/RegisForm";
// Home Page
import Tabs from "./components/pages/bottom Bar/tabs";
import TabGuru from "./components/pages/bottom Bar/tabGuru";
import TabAdmin from "./components/pages/bottom Bar/tabAdmin";
// Course Page
import PassCourse from "./components/pages/course/materi/PassCourse";
import FactOrHoax from "./components/pages/course/materi/FactOrHoax";
import PersonalAndPublic from "./components/pages/course/materi/PersonalAndPublic";
// Game Page
import FactOrHoaxGame from "./components/pages/course/game/FactOrHoaxGame";
import PassCourseGame from "./components/pages/course/game/PassCourseGame";
import PersonalAndPublicGame from "./components/pages/course/game/PersonalAndPublicGame";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Starting Page */}
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={Welcome}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />
        {/* Tabs */}
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
        <Stack.Screen
          name="TabGuru"
          options={{ headerShown: false }}
          component={TabGuru}
        />
        <Stack.Screen
          name="TabAdmin"
          options={{ headerShown: false }}
          component={TabAdmin}
        />
        {/* Form Register */}
        <Stack.Screen
          name="FormRegis"
          options={{ headerShown: false }}
          component={RegisForm}
        />

        <Stack.Screen
          name="FactOrHoax"
          options={{ headerShown: false }}
          component={FactOrHoax}
        />

        <Stack.Screen
          name="PassCourse"
          options={{ headerShown: false }}
          component={PassCourse}
        />

        <Stack.Screen
          name="PersonalAndPublic"
          options={{ headerShown: false }}
          component={PersonalAndPublic}
        />

        {/* Game */}
        <Stack.Screen
          name="FactOrHoaxGame"
          options={{ headerShown: false }}
          component={FactOrHoaxGame}
        />

        <Stack.Screen
          name="PassCourseGame"
          options={{ headerShown: false }}
          component={PassCourseGame}
        />

        <Stack.Screen
          name="PersonalAndPublicGame"
          options={{ headerShown: false }}
          component={PersonalAndPublicGame}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
