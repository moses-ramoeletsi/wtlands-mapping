import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login-and-register-screen',
    loadChildren: () => import('./pages/login-and-register-screen/login-and-register-screen.module').then( m => m.LoginAndRegisterScreenPageModule)
  },
  {
    path: '',
    redirectTo: 'login-and-register-screen',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./pages/register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'register-admin',
    loadChildren: () => import('./pages/register-admin/register-admin.module').then( m => m.RegisterAdminPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/Admin/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'wetlands-managment',
    loadChildren: () => import('./pages/Admin/wetlands-managment/wetlands-managment.module').then( m => m.WetlandsManagmentPageModule)
  },
  {
    path: 'users-managment',
    loadChildren: () => import('./pages/Admin/users-managment/users-managment.module').then( m => m.UsersManagmentPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/Admin/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'users-activities',
    loadChildren: () => import('./pages/Admin/users-activities/users-activities.module').then( m => m.UsersActivitiesPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./pages/Users/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/Users/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'saved-wetlands',
    loadChildren: () => import('./pages/Users/saved-wetlands/saved-wetlands.module').then( m => m.SavedWetlandsPageModule)
  },
  {
    path: 'wetlands',
    loadChildren: () => import('./pages/Users/wetlands/wetlands.module').then( m => m.WetlandsPageModule)
  },
  {
    path: 'user-content-and-feedback',
    loadChildren: () => import('./pages/Users/user-content-and-feedback/user-content-and-feedback.module').then( m => m.UserContentAndFeedbackPageModule)
  },
  {
    path: 'user-feedback',
    loadChildren: () => import('./pages/Admin/user-feedback/user-feedback.module').then( m => m.UserFeedbackPageModule)
  },
  {
    path: 'admin-profile',
    loadChildren: () => import('./pages/Admin/admin-profile/admin-profile.module').then( m => m.AdminProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
