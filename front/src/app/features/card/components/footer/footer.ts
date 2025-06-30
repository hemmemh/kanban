import { Component } from '@angular/core';
import { MyButton } from '../../../../shared/components/my-button/my-button';

@Component({
  selector: 'app-footer',
  imports: [MyButton],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
