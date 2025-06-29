import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Column } from '../../../column/components/column/column';
import { Contain } from '../../../../shared/components/contain/contain';

@Component({
  selector: 'app-board-page',
  imports: [Header, Column, Contain],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss'
})
export class BoardPage {

}
