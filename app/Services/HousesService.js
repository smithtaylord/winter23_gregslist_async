import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { sandboxApi } from "./AxiosService.js"

class HousesService {
    async editHouse(formData, houseId) {
        const res = await sandboxApi.put(`/houses/${houseId}`, formData)
        let oldHouseIndex = appState.houses.findIndex(h => h.id == houseId)
        appState.houses.splice(oldHouseIndex, 1, new House(res.data))
        appState.emit('houses')
    }
    async removeHouse(houseId) {
        const res = await sandboxApi.delete('/houses/' + houseId)
        // console.log('[removing house]', res.data);
        appState.houses = appState.houses.filter(h => h.id != houseId)

    }
    async createHouse(formData) {
        const res = await sandboxApi.post('/houses/', formData)
        // console.log('[create house]', res.data);
        let actualHouse = new House(res.data)
        appState.houses.push(actualHouse)
        appState.emit('houses')
    }
    async getHouses() {
        const res = await sandboxApi.get('/houses')
        // console.log('[getHouses]', res.data);
        const newArray = res.data.map(h => new House(h))
        appState.houses = newArray
        // console.log('[appState Houses]', appState.houses)
    }

}

export const housesService = new HousesService()