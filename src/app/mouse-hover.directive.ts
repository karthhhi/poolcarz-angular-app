import {Directive, ElementRef, Renderer2, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMouseHover]'
})
export class MouseHoverDirective {
  @Input('appMouseHover') color: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseover')
  onHover() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#AAD7EA');
  }

  @HostListener('mouseleave')
  onLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent');
  }
}
