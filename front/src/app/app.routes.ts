import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:':id/board',
        loadComponent:() => import('./features/board/pages/board-page/board-page').then(m => m.BoardPage)
    },
    {path:':id/boards',
        loadComponent:() => import('./features/board/pages/boards/boards').then(m => m.Boards)
    },
    {path:'login',
        loadComponent:() => import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage)
    },
    {
     path: '**',
     redirectTo: '',
    },
];
