import {Connection, EntityManager, IDatabaseDriver} from "@mikro-orm/core";
import {Request, Response} from "express";
import {Field, InputType, ObjectType} from "type-graphql";
import {UserEntity} from "../models/user-entity";
import {Session, SessionData} from "express-session";

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: Session & Partial<SessionData> & { userId?: number } };
  res: Response;
};


@InputType()
export class UsernamePasswordInput {
  @Field(()=> String)
  username: string;

  @Field(()=> String)
  password: string;
}

@ObjectType()
export class FieldError {
  @Field(()=> String)
  field: string;

  @Field(()=> String)
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(()=> [FieldError], {nullable: true})
  errors?: FieldError[];

  @Field(()=> UserEntity, {nullable: true})
  user?: UserEntity;
}
