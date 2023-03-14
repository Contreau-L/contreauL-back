import {City} from "../dtt";
import WeatherForecastDTO from "./WeatherForecastDTO";

class WeatherForecastPeriodsDTO {
    city: City;
    update: string;
    forecast: Array<WeatherForecastDTO>;

    constructor(city: City, update: string, forecast: Array<WeatherForecastDTO>) {
        this.city = city;
        this.update = update;
        this.forecast = forecast;
    }
}

export default WeatherForecastPeriodsDTO;