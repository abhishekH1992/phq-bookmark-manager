import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'result',
        loadComponent: () => import('./result/result.component').then(m => m.ResultComponent)
    }
];
