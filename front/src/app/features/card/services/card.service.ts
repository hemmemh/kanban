import { Injectable } from '@angular/core';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';
import { CardApi } from '../api/card.api';
import { CardListService } from './card-list.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CreateCardDTO } from '../dto/createCard.dto';
import { UpdateCardDTO } from '../dto/updateCard.dto';

@Injectable({
  providedIn: 'root'
})
export class CardService {

   constructor(
     private snackBar:SnackBarService,
     private cardApi:CardApi,
     private cardListService:CardListService
   ) { }

     private load = new BehaviorSubject<boolean>(false)
     public load$ = this.load.asObservable()
   
    get Load(){
      return this.load.value
    }

 
    async  create(name:string, listId:number){
      try {
        this.load.next(true)
        const pos = this.cardListService.getLastPos(listId)
        const creatDTO:CreateCardDTO = {
          name,
          pos,
          listId,
          color:'#f2f'

        }
        const column = await firstValueFrom(this.cardApi.create(creatDTO))
        this.cardListService.add(column)
        return column
      } catch (error:any) {
        this.snackBar.open(error.error.message)
        return null
      } finally {
         this.load.next(false)
      }
  
   }
  
  
     async  update(dto:UpdateCardDTO){
      try {
        this.load.next(true)
        const cards = await firstValueFrom(this.cardApi.update(dto)) 
        this.cardListService.replace(cards)
        return cards
      } catch (error:any) {
        this.snackBar.open(error.error.message)
        return null
      } finally {
         this.load.next(false)
      }
  
   }
  
      async  delete(id:number){
      try {
        this.load.next(true)
        const column = await firstValueFrom(this.cardApi.delete(id)) 
        this.cardListService.filter(id)
        return column
      } catch (error:any) {
        this.snackBar.open(error.error.message)
        return null
      } finally {
         this.load.next(false)
      }
  
   }
}
