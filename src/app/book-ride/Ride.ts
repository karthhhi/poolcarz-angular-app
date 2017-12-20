export class Ride {
    constructor(
    public id: number,
    public offerId: string,
    public name: string,
    public car: string,
    public seatsLeft: number,
    public pickUp: string,
    public destination: string
    ) {}
}
