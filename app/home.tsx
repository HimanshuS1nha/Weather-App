import {
  View,
  TextInput,
  Pressable,
  Text,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import tw from "twrnc";
import { Feather, Entypo,FontAwesome5 } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import SafeView from "@/components/SafeView";
import WeatherCard from "@/components/WeatherCard";
import type { WeatherType } from "@/types";

const Home = () => {
  const [city, setCity] = useState(SecureStore.getItem("city") || "delhi");
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState<
    (WeatherType & { forecastData: WeatherType[] }) | null
  >(null);

  const handleChange = useCallback((value: string) => setSearchCity(value), []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-weather"],
    queryFn: async () => {
      const { data } = (await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${
          process.env.EXPO_PUBLIC_API_KEY
        }&units=metric`
      )) as { data: WeatherType };

      const { data: forecastData } = (await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.toLowerCase()}&appid=${
          process.env.EXPO_PUBLIC_API_KEY
        }&units=metric`
      )) as { data: { list: WeatherType[] } };

      return { ...data, forecastData: forecastData.list.slice(0, 10) };
    },
  });
  if (error) {
    console.log(error);
    Alert.alert("Error", "Some error occured. Please try again later!");
  }

  const { mutate: handleSearch, isPending } = useMutation({
    mutationKey: ["get-weather" + city],
    mutationFn: async () => {
      Keyboard.dismiss();
      if (searchCity.length === 0) {
        throw new Error("Please fill in a city");
      }

      SecureStore.setItem("city", searchCity);

      const { data } = (await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.toLowerCase()}&appid=${
          process.env.EXPO_PUBLIC_API_KEY
        }&units=metric`
      )) as { data: WeatherType };

      const { data: forecastData } = (await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity.toLowerCase()}&appid=${
          process.env.EXPO_PUBLIC_API_KEY
        }&units=metric`
      )) as { data: { list: WeatherType[] } };

      return { ...data, forecastData: forecastData.list.slice(0, 10) };
    },
    onSuccess: (data) => {
      setWeatherData(data);
      setCity(searchCity);
      setSearchCity("");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const parseImageUrl = useCallback(() => {
    if (weatherData?.weather[0].icon.includes("d")) {
      return `https://openweathermap.org/img/wn/${
        weatherData?.weather[0].icon.split("d")[0]
      }n@2x.png`;
    } else {
      return `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
    }
  }, [weatherData]);

  useEffect(() => {
    if (data) {
      setWeatherData(data);
    }
  }, [data]);
  return (
    <SafeView style={tw`gap-y-8`}>
      <View style={tw`px-4 pt-3 flex-row gap-x-4 items-center`}>
        <TextInput
          style={tw`border border-white px-5 py-2 rounded-full w-[87%] text-white`}
          placeholder="Search city"
          placeholderTextColor={"#d1d5db"}
          value={searchCity}
          onChangeText={handleChange}
        />
        <Pressable
          style={tw`bg-purple-900 p-2 rounded-full`}
          onPress={() => handleSearch()}
          disabled={isPending}
        >
          <Feather name="search" size={26} color="white" />
        </Pressable>
      </View>

      {isLoading || isPending ? (
        <ActivityIndicator color={"violet"} size={40} />
      ) : (
        <>
          <View style={tw`gap-y-6 items-center`}>
            <Image
              source={{
                uri: parseImageUrl(),
              }}
              style={tw`w-48 h-48`}
              resizeMode="stretch"
            />
            <View style={tw`gap-y-3 items-center`}>
              <Text style={tw`text-white text-6xl font-semibold`}>
                {Math.floor(weatherData?.main.temp as number)} °C
              </Text>
              <Text style={tw`text-white text-2xl font-semibold capitalize`}>
                {city || "Delhi"}
              </Text>
            </View>

            <View style={tw`w-[80%] flex-row justify-between`}>
              <View style={tw`flex-row items-center gap-x-4`}>
                <Entypo name="air" size={22} color="white" />
                <View>
                  <Text style={tw`font-medium text-white text-lg`}>
                    {weatherData?.main.humidity}%
                  </Text>
                  <Text style={tw`text-white text-xs`}>Humidity</Text>
                </View>
              </View>
              <View style={tw`flex-row items-center gap-x-4`}>
                <Feather name="wind" size={22} color="white" />
                <View>
                  <Text style={tw`font-medium text-white text-lg`}>
                    {weatherData?.wind.speed} kmph
                  </Text>
                  <Text style={tw`text-white text-xs`}>Wind Speed</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`px-3 gap-y-5 mt-4`}>
            <Text style={tw`text-white text-xl font-semibold ml-1.5`}>
              Hourly Forecast
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw``}
            >
              {weatherData?.forecastData?.map((data, i) => {
                return <WeatherCard key={i} data={data} />;
              })}
            </ScrollView>
          </View>
        </>
      )}
    </SafeView>
  );
};

export default Home;
