import { UserSchema } from "src/schemas/user.schema";

export interface AccessToken {
  access_token: string;
  user: UserSchema;
}
