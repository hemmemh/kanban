import { ApplicationRef, ComponentRef, createComponent, Injectable, Injector } from '@angular/core';
import { SnackBar } from './snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private componentRef?: ComponentRef<SnackBar>;

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

 open(message: string, duration = 3000) {
    if (!this.componentRef) {
      this.componentRef = createComponent(SnackBar, {
        environmentInjector: this.appRef.injector
      });

      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

       this.componentRef.instance.closed.subscribe(() => {
        this.destroy();
      });

    }

    this.componentRef.instance.show(message, duration);
  }

  private destroy() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
  
}
