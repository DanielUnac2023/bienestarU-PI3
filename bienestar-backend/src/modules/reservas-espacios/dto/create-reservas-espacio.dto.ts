import { IsNotEmpty, IsString, IsDateString, IsInt, Min } from 'class-validator';

export class CreateReservasEspacioDto {
    @IsString()
    @IsNotEmpty()
    espacioId: string;

    @IsString()
    @IsNotEmpty()
    usuarioId: string; // Temporal hasta que integren el JWT Guard de Google OAuth

    @IsDateString()
    @IsNotEmpty()
    fechaInicio: string;

    @IsDateString()

    @IsNotEmpty()
    fechaFin: string;

    @IsInt()
    @Min(1)
    cantidadPersonas: number;
}