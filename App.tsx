import * as SplashScreen from "expo-splash-screen";
import React from "react";
import Routes from "./src/routes";
import { appHook } from "./src/shared/hooks/app.hook";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { loaded, error } = appHook();

  if (!loaded && !error) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Routes />;
}
