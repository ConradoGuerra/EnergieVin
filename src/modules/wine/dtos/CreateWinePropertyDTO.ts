export default interface CreateWinePropertyDTO {
  id?: string;
  wineId: string;
  wineProperty: {
    origin: string;
    color: string;
    year: number;
  };
}
