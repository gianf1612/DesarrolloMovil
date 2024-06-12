import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { TRPCProvider } from "../utils/api";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";

export default function RootLayout() {
  return (
    <ClerkProvider
        publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
      >
    <TRPCProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#015b96",
          },
          headerTitleStyle: {
            color: "white",
          },
          contentStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />
      <StatusBar />      
    </TRPCProvider>
    </ClerkProvider>
  );
}
