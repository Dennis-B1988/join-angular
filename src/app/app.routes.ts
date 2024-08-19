import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'summary',
        loadComponent: () => import('./modules/summary/summary.component').then(m => m.SummaryComponent)
    },
    {
        path: 'add-task',
        loadComponent: () => import('./modules/add-task/add-task.component').then(m => m.AddTaskComponent)
    },
    {
        path: 'board',
        loadComponent: () => import('./modules/board/board.component').then(m => m.BoardComponent)
    },
    {
        path: 'contacts',
        loadComponent: () => import('./modules/contacts/contacts.component').then(m => m.ContactsComponent)
    },
    {
        path: 'legal-notice',
        loadComponent: () => import('./modules/legal-notice/legal-notice.component').then(m => m.LegalNoticeComponent)
    },
    {
        path: 'privacy-policy',
        loadComponent: () => import('./modules/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
    },
    {
        path: 'help',
        loadComponent: () => import('./modules/help/help.component').then(m => m.HelpComponent)
    }
];
