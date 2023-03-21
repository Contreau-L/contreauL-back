class WeatherForecast {
    insee: string;
    cp: number;
    latitude: number;
    longitude: number;
    datetime: string;
    wind10m: number;
    gust10m: number;
    dirwind10m: number;
    probafrost: number;
    probafog: number;
    probawind70: number;
    probawind100: number;
    day: number;
    period: number;
    temp2m: number;
    rh2m: number;
    rr10: number;
    rr1: number;
    probarain: number;
    gustx: number;


    constructor(insee: string, cp: number, latitude: number, longitude: number, datetime: string, wind10m: number, gust10m: number, dirwind10m: number, probafrost: number, probafog: number, probawind70: number, probawind100: number, day: number, period: number, temp2m: number, rh2m: number, rr10: number, rr1: number, probarain: number, gustx: number) {
        this.insee = insee;
        this.cp = cp;
        this.latitude = latitude;
        this.longitude = longitude;
        this.datetime = datetime;
        this.wind10m = wind10m;
        this.gust10m = gust10m;
        this.dirwind10m = dirwind10m;
        this.probafrost = probafrost;
        this.probafog = probafog;
        this.probawind70 = probawind70;
        this.probawind100 = probawind100;
        this.day = day;
        this.period = period;
        this.temp2m = temp2m;
        this.rh2m = rh2m;
        this.rr10 = rr10;
        this.rr1 = rr1;
        this.probarain = probarain;
        this.gustx = gustx;
    }
}

export default WeatherForecast;