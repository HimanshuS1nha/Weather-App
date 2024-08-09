import {
  View,
  TextInput,
  Pressable,
  Text,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Feather, Entypo } from "@expo/vector-icons";

import SafeView from "@/components/SafeView";
import WeatherCard from "@/components/WeatherCard";

const Home = () => {
  return (
    <SafeView style={tw`gap-y-8`}>
      <View style={tw`px-4 pt-3 flex-row gap-x-4 items-center`}>
        <TextInput
          style={tw`border border-white px-5 py-2 rounded-full w-[87%]`}
          placeholder="Search city"
          placeholderTextColor={"#d1d5db"}
        />
        <Pressable style={tw`bg-purple-800 p-2 rounded-full`}>
          <Feather name="search" size={26} color="white" />
        </Pressable>
      </View>

      <View style={tw`gap-y-6 items-center`}>
        <Image
          source={require("../assets/images/clear.png")}
          style={tw`w-48 h-48`}
          resizeMode="stretch"
        />
        <View style={tw`gap-y-3 items-center`}>
          <Text style={tw`text-white text-6xl font-semibold`}>15 °C</Text>
          <Text style={tw`text-white text-2xl font-semibold`}>Delhi</Text>
        </View>

        <View style={tw`w-[80%] flex-row justify-between`}>
          <View style={tw`flex-row items-center gap-x-4`}>
            <Entypo name="air" size={22} color="white" />
            <View>
              <Text style={tw`font-medium text-white text-lg`}>60%</Text>
              <Text style={tw`text-white text-xs`}>Humidity</Text>
            </View>
          </View>
          <View style={tw`flex-row items-center gap-x-4`}>
            <Feather name="wind" size={22} color="white" />
            <View>
              <Text style={tw`font-medium text-white text-lg`}>2.5 kmph</Text>
              <Text style={tw`text-white text-xs`}>Wind Speed</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={tw`px-3 gap-y-5 mt-4`}>
        <Text style={tw`text-white text-xl font-semibold ml-1.5`}>
          7 Day Forecast
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw``}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((_, i) => {
            return <WeatherCard key={i} />;
          })}
        </ScrollView>
      </View>
    </SafeView>
  );
};

export default Home;
