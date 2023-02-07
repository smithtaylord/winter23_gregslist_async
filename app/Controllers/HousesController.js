import { appState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawHouses() {
    let template = ''
    appState.houses.forEach(h => template += h.HouseCard)
    setHTML('listing', template)

}

export class HousesController {
    constructor() {
        console.log('Houses Controller Logging!');
    }

    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }
}