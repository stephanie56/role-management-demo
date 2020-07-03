import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
} from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/User';
import { LoginInput } from './LoginInput';
import { ExpressContext } from './ExpressContext';
import {
  createAccessToken,
  createRefreshToken,
} from '../../utils/createTokens';

@ObjectType()
class Token {
  constructor(token: string) {
    this.accessToken = token;
  }
  @Field() readonly accessToken: string;
}

@Resolver()
export class LoginUserResolver {
  @Mutation(() => Token)
  async loginUser(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() ctx: ExpressContext
  ): Promise<any> {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error('Username or password is invalid');
    }

    const isValid = await bcrypt.compare(password, existingUser.password);

    if (!isValid) {
      throw new Error('Username or password is invalid.');
    }

    const { id, role, tokenVersion } = existingUser;

    const accessToken = createAccessToken(id, role);
    const refreshToken = createRefreshToken(id, tokenVersion);

    const token = new Token(accessToken);

    ctx.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // maxAge: 60 * 60 * 24 * 7, // 7 days
      // path: '/refresh_token', // attach the refreshToken only to this endpoint
    });

    return token;
  }
}
