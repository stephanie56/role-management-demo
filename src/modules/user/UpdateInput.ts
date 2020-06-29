import { InputType, Field } from 'type-graphql';
import { User, UserRole } from '../../entities/User';
import { Length, IsEmail } from 'class-validator';

@InputType({ description: 'Update user data' })
export class UpdateInput implements Partial<User> {
  @Field()
  id: number;

  @Field({ nullable: true })
  @Length(1, 15)
  firstName: string;

  @Field({ nullable: true })
  @Length(1, 15)
  lastName: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  role: UserRole;
}
