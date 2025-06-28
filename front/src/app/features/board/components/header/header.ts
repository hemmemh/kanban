import { Component } from '@angular/core';
import { Contain } from '../../../../shared/components/contain/contain';
import { MyButton } from '../../../../shared/components/my-button/my-button';

@Component({
  selector: 'app-header',
  imports: [Contain, MyButton],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
