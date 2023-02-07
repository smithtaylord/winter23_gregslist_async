import { sandboxApi } from "./AxiosService.js"

class HousesService {
    async getHouses() {
        const res = await sandboxApi.get('/houses')
        console.log('[getHouses]', res.data);
    }

}

export const housesService = new HousesService()