import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForwardGuard, AuthGuard } from './core/guards';

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import(`./features/authentication/authentication.module`).then(m => m.AuthenticationModule),
        canActivate: [ForwardGuard]
    },
    {
        path: "home",
        loadChildren: () => import(`./features/frontend/frontend.module`).then(m => m.FrontendModule),
        canActivate: [AuthGuard]
    },
    {
        path: "admin",
        loadChildren: () => import(`./features/admin/admin.module`).then(m => m.AdminModule),
        canActivate: [AuthGuard]
    },
    { 
        path: 'other', 
        loadChildren: () => import(`./features/miscellaneous/miscellaneous.module`).then(m => m.MiscellaneousModule),
        canActivate: [AuthGuard]
    },
    { 
        path: 'profile', 
        loadChildren: () => import(`./features/profile/profile.module`).then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**', 
        redirectTo: 'other/404'
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }