export interface IWineDataDTO {
  name: string;
  property: {
    origin: string;
    color: string;
    year: number;
  };
  price: number;
  website: string;
  date: Date;
}
