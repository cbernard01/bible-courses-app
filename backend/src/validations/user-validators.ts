import {FieldError} from "../types/graphql-types";


export class UserValidators {
  static checkUsername(username: String, errors: FieldError[]) {
    if (!username) errors.push({field: "username", message: "username must be provided"});
    if (username && username.length <= 4) errors.push({field: "username", message: "username must be more than four characters"});
    if (username && username.length >= 21) errors.push({field: "username", message: "username must be less than twenty characters"});
  }

  static checkPassword(password: string, errors: FieldError[]) {
    if (!password) errors.push({field: "password", message: "password must be provided"});
    if (password && password.length <= 4) errors.push({field: "password", message: "password must be more than four characters"});
    if (password && password.length >= 21) errors.push({field: "password", message: "password must be less than twenty characters"});
  }
}
