import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseEntity{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  performSignUp(email: string, password: string) {
return this.httpClient.post<AuthResponseEntity>(
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDirqdkWzRn0pn9Q4l02jIRLC24uZo3A1Y',
  {
    email: email,
    password: password,
    returnSecureToken: true
  }
).pipe(catchError(this.handleErrors));
  }

  performLogin(email: string, password: string) {
    return this.httpClient.post<AuthResponseEntity>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDirqdkWzRn0pn9Q4l02jIRLC24uZo3A1Y',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(catchError(this.handleErrors))
  }


  private handleErrors(errorResponse){
      let errorMessage = 'An unknown error has occured';
      if(!errorResponse.error || !errorResponse.error.error){
        return throwError(errorMessage);
      } else {
        switch(errorResponse.error.error.message){
          case 'EMAIL_EXISTS':
            errorMessage = 'Email already exists';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not found';
            break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Invalid password';
              break;
        }
        return throwError(errorMessage);
      }
  }
}
