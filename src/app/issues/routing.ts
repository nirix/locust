import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssueListComponent }    from './list.component';
import { IssueDetailComponent }  from './detail.component';

const issuesRoutes: Routes = [
  { path: 'issues',  component: IssueListComponent },
  { path: 'issues/:id', component: IssueDetailComponent }
];

export const issuesRouting: ModuleWithProviders = RouterModule.forChild(issuesRoutes);
