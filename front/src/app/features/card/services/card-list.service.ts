import { Injectable } from '@angular/core';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';
import { CardApi } from '../api/card.api';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CardModel } from '../models/card.model';
import { GetAllCardsDTO } from '../dto/getAllCards.dto';

@Injectable({
  providedIn: 'root'
})
export class CardListService {

  constructor(
        private snackBar:SnackBarService,
        private cardApi:CardApi,

  ) {}

  private cards = new BehaviorSubject<CardModel[]>([])
  public cards$ = this.cards.asObservable()



      get Cards(){
      return this.cards.value
    }
  
    set Cards(data:CardModel[]){
      this.cards.next(data)
    }

    add(card:CardModel){
       const cards = this.Cards
       cards.push(card)
       this.Cards = cards
    }
    getLastPos(listId:number){
     let cards =  this.cards.value
     cards = cards.filter(el => el.listId === listId)
     cards.sort((a,b) => a.pos - b.pos)
     if(cards.length !== 0){
      const el = cards.at(-1)
      return el ? el.pos + 1 : 1
     }
     return 1 
    }

    filter(id:number){
      const cards = this.Cards
      this.Cards = cards.filter(el => el.id !== id)
    }

    replace(updatedCards:CardModel[]){
      const cards = this.Cards
      for(const card of updatedCards){
        const index = cards.findIndex(el => el.id === card.id)
        cards.splice(index,1,card)
      }
      
      this.Cards = structuredClone(cards)
    }


 async fetch(dto:GetAllCardsDTO){
   try {
    console.log('fetch');
    

      const cards = await firstValueFrom(this.cardApi.getAll(dto)) 
      this.Cards = cards
      return cards
    } catch (error:any) {
      this.snackBar.open(error.error.message)
      return null
    }
    }
}
