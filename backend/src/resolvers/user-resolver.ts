import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {UserEntity} from "../models/user-entity";
import {FieldError, MyContext, UsernamePasswordInput, UserResponse} from "../types/graphql-types";
import argon2 from "argon2";
import {UserValidators} from "../validations/user-validators";

@Resolver()
export class UserResolver {

  @Query(() => UserResponse, {nullable: true})
  async me(
    @Ctx() {req, em}: MyContext
  ): Promise<UserResponse> {

    const id = req.session.userId;

    if (!id) return {errors: [{field: "userId", message: "you are not logged in."}]}

    const user = await em.findOne(UserEntity, {id});

    if (!user) return {errors: [{field: "user", message: "no user was found"}]}

    return {user: user};
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() {req, em}: MyContext
  ): Promise<UserResponse> {
    const username = options.username.toLocaleLowerCase();
    const password = options.password;
    let errors: FieldError[] = [];

    UserValidators.checkUsername(username, errors);
    UserValidators.checkPassword(password, errors);
    if (errors.length >= 1) return {errors: errors};

    const existingUser = await em.findOne(UserEntity, {username: username});

    if (existingUser) errors.push({field: "username", message: "username already exists"});
    if (errors.length >= 1) return {errors: errors};

    const hashedPassword = await argon2.hash(password)

    const user = em.create(UserEntity, {username: username, password: hashedPassword});

    try {
      await em.persistAndFlush(user);
      req.session.userId = user.id;

    } catch (err) {
      return {errors: [{field: "user", message: "could not save user"}]}
    }

    return {user: user};
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() {req, em}: MyContext
  ): Promise<UserResponse> {
    const username = options.username.toLocaleLowerCase();
    const password = options.password;
    let errors: FieldError[] = [];

    UserValidators.checkUsername(username, errors);
    UserValidators.checkPassword(password, errors);
    if (errors.length >= 1) return {errors: errors};

    const user = await em.findOne(UserEntity, {username: username})

    if (!user) return {errors: [{field: "username", message: "invalid credentials"}]};

    const valid = await argon2.verify(user.password, password);

    if (!valid) return {errors: [{field: "passsword", message: "invalid credentials"}]};

    req.session.userId = user.id;

    return {user: user};
  }

  @Mutation(() => Boolean)
  logout(@Ctx() {req, res}: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false)
          return
        }
        res.clearCookie("qid");
        resolve(true);
      })
    );
  }
}
