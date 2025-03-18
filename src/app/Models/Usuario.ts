export interface Usuarios {
    userId: number;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    isActive: boolean;
    passwordResetToken?: string; 
    tokenExpiration?: Date;
}

export interface Contacto {
    nombre: string;
    email: string;
    mensaje: string;
}
