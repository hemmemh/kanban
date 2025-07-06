import { Injectable } from '@angular/core';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';
import { ColumnApi } from '../api/column.api';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ColumnModel } from '../models/column.model';
import { GetAllBoardsDTO } from '../../board/dto/getAllBoards.dto';
import { GetAllListsDTO } from '../dto/getAllLists.dto';

@Injectable()
export class ColumnListService {


  constructor(
        private snackBar:SnackBarService,
        private columnApi:ColumnApi,

  ) {}

  private columns = new BehaviorSubject<ColumnModel[]>([])
  public columns$ = this.columns.asObservable()



      get Columns(){
      return this.columns.value
    }
  
    set Columns(data:ColumnModel[]){
      this.columns.next(data)
    }

    add(board:ColumnModel){
       const columns = this.Columns
       columns.push(board)
       this.Columns = columns
    }
    getLastPos(){
     const colums =  this.columns.value
     if(colums.length !== 0){
      const el = colums.at(-1)
      return el ? el.pos + 1 : 1
     }
     return 1 
    }
    filter(id:number){
      const columns = this.Columns
      this.Columns = columns.filter(el => el.id !== id)
    }

    replace(updatedColumns:ColumnModel[]){
      const columns = this.Columns
      for(const column of updatedColumns){
      const index = columns.findIndex(el => el.id === column.id)
      columns.splice(index,1,column)
      
      }
    this.Columns = structuredClone(columns)
    }


 async fetch(dto:GetAllListsDTO){
   try {
    console.log('fetch');
    

      const columns = await firstValueFrom(this.columnApi.getAll(dto)) 
      this.Columns = columns
      return columns
    } catch (error:any) {
      this.snackBar.open(error.error.message)
      return null
    }
    }
}
