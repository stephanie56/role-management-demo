import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/User';
import { RegisterInput } from './RegisterInput';

@Resolver()
export class UserResolver {
  // Find user by ID
  @Query(() => User)
  async user(@Arg('id') id: number) {
    const selectedUser = await User.findOne(id);
    return selectedUser;
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    // Hash user password, use 12 as salt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save a new user entity in the database
    // If entity does not exist in the database then inserts, otherwise updates.
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
