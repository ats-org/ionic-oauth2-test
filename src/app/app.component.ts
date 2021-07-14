import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Amplify from '@aws-amplify/core';
import { awsConfig } from './models/aws-config';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public environment: any;
  public window: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {
    this.window = window;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.environment = this.window['__env'] || environment;
    Amplify.configure(awsConfig);
  }

  ngOnInit(): void {
    this.auth.getCurrentSession().then(data => {
      console.log('user session', data);
      if(data === 'No current user') {
        this.router.navigate(['login']);
      }
    });
  }

  initializeApp() {}
}
