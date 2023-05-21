import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Wine from "./Wine";

@Entity("wine_prices")
export default class WinePrice {
  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => Wine, { onDelete: "CASCADE" })
  @JoinColumn({ name: "wineId" })
  wineId: Wine;

  @Column()
  price: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: Date;
}
