export type WeatherType = {
  wind: { speed: number };
  main: { temp: number; humidity: number; feels_like: number };
  weather: { icon: string }[];
};
