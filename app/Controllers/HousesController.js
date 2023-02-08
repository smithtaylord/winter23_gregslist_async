import { appState } from "../AppState.js";
import { House } from "../Models/House.js";
import { housesService } from "../Services/HousesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawHouses() {
    let template = ''
    appState.houses.forEach(h => template += h.HouseCard)
    setHTML('listings', template)
    setHTML('modal-content', House.HouseForm({}))
    setHTML('form-button', House.FormButton())

}

// NOTE CRUD METHODS
// ✅ CREATE || POST 
// ✅ READ || GET
// ⬛ UPDATE || PUT
// ✅ DESTROY || DELETE

export class HousesController {
    constructor() {
        appState.on('houses', _drawHouses)
    }

    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }
    }

    async createHouse() {
        try {
            // @ts-ignore
            window.event.preventDefault()
            // @ts-ignore
            const form = window.event.target
            const formData = getFormData(form)
            // console.log(formData);
            await housesService.createHouse(formData)
            // @ts-ignore
            form.reset()
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }

    }

    async removeHouse(houseId) {
        try {
            if (await Pop.confirm()) {
                await housesService.removeHouse(houseId)
            }
        } catch (error) {
            Pop.error(error.message)
            console.error(error)
        }

    }

    drawForm(houseId) {
        try {
            if (houseId) {
                let house = appState.houses.find(h => h.id == houseId)
                setHTML('modal-content', House.HouseForm(house))
            } else {
                setHTML('modal-content', House.HouseForm({}))
            }
        } catch (error) {
            Pop.error(error.message)
            console.error(error);
        }
    }
    async editHouse(houseId) {
        try {
            // @ts-ignore
            window.event.preventDefault()
            // @ts-ignore
            const form = window.event.target
            const formData = getFormData(form)
            await housesService.editHouse(formData, houseId)

        } catch (error) {
            console.error(error);
            Pop.error(error.message)
        }
    }

}