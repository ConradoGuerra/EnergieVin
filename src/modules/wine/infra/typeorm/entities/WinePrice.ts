import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Wine from "./Wine";

@Entity("wine_prices")
export default class WinePrice {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @ManyToOne(() => Wine, { onDelete: "CASCADE" })
  @JoinColumn({ name: "wineId" })
  wineId: number;

  @Column({ name: "price", type: "decimal" })
  price: any;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
