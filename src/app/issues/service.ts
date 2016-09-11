import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

export class Issue {
  constructor(public id: number, public summary: string) { }
}

@Injectable()
export class IssueService {
  issuesUrl = "/api/issues";
  issues: Array<Issue>;

  constructor (private http: Http) {}

  private extractData(res: Response) {
    return res.json() || [];
  }

  getIssues() {
    return this.http.get(this.issuesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getIssue(id: number | string) {
    return this.http.get(this.issuesUrl + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg);

    return Observable.throw(errMsg);
  }
}
