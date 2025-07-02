import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-column-button',
  imports: [],
  templateUrl: './create-column-button.html',
  styleUrl: './create-column-button.scss'
})
export class CreateColumnButton {

  @Output() onClick =  new EventEmitter()
}
