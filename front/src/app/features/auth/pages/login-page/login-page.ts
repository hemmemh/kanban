import { Component } from '@angular/core';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule,MyInput, MyButton],
  providers:[Auth],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {

  constructor(private authService:Auth){}
  
    loginForm : FormGroup = new FormGroup({
    "email": new FormControl('',[Validators.required, Validators.email]),
    "password": new FormControl('', [Validators.required])
});

  login(){
    this.authService.login(this.loginForm.value)
  }

  registration(){
    this.authService.registration(this.loginForm.value)
  }


}
