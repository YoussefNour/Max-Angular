import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onClickConfirmLeave($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myApp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {}

  onClickConfirmLeave(event: MouseEvent) {
    let wantsToLeave = window.confirm('Do you want to leave the app');
    const address = this.hostElementRef.nativeElement.href;
    this.hostElementRef.nativeElement.href =
      address + `?from=${this.queryParam()}`;
    if (wantsToLeave) return;
    event?.preventDefault();
  }
}
