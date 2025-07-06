import { Directive, DOCUMENT, ElementRef, Inject, Input } from '@angular/core';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { ColumnModel } from '../models/column.model';
import { ColumnService } from '../services/column.service';

@Directive({
  selector: '[appColumnDrag]'
})
export class ColumnDrag {

constructor(
  private columnService:ColumnService,
    private elementRef:ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

   private cleaner$ = new Subject<void>()
   private destroy$ = new Subject<void>()

  clone:HTMLElement | null = null
  dropPositionEl:HTMLElement | null = null
  elChild:HTMLElement | null = null

  columnsContainer:Element | null = null
  currentMouseYPosition = 0
  currentMouseXPosition = 0
  isDragging = false
  currentTop = 0
  currentLeft = 0
  elementHeight = 0
  elementWidth = 0
  isMoveLeft = false

  @Input({required:true}) column!:ColumnModel


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    this.cleaner$.complete()
  }


      ngAfterViewInit(): void {

       const el = this.elementRef.nativeElement as HTMLElement
       this.elChild = el.firstElementChild as HTMLElement


      const dragStart$ = fromEvent<MouseEvent>(this.elChild, 'mousedown')
      .pipe(filter(el => el.button === 0 && !this.columnService.Load))
      .pipe(takeUntil(this.destroy$));
  
      const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup')
      .pipe(filter(el => el.button === 0 && !this.columnService.Load))
      .pipe(takeUntil(this.cleaner$));
  
      const esc$ = fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(filter(el => el.key === 'Escape' && !this.columnService.Load))
      .pipe(takeUntil(this.cleaner$));
      
      const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove')
      .pipe(filter(el => el.button === 0 && !this.columnService.Load))
      .pipe(takeUntil(this.cleaner$));
     
  
      dragStart$.subscribe((event: MouseEvent) => {
  
       drag$.subscribe((event: MouseEvent) => this.onMouseMoveHandler(event));
        
        dragEnd$.subscribe(() =>this.onMouseUpHandler());
  
        esc$.subscribe(() =>this.onEscape() )
  
        this.onMouseDownHandler(event)
      });
  
      
  
  
    }

    private onMouseDownHandler(event:MouseEvent){
       event.stopPropagation();
       this.currentMouseYPosition = event.clientY
       this.currentMouseXPosition = event.clientX

       if( this.elChild){
       this.currentTop =  this.elChild.getBoundingClientRect().top
       this.currentLeft =  this.elChild.getBoundingClientRect().left
       this.elementHeight =  this.elChild.offsetHeight
       this.elementWidth =  this.elChild.offsetWidth
       }

       
    }

    private onMouseUpHandler(){

    if(this.dropPositionEl && this.clone && this.columnsContainer){
      this.elementRef.nativeElement.style.display = 'block'  
      this.columnsContainer.replaceChild(this.elementRef.nativeElement, this.dropPositionEl)
      const pos = this.dropPositionEl.getAttribute('data-pos')
      if(pos)  this.columnService.update({...this.column, pos:Number(pos)})

    }
  
      this.dropPositionEl?.remove()
      this.dropPositionEl = null
      this.clone?.remove()
      this.clone = null
      this.isDragging = false
      this.cleaner$.next()
  }

     private onEscape(){
      this.elementRef.nativeElement.style.display = 'block'  
      this.dropPositionEl?.remove()
      this.dropPositionEl = null
      this.clone?.remove()
      this.clone = null
      this.cleaner$.next()
   }



      private onMouseMoveHandler(event:{clientY:number, clientX:number}){
     if(!this.isDragging){
            this.isDragging = this.checkDeltaCross(event)
            if(this.isDragging){
                this.clone = this.cloneElement()
                this.document.body.append(this.clone) 
            }
            return
     }
     this.updateClonePostition(event)
     const board = this.document.querySelector('.list-containter')
     this.columnsContainer = board

    if(board){

      const columns = board.children
      let closestColumn:Element | null  =this.getClosestColumn(columns) 
      
      if(closestColumn){
          this.updateDropPositionEl(board, closestColumn)
      }
     
    }
  }


