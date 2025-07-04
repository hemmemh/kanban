import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';
import { BoardApi } from '../api/board.api';

@Injectable()
export class BoardImagesService {

  constructor(
        private snackBar:SnackBarService,
        private boardApi:BoardApi,

  ) {
    this.fetch()
   }

  private backImages = new BehaviorSubject<string[]>([])
  public backImages$ = this.backImages.asObservable()

  get BoardImages(){
   return this.backImages.value
  }

  async fetch(){
    try {
       const backImages =  await firstValueFrom(this.boardApi.getBackImages()) 
       this.backImages.next(backImages)
       return backImages
    } catch (error:any) {
        this.snackBar.open(error.error.message)
        return null
    }
   
   }
}
