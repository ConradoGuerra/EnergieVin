import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Wine from "./Wine";

@Entity("wine_properties")
export default class WineProperty {
  @PrimaryColumn()
  id?: string;

  @ManyToOne(() => Wine, { onDelete: "CASCADE" })
  @JoinColumn({ name: "wineId" })
  wineId: Wine;

  @Column()
  name: string;

  @Column()
  value: string;
}
