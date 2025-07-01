import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { filter, fromEvent, Subject, takeUntil } from 'rxjs';
import { enhanceColor } from '../../utils/color.utils';

@Directive({
  selector: '[appMyButtonDirrective]'
})
export class MyButtonDirrective implements AfterViewInit, OnDestroy{



 constructor(
  private elementRef:ElementRef,
  private renderer: Renderer2
){}


private destroy$ = new Subject<void>()


@Input({required:true}) color!: string
@Input({required:true}) disabled!: boolean
@Input({required:true}) filled!: boolean
@Input({required:true}) focus!: boolean


   ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }


  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color',enhanceColor(this.color, 1.4, 0.4));
    if(this.disabled){
      this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', 'none');
    }

    if(this.filled){
       this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', enhanceColor(this.color, 0.8, 0.9));
    }

  fromEvent<Event>(this.elementRef.nativeElement,'mouseenter')
  .pipe(takeUntil(this.destroy$))
  .pipe(filter(() => !this.filled && this.focus))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', enhanceColor(this.color, 0.8, 0.9));
  })

   fromEvent<Event>(this.elementRef.nativeElement,'mouseleave')
  .pipe(takeUntil(this.destroy$))
   .pipe(filter(() => !this.filled && this.focus))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  })

   fromEvent<Event>(this.elementRef.nativeElement,'mousedown')
  .pipe(takeUntil(this.destroy$))
  .pipe(filter(() => this.focus))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', enhanceColor(this.color, 0.7 , 0.8));
  })

  fromEvent<Event>(this.elementRef.nativeElement,'mouseup')
  .pipe(takeUntil(this.destroy$))
  .pipe(filter(() => this.focus))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color',  enhanceColor(this.color, 0.8, 0.9));
  })

  }

 
}
