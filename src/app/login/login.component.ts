/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@aws-amplify/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
		username: new FormControl(null),
		password: new FormControl(null),
	});
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  public async login(){
    const userAttributes = {
      // eslint-disable-next-line quote-props
      'SECRET_HASH':
      'MWN2aG1yNXBuOThwNmw2OGU2czRuaHZrdTg6OGp2b2oxamVmaXVqN2M2aGJ0dXBybG5mZjI3Yjd1NW0wNXBjdGpva2ZhYjdqNGs4Mjdl'
    };
    try {
      Auth.signIn(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value)
      .then(x => {
        console.log('login res: ', x);
        this.router.navigate(['tabs']);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
