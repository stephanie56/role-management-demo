import { InputType, Field } from 'type-graphql';
import { User, UserRole } from '../../entities/User';

@InputType({ description: 'Update user data' })
export class UpdateInput implements Partial<User> {
  @Field()
  id: number;

  @Field()
  role: UserRole;
}
