import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCardDTO } from '../dto/createCard.dto';
import { UpdateCardDTO } from '../dto/updateCard.dto';
import { GetAllCardsDTO } from '../dto/getAllCards.dto';
import { Observable } from 'rxjs';
import { CardModel } from '../models/card.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CardApi {

   constructor(private http: HttpClient) { }

  create(dto:CreateCardDTO): Observable<CardModel>{
    return this.http.post<CardModel>(`${environment.apiUrl}/card/create`, dto);
  }

  update(dto:UpdateCardDTO): Observable<CardModel[]>{
    return this.http.patch<CardModel[]>(`${environment.apiUrl}/card/update`, dto);
  }

  getAll(dto:GetAllCardsDTO): Observable<CardModel[]>{

    let params = new HttpParams();

    if (dto.boardId !== undefined) {
    params = params.set('boardId', dto.boardId.toString());
  }


    return this.http.get<CardModel[]>(`${environment.apiUrl}/card/getAll`, {params});
  }
 delete(id:number): Observable<CardModel>{
    return this.http.delete<CardModel>(`${environment.apiUrl}/card/delete/${id}`);
  }
}
