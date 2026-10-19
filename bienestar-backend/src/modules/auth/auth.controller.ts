import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Redirige automáticamente al usuario a la pantalla de inicio de sesión de Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const result = await this.authService.validarUsuarioGoogle(req.user);

    // Retorna el token JWT y los datos del usuario en formato JSON
    return res.status(200).json({
      message: 'Inicio de sesión exitoso con Google',
      data: result,
    });
  }
}
