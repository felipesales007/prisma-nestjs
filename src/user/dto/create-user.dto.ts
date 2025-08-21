import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(3, 10, { message: 'Nome precisa ter entre 3 e 10 caracteres' })
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  @Expose({ name: 'name' })
  name: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  email: string;

  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  description: string;

  @Exclude()
  id: number;
}
