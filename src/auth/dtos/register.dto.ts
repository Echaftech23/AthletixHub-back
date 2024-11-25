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
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
  phone: string;

  @IsString()
  birthday: string;

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
