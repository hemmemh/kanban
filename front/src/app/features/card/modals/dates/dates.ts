import { Component } from '@angular/core';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';
import { TimePickerComponent } from '../../../../shared/components/time-picker/time-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { MyButton } from "../../../../shared/components/my-button/my-button";

@Component({
  selector: 'app-dates',
  imports: [DatePickerComponent, TimePickerComponent, CommonModule, FormsModule, MyButton],
  templateUrl: './dates.html',
  styleUrl: './dates.scss'
})
export class Dates {

  startDate:DateTime = DateTime.now()
  startTime:DateTime  =DateTime.now()
  endDate:DateTime = DateTime.now()
  endTime:DateTime = DateTime.now()
 
}
