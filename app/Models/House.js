export class House {

    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
    }

    get HouseCard() {

        return `
        <div class="col-md-4 mb-3">
        <div class="card">
          <img src="${this.imgUrl}" class="card-img-top listing-img"
            alt="house">
          <div class="card-body">
            <div class="card-title fs-5">${this.year} ${this.bedrooms} bedrooms| ${this.bathrooms} bathrooms</div>
            <p>$${this.price}</p>
            <p>${this.description ? this.description : "It's a house"}</p>
            <div class="d-flex justify-content-between">
            <button class="btn ms-1 btn-danger" type="button" onclick="app.housesController.removeHouse('${this.id}')">Delete Car!</button>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn ms-1 btn-info" type="button" onclick="app.housesController.drawForm('${this.id}')">Edit House!</button>
            </div>
            </div>
        </div>
      </div>
    `
    }
}