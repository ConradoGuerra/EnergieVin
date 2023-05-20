export default interface CreateWinePriceDTO {
  id?: string;
  wineId: string;
  price: number;
  date?: Date;
}
