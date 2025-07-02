import { AfterViewInit, Directive, DOCUMENT, ElementRef, Inject, Input } from '@angular/core';
import { debounce, debounceTime, filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { CardModel } from '../models/card.model';
import { E } from '@angular/cdk/keycodes';

@Directive({
  selector: '[appCardDrag]'
})
export class CardDrag implements AfterViewInit {

  constructor(
    private elementRef:ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

   private cleaner$ = new Subject<void>()
   private destroy$ = new Subject<void>()

  clone:HTMLElement | null = null
  dropPositionEl:HTMLElement | null = null
 

  cardsContainer:Element | null = null
  currentMouseYPosition = 0
  currentMouseXPosition = 0
  isDragging = false
  currentTop = 0
  currentLeft = 0
  elementHeight = 0
  isMoveTop = false

  @Input({required:true}) card!:CardModel


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
    this.cleaner$.complete()
  }



    ngAfterViewInit(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown')
    .pipe(filter(el => el.button === 0))
    .pipe(takeUntil(this.destroy$));

    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup')
    .pipe(filter(el => el.button === 0))
    .pipe(takeUntil(this.cleaner$));

    const esc$ = fromEvent<KeyboardEvent>(this.document, 'keydown')
    .pipe(filter(el => el.key === 'Escape'))
    .pipe(takeUntil(this.cleaner$));
    
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove')
    .pipe(filter(el => el.button === 0))
    .pipe(takeUntil(this.cleaner$));
   

    dragStart$.subscribe((event: MouseEvent) => {

     drag$.subscribe((event: MouseEvent) => this.onMouseMoveHandler(event));
      
      dragEnd$.subscribe(() =>this.onMouseUpHandler());

      esc$.subscribe(() =>this.onEscape() )

      this.onMouseDownHandler(event)
    });



  }

   private onEscape(){
      this.elementRef.nativeElement.style.display = 'block'
      this.dropPositionEl?.remove()
      this.dropPositionEl = null
      this.clone?.remove()
      this.clone = null
      this.cleaner$.next()
   }

    private onMouseDownHandler(event:MouseEvent){
       event.stopPropagation();
       this.currentMouseYPosition = event.clientY
       this.currentMouseXPosition = event.clientX
       
       this.currentTop = this.elementRef.nativeElement.getBoundingClientRect().top
       this.currentLeft = this.elementRef.nativeElement.getBoundingClientRect().left
       this.elementHeight = this.elementRef.nativeElement.offsetHeight
       
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
     const closestColumn = this.getClosestColumn(event)

    if(closestColumn){

      const cards = closestColumn.children
      let closestCard:Element | null  =this.getClosestCard(cards) 
      
      if(closestCard){
          this.updateDropPositionEl(closestColumn, closestCard)
      }
     
    }
  }

  private onMouseUpHandler(){

    if(this.dropPositionEl && this.clone && this.cardsContainer){
      this.elementRef.nativeElement.style.display = 'block'
      this.cardsContainer.replaceChild(this.elementRef.nativeElement, this.dropPositionEl)
    }
  
      this.dropPositionEl?.remove()
      this.dropPositionEl = null
      this.clone?.remove()
      this.clone = null
      this.isDragging = false
      this.cleaner$.next()
  }


  private checkDeltaCross(event:{clientY:number, clientX:number}){
     if(Math.abs(event.clientY - this.currentMouseYPosition) > 5 || Math.abs(event.clientX - this.currentMouseXPosition) > 5) return true
     return false
  }

    private cloneElement(): HTMLElement {
    const clonedElement = this.elementRef.nativeElement.cloneNode(true) as HTMLElement;
    clonedElement.style.position = 'fixed'
    clonedElement.style.zIndex = '1000'
    clonedElement.style.opacity = '0.6'
    const top = this.elementRef.nativeElement.getBoundingClientRect().top
    const left = this.elementRef.nativeElement.getBoundingClientRect().left
    clonedElement.style.transform = 'rotate(20deg)'
    clonedElement.style.left = left + 'px'
    clonedElement.style.top = top + 'px'

    return clonedElement;
  }

  private updateClonePostition(event:{clientY:number, clientX:number}){
    if(!this.clone) return

      const deltaX = event.clientX - this.currentMouseXPosition
      const deltaY = event.clientY - this.currentMouseYPosition
    
      
      
      this.clone.style.left = this.currentLeft +  deltaX + 'px'
      this.clone.style.top = this.currentTop + deltaY + 'px'
      this.currentLeft = this.currentLeft +  deltaX
      this.currentTop = this.currentTop + deltaY
      this.isMoveTop =  event.clientY < this.currentMouseYPosition
      this.currentMouseXPosition = event.clientX
      this.currentMouseYPosition = event.clientY
  }

  private updateDropPositionEl(closestColumn:Element, closestCard:Element){
      this.dropPositionEl?.remove()
      if(this.clone){
       this.dropPositionEl = this.document.createElement('div')
       this.dropPositionEl.style.width = '100%'
       this.dropPositionEl.style.height = this.elementHeight + 'px'
       this.dropPositionEl.style.background = '#fff'
       this.dropPositionEl.style.borderRadius = '10px'
       this.dropPositionEl.setAttribute('data-drop-pos', 'true')

       if(this.isMoveTop){
         closestColumn.insertBefore(this.dropPositionEl, closestCard)
       }else{
        closestColumn.insertBefore(this.dropPositionEl, closestCard.nextSibling)
       }
    
       this.elementRef.nativeElement.style.display = 'none'
      
      }
  }

  private getClosestColumn(event:{clientY:number, clientX:number}){
         const elsFromPoint = this.document.elementsFromPoint(event.clientX, event.clientY)
         const column  = elsFromPoint.find(el => el.hasAttribute('data-column-id'))
         if(column){
          const result =  column.querySelector('.cards')
          if ( result){
            this.cardsContainer = result
            return result
          }
          return null
         }
          return null
     
    
    
  
  }

  private getClosestCard(cards:HTMLCollection){
    let closestCard:Element | null = null;
   for(const card of cards){

        if (card.getAttribute('data-drop-pos')) continue
        if (card.getAttribute('data-create')) continue
        if( card.getAttribute('data-pos') === String(this.card.pos)) continue

        const top = card.getBoundingClientRect().top
        const height = card.getBoundingClientRect().height / 2
        const cardMidPos = top + height
        const cloneMidPos = this.currentTop +  (this.elementHeight / 2)
        
        if((cardMidPos + 5) > cloneMidPos &&  cloneMidPos >( cardMidPos - 5)){
          closestCard = card
          break
        }
        
      }

      return closestCard
  }

}
