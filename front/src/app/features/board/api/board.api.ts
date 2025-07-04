import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBoardDTO } from '../dto/create.board.dto';
import { Board } from '../models/board.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { UpdateBoardDTO } from '../dto/update.board.dto';
import { GetAllBoardsDTO } from '../dto/getAllBoards.dto';

@Injectable({
  providedIn: 'root'
})
export class BoardApi {

    constructor(private http: HttpClient) { }

  create(dto:CreateBoardDTO): Observable<Board>{
    return this.http.post<Board>(`${environment.apiUrl}/board/create`, dto);
  }

  update(dto:UpdateBoardDTO): Observable<Board>{
    return this.http.patch<Board>(`${environment.apiUrl}/board/update`, dto);
  }

  getAll(dto:GetAllBoardsDTO): Observable<Board[]>{

    let params = new HttpParams();

    if (dto.ownerId !== undefined) {
    params = params.set('ownerId', dto.ownerId.toString());
  }


    return this.http.get<Board[]>(`${environment.apiUrl}/board/getAll`, {params});
  }

  delete(id:number): Observable<Board>{
    return this.http.delete<Board>(`${environment.apiUrl}/board/delete/${id}`);
  }

  getBackImages(): Observable<string[]>{
    return this.http.get<string[]>(`${environment.apiUrl}/board/getBackImages`);
  }
  
}
