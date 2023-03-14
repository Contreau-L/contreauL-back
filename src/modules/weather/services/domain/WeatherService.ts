import {getWeatherForToday} from "../api/WeatherAxiosRepository";
import {WeatherApiParams} from "../api/dtt";
import WeatherForecastDTO from "../api/dto/WeatherForecastDTO";

export function retrieveWeatherForecastForToday(insee: string) {
    const params: WeatherApiParams = {token: process.env.API_WEATHER_TOKEN, insee: insee }
    return getWeatherForToday(params)
        .then((forecast: Array<WeatherForecastDTO>) => forecast)
}