export default class WinePrice {
  constructor({ id, wineId, price, date }) {
    this.id = id;
    this.wineId = wineId;
    this.price = price;
    this.date = date;
  }
  id?: string;
  wineId: string;
  price: number;
  date?: Date;
}
