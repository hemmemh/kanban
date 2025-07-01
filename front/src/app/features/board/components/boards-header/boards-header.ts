import { Component } from '@angular/core';
import { Search } from '../../../../shared/components/search/search';
import { Contain } from '../../../../shared/components/contain/contain';
import { MyButton } from '../../../../shared/components/my-button/my-button';
import { MyButtonFilled } from "../../../../shared/components/my-button-filled/my-button-filled";

@Component({
  selector: 'app-boards-header',
  imports: [Search, Contain,  MyButtonFilled],
  templateUrl: './boards-header.html',
  styleUrl: './boards-header.scss'
})
export class BoardsHeader {

}
