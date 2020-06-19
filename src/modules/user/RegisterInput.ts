import { InputType, Field } from 'type-graphql';
import { Length, IsEmail } from 'class-validator';
import { User } from 'src/entities/User';

@InputType({ description: 'New user data' })
export class RegisterInput implements Partial<User> {
  @Field()
  @Length(1, 15)
  firstName: string;

  @Field()
  @Length(1, 15)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
