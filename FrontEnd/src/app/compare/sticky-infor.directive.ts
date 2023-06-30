import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStickyInfor]'
})
export class StickyInforDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onScroll() {
    const container = this.elementRef.nativeElement.closest('.cha');
    const infor = this.elementRef.nativeElement;
    const containerRect = container.getBoundingClientRect();
    const containerHeight = containerRect.height;
    const inforHeight = infor.offsetHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    if (
      scrollY >= containerRect.top &&
      scrollY <= containerRect.top + containerHeight - inforHeight
    ) {
      this.renderer.setStyle(infor, 'top', scrollY - containerRect.top + 'px');
    } else if (scrollY > containerRect.top + containerHeight - inforHeight) {
      this.renderer.setStyle(infor, 'top', containerHeight - inforHeight + 'px');
    } else {
      this.renderer.setStyle(infor, 'top', '0');
    }
  }
}
