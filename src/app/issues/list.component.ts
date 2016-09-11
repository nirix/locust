import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';
import { Issue, IssueService }   from './service';

@Component({
  templateUrl: './templates/list.html'
})
export class IssueListComponent implements OnInit {
  issues: Issue[];
  errorMessage: any;

  constructor(
    private router: Router,
    private service: IssueService) { }

  ngOnInit() {
    this.service.getIssues().subscribe(
      issues => {
        this.issues = issues;
      },
      error => this.errorMessage = <any>error
     );
  }

  onSelect(issue: Issue) {
    this.router.navigate(['/issues', issue.id]);
  }
}
