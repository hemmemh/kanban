import { Component, Input } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MyButton, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  @Input({required:true}) focused!:boolean
}
