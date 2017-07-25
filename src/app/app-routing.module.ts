import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthService } from './services/auth.service';
 
const routes: Routes = [
 /*  { path: '', loadChildren: './pages/home/home.module#HomeModule' }, */
  { path: '', loadChildren: './pages/activity-list/activity-list.module#ActivityListModule' },
   { path: 'run/:id', loadChildren: './pages/map/map.module#MapModule' },
 
  
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }


