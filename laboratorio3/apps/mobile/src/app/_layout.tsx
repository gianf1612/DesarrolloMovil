import { Slot, router } from "expo-router";
import { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { TRPCProvider } from "../utils/api";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return null;
    }
  },
};

const Layout = () => {
  const auth = useAuth();
  useEffect(() => {
    if (auth.isSignedIn) {
      router.push("/home");
    } else {
      router.push("/signIn");
    }
  }, [auth.isSignedIn]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY??""}
    >
      <TRPCProvider>
        <Layout />
      </TRPCProvider>
    </ClerkProvider>
  );
}