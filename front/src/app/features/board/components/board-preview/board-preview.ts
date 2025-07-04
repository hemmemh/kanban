import { Component, Input } from '@angular/core';
import { Board } from '../../models/board.model';
import { environment } from '../../../../../environments/environment.development';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-board-preview',
  imports: [RouterModule],
  templateUrl: './board-preview.html',
  styleUrl: './board-preview.scss'
})
export class BoardPreview {

  @Input({required:true}) board!:Board
  apiUrl = environment.apiUrl
}
