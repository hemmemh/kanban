import { Component, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';

@Component({
  selector: 'app-header',
  imports: [MyButton],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {


  @Input({required:true}) color!:string
  @Input({required:true}) name!:string
}
