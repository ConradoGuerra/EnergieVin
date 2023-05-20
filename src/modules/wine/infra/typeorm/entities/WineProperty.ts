export default class WineProperty {
  constructor({ id, wineId, name, value }) {
    this.id = id;
    this.wineId = wineId;
    this.name = name;
    this.value = value;
  }
  id?: number;
  wineId: string;
  name: string;
  value: string | number;
}
