import WeatherForecast from "../domain/model/WeatherForecast";

export function isRainExpectedForToday (weatherForecastOfTheDay: Array<WeatherForecast>): boolean {
    let totalRainOfTheDay: number = 0;
    weatherForecastOfTheDay.forEach((weatherForecast: WeatherForecast) => {
        if(weatherForecast.probarain > 50) {
            totalRainOfTheDay += weatherForecast.rr10;
        }
    });
    return totalRainOfTheDay > 0.15;
}