/* eslint-disable no-bitwise */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import CryptoES from 'crypto-es';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Oauth2Service } from '@ats-org/oauth2';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  configUrl;
  constructor(
    private http: HttpClient,
    public brw: InAppBrowser,
    private oauthService: Oauth2Service,
  ) {}

  getAuthCode() {
    const value = sessionStorage.getItem('oauth2');
    if(value == null){
      this.configUrl = environment?.authConfig;
      const challengeType = 'S256';
      const pixie = this.getPixieValues();
      sessionStorage.setItem('oauth2-verifier', pixie.verifier);
      const authState = getAuthState();
      sessionStorage.setItem('oauth2-state', authState);
      this.start();
    }
  }

  start(){
    this.brw.create(
      this.configUrl.baseApi+
      this.configUrl.loginPath+
      '?client_id='+
      this.configUrl.clientId+
      '&response_type='+
      this.configUrl.flow+
      '&redirect_uri=axestrack://axestrack.app/aws', '_system');
  }

  processAuthCode(code) {
    const verifier = sessionStorage.getItem('oauth2-verifier');
    sessionStorage.removeItem('oauth2-verifier');
    //const _authState = sessionStorage.getItem('oauth2-state');
    setTimeout(() => {
        sessionStorage.removeItem('oauth2-state');
    }, 2500); // Delayed cleanup
    return this.getAuthTokenByCode(code, verifier).subscribe(json2 => {
      const token = json2;
      sessionStorage.setItem('oauth2', JSON.stringify(token));
      this.oauthService.start();
    });
  }

  getAuthTokenByCode(code, verifier) {
    const params = new HttpParams()
        .set('grant_type', 'authorization_code')
        .set('client_id', '1cvhmr5pn98p6l68e6s4nhvku8')
        .set('redirect_uri', 'axestrack://axestrack.app/aws')
        .set('code', code)
        .set('code_verifier', verifier);
    const clientIdHash = 'MWN2aG1yNXBuOThwNmw2OGU2czRuaHZrdTg6OGp2b2oxamVmaXVqN2M2aGJ0dXBybG5mZjI3Yjd1NW0wNXBjdGpva2ZhYjdqNGs4Mjdl';
    const headers = new HttpHeaders()
        .set('Authorization', `Basic ${clientIdHash}`)
        .set('Content-Type', 'application/x-www-form-urlencoded');
    const options = {
        params,
        headers
    };
    const url = 'https://auth.axespointgps.com/oauth2/token';
    return this.postBypassAuth(url, null, options).pipe(catchError(this.handleError));
  }

  postBypassAuth(url, body, options) {
    return this.http.post(url, body, options || {});
  }

  handleError(error) {
    // This should be logging somewhere remotely.
    let errMsg;
    if (error instanceof HttpErrorResponse) {
        try {
            const body = error;
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        catch (err) {
            errMsg = error.toString();
        }
    }
    else {
        errMsg = error.message ? error.message : error.toString();
    }
    return throwError(errMsg);
  }

  getPixieValues() {
    const verifier = getRandString();
    const sha = CryptoES.SHA256(verifier);
    const challenge = base64FixPadding(CryptoES.enc.Base64.stringify(sha));
    return { verifier, challenge };
  }

}

function getAuthState() {
  const authState = getRandString();
  return authState;
}

function getRandString() {
  const rand = CryptoES.lib.WordArray.random(32);
  const bytes = wordArrayToByteArray(rand);
  const randString = base64FixPadding(btoa(bytes));
  return randString;
}

function wordArrayToByteArray(hash) {
  return hash.words
      // map each word to an array of bytes
      .map(function(v) {
      // create an array of 4 bytes (less if sigBytes says we have run out)
      const bytes = [0, 0, 0, 0].slice(0, Math.min(4, hash.sigBytes))
          // grab that section of the 4 byte word
          .map(function(d, i) {
          return (v >>> (8 * i)) % 256;
      })
          // flip that
          .reverse();
      // remove the bytes we've processed
      // from the bytes we need to process
      hash.sigBytes -= bytes.length;
      return bytes;
  })
      // concatenate all the arrays of bytes
      .reduce(function(a, d) {
      return a.concat(d);
  }, [])
      // convert the 'bytes' to 'characters'
      .map(function(d) {
      return String.fromCharCode(d);
  })
      // create a single block of memory
      .join('');
}

function base64FixPadding(s) {
  return s
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}
