import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth.service';
import { Oauth2Service } from '@ats-org/oauth2';
import { App } from '@capacitor/app';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { Platform } from '@ionic/angular';

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
    private oauthService: Oauth2Service,
    private auth: AuthenticationService,
    public platform: Platform,
  ) {
    this.window = window;
    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.environment = this.window['__env'] || environment;
    this.platform.ready().then(x => {
      App.addListener('appUrlOpen', data => {
        const u = data.url;
        const a = u.split('/');
        this.router.navigate([a[1]]);
        console.log('App opened with URL: ', data);
        console.log('App opened with URL: ', data.url);
        console.log('testing the console');
        SafariViewController.hide();
      });
    });
    this.oauthService.init(this.environment.authConfig);
    this.oauthService.start();
  }

  ngOnInit(): void {
    this.auth.getUserInfo().subscribe(x => {
      console.log('user', x);
    });
  }

  initializeApp() {}
}
