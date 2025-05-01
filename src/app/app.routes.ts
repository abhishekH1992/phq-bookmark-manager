import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent),
        data: { title: 'Overview' }
    },
    {
        path: 'result',
        loadComponent: () => import('./pages/result/result.component').then(m => m.ResultComponent),
        data: { title: 'Result' }
    }
];
