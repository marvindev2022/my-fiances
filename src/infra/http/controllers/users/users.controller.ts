import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
  Patch,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '@infra/http/services/users/users.service';
import { MissingParamError } from '@app/errors/MissingParamError';
import { RegisterUserDTO } from '@infra/http/dtos/User/registerUser.dto';
import { UserLoginDTO } from '@infra/http/dtos/User/login.dto';
import { UpdateUserDTO } from '@infra/http/dtos/User/editUser.dto';
import { UpdatePasswordDTO } from '@infra/http/dtos/User/editPassword.dto';
import { ResetPasswordDTO } from '@infra/http/dtos/User/resetPassword.dto';
import { DeleteUserDTO } from '@infra/http/dtos/User/deleteUser.dto';

@Controller('usuario')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('registro')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const id = await this.userService.register({
      ...registerUserDTO,
      birthDay: new Date(registerUserDTO.birthDay),
    });
    if (id instanceof Error) throw new BadRequestException(id.message);

    return { message: 'Usuário cadastrado com sucesso!' };
  }

  @Post('login')
  async login(@Body() userLoginDTO: UserLoginDTO) {
    const userData = await this.userService.login(userLoginDTO);

    return userData;
  }

  @Post('validar/email')
  async validateEmail(@Body() { email }: { email: string }) {
    if (!email) {
      throw new MissingParamError('email');
    }

    const emailIsAvailable = await this.userService.validateEmail(email);

    return emailIsAvailable;
  }

  @Get(':id/buscar')
  async findUserById(@Param('id') id: string) {
    const user = await this.userService.findUsers(id);
    return user;
  }
  @Patch(':id/deletar')
  async deleteUserById(
    @Body() request: DeleteUserDTO,
    @Param('id') id: string,
  ) {
    await this.userService.deleteUser(request, id);
    return 'Usuario deletado!';
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param('id') id: string,
    @Body() editUserDTO: UpdateUserDTO,
    @UploadedFile() photoFile: Express.Multer.File,
  ) {
    if (photoFile) {
      const imagePath = `uploads/${photoFile.filename}`;
      editUserDTO.photo = imagePath;
    }

    await this.userService.update(id, editUserDTO);

    return 'Dados editados com sucesso!';
  }

  @Patch(':id/editar-senha')
  async editPassword(
    @Param('id') id: string,
    @Body() request: UpdatePasswordDTO,
  ): Promise<string | void> {
    await this.userService.editPassword(id, request);
  }

  @Patch(':id/recuperar-senha')
  @HttpCode(201)
  async resetPassword(
    @Param('id') id: string,
    @Body() request: ResetPasswordDTO,
  ): Promise<string | Error> {
    const resetedPassword = await this.userService.resetPassword(id, request);
    return resetedPassword;
  }
}
