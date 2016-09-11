import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Issue, IssueService } from './service';

@Component({
  templateUrl: './templates/detail.html',
  styleUrls: [
    './styles/detail.scss'
  ]
})
export class IssueDetailComponent implements OnInit, OnDestroy  {
  issue: Issue;
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IssueService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let id = +params['id'];
       // this.service.getIssue(id).then(issue => this.issue = issue);
       this.service.getIssue(id).subscribe(
         issue => this.issue = issue
       );
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoIssues() {
    this.router.navigate(['/issues']);
  }
}
