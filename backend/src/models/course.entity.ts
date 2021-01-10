import {Entity, PrimaryKey, Property} from "@mikro-orm/core";


@Entity()
export class CourseEntity {

  @PrimaryKey()
  id!: number;

  @Property({type: "text"})
  title!: string;

  @Property({type: "date"})
  createdAt = new Date();

  @Property({type: "date", onUpdate: () => new Date()})
  updatedAt = new Date();
}
