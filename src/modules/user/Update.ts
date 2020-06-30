import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../../entities/User';
import { UpdateInput } from './UpdateInput';
import { UserInputError } from 'apollo-server-express';

@Resolver()
export class UpdateUserResolver {
  @Mutation(() => User)
  async update(
    @Arg('user') { id, firstName, lastName, email }: UpdateInput
  ): Promise<User> {
    let selectedUser = await User.findOne(id);
    if (!selectedUser) {
      throw new UserInputError('User not found');
    }

    selectedUser.firstName = firstName || selectedUser.firstName;
    selectedUser.lastName = lastName || selectedUser.lastName;
    selectedUser.email = email || selectedUser.email;

    return (await selectedUser.save()) || new Error('Failed to update user.');
  }

  @Mutation(() => User)
  async updateRole(@Arg('user') { id, role }: UpdateInput): Promise<User> {
    let selectedUser = await User.findOne(id);
    if (!selectedUser) {
      throw new UserInputError('User not found');
    }

    selectedUser.role = role;

    return (await selectedUser.save()) || new Error('Failed to update user.');
  }
}
