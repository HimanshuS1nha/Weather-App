import { View, Text, Image } from "react-native";
import React, { useCallback } from "react";
import tw from "twrnc";

import type { WeatherType } from "@/types";

const WeatherCard = ({ data }: { data: WeatherType }) => {
  const parseImageUrl = useCallback(() => {
    const icon = data.weather[0].icon;

    if (icon === "01d" || icon === "01n") {
      return require("../assets/images/clear.png");
    } else if (icon === "02d" || icon === "02n") {
      return require("../assets/images/cloud.png");
    } else if (icon === "03d" || icon === "03n") {
      return require("../assets/images/cloud.png");
    } else if (icon === "04d" || icon === "04n") {
      return require("../assets/images/drizzle.png");
    } else if (icon === "09d" || icon === "09n") {
      return require("../assets/images/rain.png");
    } else if (icon === "10d" || icon === "10n") {
      return require("../assets/images/rain.png");
    } else if (icon === "11d" || icon === "11n") {
      return require("../assets/images/rain.png");
    } else if (icon === "13d" || icon === "13n") {
      return require("../assets/images/snow.png");
    } else if (icon === "50d" || icon === "50n") {
      return require("../assets/images/mist.png");
    }
  }, [data]);

  const parseTime = useCallback(() => {
    return `${data.dt_txt.split(" ")[1].split(":")[0]}:${
      data.dt_txt.split(" ")[1].split(":")[1]
    }`;
  }, [data]);

  return (
    <View
      style={tw`w-44 bg-blue-950 h-44 mr-3 rounded-xl items-center justify-center gap-y-1.5`}
    >
      <Image
        source={parseImageUrl()}
        style={tw`w-20 h-20`}
        resizeMode="stretch"
      />
      <View style={tw`items-center gap-y-1`}>
        <Text style={tw`text-white text-2xl font-bold`}>
          {Math.floor(data.main.temp)} °C
        </Text>
        <Text style={tw`text-gray-300`}>{parseTime()}</Text>
      </View>
    </View>
  );
};

export default WeatherCard;
