import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { IssueListComponent }    from './list.component';
import { IssueDetailComponent }  from './detail.component';
import { IssueService } from './service';
import { issuesRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    issuesRouting
  ],
  declarations: [
    IssueListComponent,
    IssueDetailComponent
  ],
  providers: [
    IssueService
  ]
})
export class IssuesModule {}
