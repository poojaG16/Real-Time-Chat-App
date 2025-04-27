import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ChatComponent } from './component/chat/chat.component';
import { InfoComponent } from './component/info/info.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }, {
        path: 'login', component: LoginComponent
    }, {
        path: 'register', component: RegisterComponent
    }, {
        path: 'chat', component: ChatComponent, canActivate: [authGuard]
    }, {
        path: 'info', component: InfoComponent
    }
];
