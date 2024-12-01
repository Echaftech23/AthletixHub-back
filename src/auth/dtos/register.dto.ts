import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsLowercase,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @IsLowercase()
  @MaxLength(30)
  username: string;

  @IsString()
  @Matches(/^\+?[0-9\s\-()]{10,25}$/, {
    message:
      'Phone number must be between 10 and 25 digits and can include country code, spaces, dashes, and parentheses',
  })
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain uppercase, lowercase, number/special character',
  })
  password: string;
}
