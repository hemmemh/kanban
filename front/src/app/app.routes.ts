import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',
        loadComponent:() => import('./features/board/pages/board-page/board-page').then(m => m.BoardPage)
    },
    {path:'boards',
        loadComponent:() => import('./features/board/pages/boards/boards').then(m => m.Boards)
    },
    {
     path: '**',
     redirectTo: '',
    },
];
