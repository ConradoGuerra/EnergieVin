import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("wines")
export default class Wine {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  date: Date;
}
