import { SharedArray } from 'k6/data';
export class Generator
{
    constructor()
    {
        this.cities = new SharedArray('pickup-locations', function () {
            return JSON.parse(open('./pickup-locations.json'));
        });

        this.equipments = new SharedArray('equipments', function () {
            return JSON.parse(open('./equipments.json'));
        });

    }
    generate()
    {
     let equipment=this.equipments[Math.floor(Math.random() * this.equipments.length)];  
     let city=this.cities[Math.floor(Math.random() * this.cities.length)];      
     return'pickupLocation='+city+'&equipmentTypeCode='+equipment.equipmentTypeCode+'&equipmentSizeCode='+equipment.equipmentSizeCode+'&EarliestPickupDate=2022-10-02&LatestPickupDate=2022-10-30'
    }
}
