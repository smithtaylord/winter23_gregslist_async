import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { sandboxApi } from "./AxiosService.js"

class HousesService {
    async getHouses() {
        const res = await sandboxApi.get('/houses')
        console.log('[getHouses]', res.data);
        const newArray = res.data.map(h => new House(h))
        appState.houses = newArray
        console.log('[appState Houses]', appState.houses)
    }

}

export const housesService = new HousesService()