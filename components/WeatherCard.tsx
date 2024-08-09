import { View, Text, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const WeatherCard = () => {
  return (
    <View
      style={tw`w-40 bg-gray-700 h-40 mr-3 rounded-xl items-center justify-center gap-y-3`}
    >
      <Image
        source={require("../assets/images/clear.png")}
        style={tw`w-16 h-16`}
        resizeMode="stretch"
      />
      <View style={tw`items-center gap-y-1.5`}>
        <Text style={tw`text-white text-2xl font-bold`}>10 °C</Text>
        <Text style={tw`text-white`}>Sat</Text>
      </View>
    </View>
  );
};

export default WeatherCard;
