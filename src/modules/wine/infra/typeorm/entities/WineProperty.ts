import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Wine from "./Wine";

@Entity("wine_properties")
export default class WineProperty {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @ManyToOne(() => Wine, { onDelete: "CASCADE" })
  @JoinColumn({ name: "wineId" })
  wineId: number;

  @Column()
  name: string;

  @Column()
  value: string;
}
