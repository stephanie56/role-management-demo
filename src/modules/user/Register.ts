import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ArgsType,
  Field,
  Args,
  FieldResolver,
  Root,
} from 'type-graphql';

import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/User';

// Resolver is like a controller that
// resolve data for the server, this simple
// resolver returns the string 'hello world' back
@Resolver(User)
export class RegisterResolver {
  // Resolve the `name` field for the User type
  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  // Find user by ID
  @Query(() => User)
  async user(@Arg('id') id: number) {
    const selectedUser = await User.findOne(id);
    return selectedUser;
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
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
