import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { SesionIComponent } from './Pages/sesion-i/sesion-i.component';
import { RecuperacionComponent } from './Pages/recuperacion/recuperacion.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { Error404Component } from './Pages/error404/error404.component';
import { ChatDudasComponent } from './Pages/chat-dudas/chat-dudas.component';
import { ContactoComponent } from './Pages/contacto/contacto.component';
import { AcecaDeNosotrosComponent } from './Pages/aceca-de-nosotros/aceca-de-nosotros.component';

export const routes: Routes = [
    
    {path: '',component:SesionIComponent},
    {path: 'inicio', component:SesionIComponent},
    {path: 'sesion/userId', component:SesionIComponent},
    {path: 'sesion-i', component:SesionIComponent},

    {path: '',component:LoginComponent},
    {path: 'Login',component:LoginComponent},
    {path: 'Login/userId',component:LoginComponent},

    {path: '',component:InicioComponent},
    {path: 'Inicio', component:InicioComponent},
    {path: 'Inicio/productoId', component:InicioComponent},

    {path: '',component:RecuperacionComponent},
    {path: 'recuperacion', component:RecuperacionComponent},

    {path: '',component:ResetPasswordComponent},
    {path: 'reset-password', component:ResetPasswordComponent},

    {path: '',component:ChatDudasComponent},
    {path: 'chat-dudas', component:ChatDudasComponent},

    {path: '',component:ContactoComponent},
    {path: 'contacto', component:ContactoComponent},

    {path: 'acerca-de-nosotros', component:AcecaDeNosotrosComponent},
    
    { path: '**', component: Error404Component },

];
