import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'ruta',
    loadChildren: () => import('./ruta/ruta.module').then( m => m.RutaPageModule)
  },
  {
    path: 'ciclista',
    loadChildren: () => import('./conductor/conductor.module').then( m => m.ConductorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'driver-dashboard',
    loadChildren: () => import('./pages/driver-dashboard/driver-dashboard.module').then( m => m.DriverDashboardPageModule),
    /**  canActivate: [AuthGuard],
    data: {
      role: '3'
    } */ 
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule),
    /**  canActivate: [AuthGuard],
    data: {
       role: '4'
    }*/ 
     
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'tutoriales',
    loadChildren: () => import('./pages/tutoriales/tutoriales.module').then( m => m.TutorialesPageModule)
  },
  {
    path: 'preguntas',
    loadChildren: () => import('./pages/denuncia/denuncia.module').then( m => m.DenunciaPageModule)
  },
  {
    path: 'promociones',
    loadChildren: () => import('./pages/promociones/promociones.module').then( m => m.PromocionesPageModule)
  },  {
    path: 'tips',
    loadChildren: () => import('./pages/tips/tips.module').then( m => m.TipsPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./pages/seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
