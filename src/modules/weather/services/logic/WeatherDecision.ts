import WeatherForecast from "../domain/model/WeatherForecast";
import {retrieveWeatherForecastForNextToday, retrieveWeatherForecastForToday} from "../domain/WeatherService";

let todayWeather: Array<WeatherForecast> = [];
let nextDayWeather: Array<WeatherForecast> = [];
let dateFromLastWeatherUpdate: Date;
let lastInsee: number;

export function isRainExpectedForToday (weatherForecastOfTheDay: Array<WeatherForecast>): boolean {
    let totalRainOfTheDay: number = 0;
    weatherForecastOfTheDay.forEach((weatherForecast: WeatherForecast) => {
        if(weatherForecast.probarain > 60) {
            totalRainOfTheDay += weatherForecast.rr10;
        }
    });
    return totalRainOfTheDay > 0.15;
}

export function isRainExpectedForNext24HoursCheck (weatherForecast: Array<WeatherForecast>): boolean {
    let totalRainOfTheDay: number = 0;
    weatherForecast.forEach((weatherForecast: WeatherForecast) => {
        if(weatherForecast.probarain > 60) {
            totalRainOfTheDay += weatherForecast.rr10;
        }
    });
    return totalRainOfTheDay > 0.15;
}

export function isRainExpectedForNext24Hours(insee: number): Promise<boolean> {
    return checkWeatherValue(insee).then(() => {
        const actualHour = new Date().getHours();
        let weatherForecast: Array<WeatherForecast> = [];
        if (actualHour <= 6) {
            weatherForecast.push(...todayWeather.slice(1), nextDayWeather[0]);
        } else if (actualHour <= 12) {
            weatherForecast.push(...todayWeather.slice(2), ...nextDayWeather.slice(0, 2));
        } else if (actualHour <= 18) {
            weatherForecast.push(...todayWeather.slice(3), ...nextDayWeather.slice(0, 3));
        } else {
            weatherForecast = nextDayWeather;
        }
        return isRainExpectedForNext24HoursCheck(weatherForecast);
    });
}

function checkWeatherValue(insee: number) {
    return checkWeatherDate().then((dateState: boolean) => {
        let promisesList: Array<Promise<any>> = [];
        if (!dateState || lastInsee !== insee) {
            promisesList.push(retrieveWeatherForecastForToday(insee.toString())
                .then((weather: Array<WeatherForecast>) => todayWeather = weather));
            promisesList.push(retrieveWeatherForecastForNextToday(insee.toString())
                .then((weather: Array<WeatherForecast>) => nextDayWeather = weather));
            dateFromLastWeatherUpdate = new Date();
        }
        return Promise.all(promisesList);
    });
}


export function checkWeatherDate() {
    if (dateFromLastWeatherUpdate)
        return Promise.resolve(new Date().getDate() === dateFromLastWeatherUpdate.getDate())
    return Promise.resolve(false);
}