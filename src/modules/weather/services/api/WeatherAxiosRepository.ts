import axios, {AxiosResponse} from "axios";
import {getWeatherForTodayUrl, weatherQueryBuilder} from "./urls";
import {WeatherApiParams} from "./dtt";
import WeatherForecastPeriodsDTO from "./dto/WeatherForecastPeriodsDTO";

export function getWeatherForToday(params: WeatherApiParams) {
    return axios
        .get(getWeatherForTodayUrl(weatherQueryBuilder(params)))
        .then((response:AxiosResponse<WeatherForecastPeriodsDTO>) => response.data.forecast )
}