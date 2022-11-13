import { SharedArray } from 'k6/data';
export class Generator {
    constructor() {

        this.zipcodes = new SharedArray('zipcodes', function () {
            return JSON.parse(open('./zip-code.json'));
        });

    }
    generate() {
        let zipcode = this.zipcodes[Math.floor(Math.random() * this.zipcodes.length)];
        return 'in/' + zipcode;
    }
}
