import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  imports: [CommonModule],
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.scss'
})
export class SnackBar {

  constructor(private cdr:ChangeDetectorRef){}

  @Output() closed = new EventEmitter<void>();

  message = '';
  visible = false;
  timeout:ReturnType<typeof setTimeout> | undefined = undefined;

  show(message: string, duration: number = 3000) {
    this.message = message;
    this.visible = true;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('vis');
      
      this.visible = false;
      setTimeout(() => {
        this.closed.emit();
      }, 300);
      this.cdr.markForCheck()
    }, duration);
  }

}
