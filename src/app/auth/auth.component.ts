import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseEntity, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  formSubmitted(formObject: NgForm) {
    let authObservale: Observable<AuthResponseEntity>;
    if (formObject.valid) {
      if (this.isLoginMode) {
        this.isLoading = true;
        authObservale = this.authService.performLogin(
          formObject.value.email,
          formObject.value.password
        );
      } else {
        this.isLoading = true;
        authObservale = this.authService.performSignUp(
          formObject.value.email,
          formObject.value.password
        );
      }
      authObservale.subscribe(
        (response) => {
          this.isLoading = false;
          console.log(response);
        },
        (errorMessage) => {
          this.isLoading = false;
          this.errorMessage = errorMessage;
        }
      );
    }
  }
}
