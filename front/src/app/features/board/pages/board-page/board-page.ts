import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Column } from '../../../column/components/column/column';
import { Contain } from '../../../../shared/components/contain/contain';
import { CreateColumn } from '../../../column/components/create-column/create-column';
import { CreateColumnButton } from '../../../column/components/create-column-button/create-column-button';

@Component({
  selector: 'app-board-page',
  imports: [Header, Column, Contain, CreateColumn, CreateColumnButton],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss'
})
export class BoardPage {

  isCreateColumn = false
}
