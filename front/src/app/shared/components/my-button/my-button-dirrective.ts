import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { enhanceColor } from '../../utils/color.utils';

@Directive({
  selector: '[appMyButtonDirrective]'
})
export class MyButtonDirrective implements OnInit, OnDestroy{



 constructor(
  private elementRef:ElementRef,
  private renderer: Renderer2
){}

private destroy$ = new Subject<void>()


@Input({required:true}) color!: string


   ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }


  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color',enhanceColor(this.color, 1.4, 0.4));

  fromEvent<Event>(this.elementRef.nativeElement,'mouseenter')
  .pipe(takeUntil(this.destroy$))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.color);
  })

   fromEvent<Event>(this.elementRef.nativeElement,'mouseleave')
  .pipe(takeUntil(this.destroy$))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
  })

   fromEvent<Event>(this.elementRef.nativeElement,'mousedown')
  .pipe(takeUntil(this.destroy$))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', enhanceColor(this.color, 0.7 , 0.9));
  })

  fromEvent<Event>(this.elementRef.nativeElement,'mouseup')
  .pipe(takeUntil(this.destroy$))
  .subscribe(ev =>{
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.color);
  })

  }

 
}
