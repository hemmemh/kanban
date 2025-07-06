import { Injectable } from '@angular/core';
import { CreatelistDTO } from '../dto/createList.dto';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SnackBarService } from '../../../shared/components/snack-bar/snack-bar.service';
import { ColumnApi } from '../api/column.api';
import { ColumnListService } from './column-list.service';
import { UpdateListDTO } from '../dto/updateList.dto';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ColumnService {

    constructor(
      private snackBar:SnackBarService,
      private columnApi:ColumnApi,
      private columnListService:ColumnListService,
      private route:ActivatedRoute
    ) { }
  
     private load = new BehaviorSubject<boolean>(false)
     public load$ = this.load.asObservable()

    private selectedColumnId = new BehaviorSubject<number>(-1)
     public selectedColumnId$ = this.selectedColumnId.asObservable()
   
    get Load(){
      return this.load.value
    }

    get SelectedColumnId(){
      return this.selectedColumnId.value
    }

    set SelectedColumnId(id:number){
       this.selectedColumnId.next(id)
    }

    async  create(name:string){
      try {
        this.load.next(true)
        const pos = this.columnListService.getLastPos()
        const params = this.route.snapshot.params
        const id = params['id']
        const creatDTO:CreatelistDTO = {
          name,
          pos,
          boardId:Number(id),
          color:'#f2f'

        }
        const column = await firstValueFrom(this.columnApi.create(creatDTO))
        this.columnListService.add(column)
        return column
      } catch (error:any) {
        this.snackBar.open(error.error.message)
        return null
      } finally {
         this.load.next(false)
      }
  
   }
  
  
     async  update(dto:UpdateListDTO){
      try {
        this.load.next(true)
        const columns = await firstValueFrom(this.columnApi.update(dto)) 
        this.columnListService.replace(columns)
        return columns
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
        const column = await firstValueFrom(this.columnApi.delete(id)) 
        this.columnListService.filter(id)
        return column
      } catch (error:any) {
        this.snackBar.open(error.error.message)
        return null
      } finally {
         this.load.next(false)
      }
  
   }

}
