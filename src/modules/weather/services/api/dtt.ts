export type WeatherApiParams = {
    insee: string,
    token?: string,
    latlng?: string,
    world?: boolean,
}

export type City = {
    insee: string
    cp: string
    name: string,
    latitude: number,
    longitude: number,
    altitude: number,

}