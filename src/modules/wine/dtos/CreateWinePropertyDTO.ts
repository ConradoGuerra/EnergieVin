export default interface CreateWinePropertyDTO {
  id?: number;
  wineId: number;
  wineProperty: {
    origin: string;
    color: string;
    year: number;
  };
}
