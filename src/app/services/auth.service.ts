import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '@aws-amplify/auth';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public auth = new BehaviorSubject(false);
    public env;
    constructor( private http: HttpClient) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.env = window['__env'] || environment;
    }

    public logout() {
        // remove user from local storage to log user out
        sessionStorage.clear();
    }

    public setAuth(val: any) {
        this.auth.next(val);
    }

    public isAuthenticated() {
        return this.auth.asObservable();
    }

	public async getCurrentSession() {
        try {
            await Auth.currentSession();
        } catch (error) {
            return error;
        }
		// return Auth.currentSession()
		// .then(data => data)
		// .catch(err => err);
	}

    public getUserInfo() {
        const url = `${this.env.authConfig.baseApi}/oauth2/userInfo`;
        const response = this.http.get(url);
        return response;
    }
}
