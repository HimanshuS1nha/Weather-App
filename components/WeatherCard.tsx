import { View, Text, Image } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";

import type { WeatherType } from "@/types";

const WeatherCard = ({ data }: { data: WeatherType }) => {
  const parseImageUrl = useCallback(() => {
    if (data.weather[0].icon.includes("d")) {
      return `https://openweathermap.org/img/wn/${
        data.weather[0].icon.split("d")[0]
      }n@2x.png`;
    } else {
      return `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
  }, [data]);
  return (
    <View
      style={tw`w-40 bg-purple-900 h-40 mr-3 rounded-xl items-center justify-center`}
    >
      <Image
        source={{ uri: parseImageUrl() }}
        style={tw`w-20 h-20`}
        resizeMode="stretch"
      />
      <View style={tw`items-center gap-y-1.5`}>
        <Text style={tw`text-white text-2xl font-bold`}>
          {Math.floor(data.main.temp)} °C
        </Text>
        <Text style={tw`text-white`}>Sat</Text>
      </View>
    </View>
  );
};

export default WeatherCard;
