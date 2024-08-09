export type WeatherType = {
  wind: { speed: number };
  main: { temp: number; humidity: number };
  weather: { icon: string }[];
};
