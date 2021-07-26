import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@aws-amplify/auth';
import { AuthenticationService } from '../services/auth.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router,
    public auth: AuthenticationService,
  ) {}

  public logout() {
    Auth.signOut().then(x => {
      console.log('logout', x);
      this.router.navigate(['login']);
    });
  }
  getuserDetail(){
    this.auth.getUserInfo().subscribe(x => {
      alert(JSON.stringify(x))
    });
  }
}
