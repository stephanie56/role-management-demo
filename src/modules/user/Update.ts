import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../../entities/User';
import { UpdateInput } from './UpdateInput';
import { UserInputError } from 'apollo-server-express';

@Resolver()
export class UpdateUserResolver {
  @Mutation(() => User)
  async update(@Arg('data') { id, role }: UpdateInput): Promise<User> {
    const selectedUser = await User.findOne(id);
    if (selectedUser) {
      selectedUser.role = role;
      return await selectedUser?.save();
    } else {
      throw new UserInputError('User not found');
    }
  }
}