    private checkDeltaCross(event:{clientY:number, clientX:number}){
     if(Math.abs(event.clientY - this.currentMouseYPosition) > 5 || Math.abs(event.clientX - this.currentMouseXPosition) > 5) return true
     return false
  }

    private cloneElement(): HTMLElement {
      if(!this.elChild) return this.document.createElement('div')
    const clonedElement = this.elChild.cloneNode(true) as HTMLElement;
    clonedElement.style.position = 'fixed'
    clonedElement.style.zIndex = '1000'
    clonedElement.style.opacity = '0.6'
    clonedElement.style.flex = `0 0 ${this.elementWidth}px`
    const top = this.elChild.getBoundingClientRect().top
    const left = this.elChild.getBoundingClientRect().left
    clonedElement.style.transform = 'rotate(20deg)'
    clonedElement.style.left = left + 'px'
    clonedElement.style.top = top + 'px'

    return clonedElement;
  }

    private getClosestColumn(columns:HTMLCollection){
    let closestColumn:Element | null = null;
   for(const column of columns){

        if (column.getAttribute('data-drop-pos')) continue
        if (column.getAttribute('data-create')) continue
        if( column.getAttribute('data-column-id') === String(this.column.id)) continue

        const left = column.getBoundingClientRect().left
        const width = column.getBoundingClientRect().width / 2
        const cardMidPos = left + width
        const cloneMidPos = this.currentLeft +  (this.elementWidth / 2)
        
        if((cardMidPos + 5) > cloneMidPos &&  cloneMidPos >( cardMidPos - 5)){
          closestColumn = column
          break
        }
        
      }

      return closestColumn
  }


  private updateClonePostition(event:{clientY:number, clientX:number}){
    if(!this.clone) return

      const deltaX = event.clientX - this.currentMouseXPosition
      const deltaY = event.clientY - this.currentMouseYPosition
    
      
      
      this.clone.style.left = this.currentLeft +  deltaX + 'px'
      this.clone.style.top = this.currentTop + deltaY + 'px'
      this.currentLeft = this.currentLeft +  deltaX
      this.currentTop = this.currentTop + deltaY
      this.isMoveLeft =  event.clientX < this.currentMouseXPosition
      this.currentMouseXPosition = event.clientX
      this.currentMouseYPosition = event.clientY
  }

    private updateDropPositionEl(board:Element, closestColumn:Element){
      this.dropPositionEl?.remove()
      if(this.clone){
       this.dropPositionEl = this.document.createElement('div')
       this.dropPositionEl.style.width = this.elementWidth + 'px'
       this.dropPositionEl.style.height = this.elementHeight + 'px'
       this.dropPositionEl.style.background = '#fff'
       this.dropPositionEl.style.borderRadius = '10px'
       this.dropPositionEl.style.flex = `0 0 ${this.elementWidth}px`
       this.dropPositionEl.setAttribute('data-drop-pos', 'true')
       const pos = closestColumn.getAttribute('data-pos')
       if(this.isMoveLeft){
  

         board.insertBefore(this.dropPositionEl, closestColumn)
      
        if(pos){
          if(pos === board.lastElementChild?.previousElementSibling?.getAttribute('data-pos')){
            this.dropPositionEl.setAttribute('data-pos', String(Number(pos) - 1 ))
          }else{
              this.dropPositionEl.setAttribute('data-pos', String(Number(pos) ))
          }
        }
        
       }else{

        
             if(pos){
          if( pos === board.lastElementChild?.previousElementSibling?.getAttribute('data-pos')){
            this.dropPositionEl.setAttribute('data-pos', String(Number(pos)))
          }else{
            this.dropPositionEl.setAttribute('data-pos', String(Number(pos) +1 ))
          }
        }

        board.insertBefore(this.dropPositionEl, closestColumn.nextSibling)
   
       }
    
      this.elementRef.nativeElement.style.display = 'none'   
      }
  }





}
