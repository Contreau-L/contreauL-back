import {WeatherApiParams} from "./dtt";
import * as querystring from "querystring";

export function getWeatherForTodayUrl(query?: string) {
    return process.env.API_WEATHER_URL + "/forecast/daily/0/periods" + query;
}

export function weatherQueryBuilder(params: WeatherApiParams) {

    return "?" + querystring.stringify({token: params.token, insee: params.insee});
}