export default interface WineDataDTO {
  id: string;
  website: string;
  date: Date;
  prices: [];
  properties: [{ [key: string]: unknown }];
}
