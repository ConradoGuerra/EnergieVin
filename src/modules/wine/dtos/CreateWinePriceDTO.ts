export default interface CreateWinePriceDTO {
  id?: number;
  wineId: number;
  price: number;
  date?: Date;
}
