import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(3, 10, { message: 'Nome precisa ter entre 3 e 10 caracteres' })
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  @Expose({ name: 'name' })
  name: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  email: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  photo?: string;

  @Exclude()
  id: number;
}
