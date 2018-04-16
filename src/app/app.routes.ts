import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: UsuarioComponent },
    { path: 'usuarios', component: UsuarioComponent},
    { path: '**', pathMatch: 'full', component: UsuarioComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);