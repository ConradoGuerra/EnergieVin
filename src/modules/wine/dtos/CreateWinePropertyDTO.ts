export default interface CreateWinePropertyDTO {
  id?: string;
  wineId: string;
  wineProperty: {
    name: string;
    origin: string;
    color: string;
    year: number;
  };
}
