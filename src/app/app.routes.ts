import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=>import('./ADMIN/admin.routes').then(m=>m.ADMIN_ROUTES)
    }
];
