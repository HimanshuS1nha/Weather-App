import { Text } from "react-native";
import tw from "twrnc";

import SafeView from "@/components/SafeView";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/home"), 400);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <SafeView style={tw`justify-center items-center`}>
      <Text style={tw`text-white`}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </SafeView>
  );
}
