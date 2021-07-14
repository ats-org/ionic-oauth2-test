import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@aws-amplify/auth';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router
  ) {}

  public logout() {
    Auth.signOut().then(x => {
      console.log('logout', x);
      this.router.navigate(['login']);
    });
  }

}
