export class Offerride {
    public name: string;
    public pickUp: string;
    public destination: string;
    public car: string;
    public seatsLeft: number;

    constructor() {
        this.name = '';
        this.pickUp = '';
        this.destination = '';
        this.car = '';
        this.seatsLeft = 0;
    }
}
