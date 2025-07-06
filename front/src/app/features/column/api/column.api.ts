import { Injectable } from '@angular/core';
import { GetAllListsDTO } from '../dto/getAllLists.dto';
import { Observable } from 'rxjs';
import { ColumnModel } from '../models/column.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { CreatelistDTO } from '../dto/createList.dto';
import { UpdateListDTO } from '../dto/updateList.dto';

@Injectable({
  providedIn: 'root'
})
export class ColumnApi {

  constructor(private http: HttpClient) { }


  create(dto:CreatelistDTO): Observable<ColumnModel>{
    return this.http.post<ColumnModel>(`${environment.apiUrl}/list/create`, dto);
  }

  update(dto:UpdateListDTO): Observable<ColumnModel[]>{
    return this.http.patch<ColumnModel[]>(`${environment.apiUrl}/list/update`, dto);
  }
  delete(id:number): Observable<ColumnModel>{
    return this.http.delete<ColumnModel>(`${environment.apiUrl}/list/delete/${id}`);
  }


   getAll(dto:GetAllListsDTO): Observable<ColumnModel[]>{

    let params = new HttpParams();
    if (dto.boardId !== undefined) {
    params = params.set('boardId', dto.boardId.toString());
    }

    return this.http.get<ColumnModel[]>(`${environment.apiUrl}/list/getAll`, {params});
  }

}
