import { Component } from '@angular/core';
import { MyInput } from '../../../../shared/components/my-input/my-input';
import { MyButton } from '../../../../shared/components/my-button/my-button';

@Component({
  selector: 'app-login-page',
  imports: [MyInput, MyButton],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {

}
