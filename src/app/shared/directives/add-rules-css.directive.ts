import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

export interface RuleCssBySelector {
  selector: string;
  style: { [key: string]: any };
}

@Directive({
  selector: '[appAddRuleCss]',
  standalone: true,
})
export class AddRuleCssDirective implements AfterViewInit {
  @Input('ruleCss') rule!: RuleCssBySelector;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement.querySelector(this.rule.selector);

    if (element) {
      let key = Object.keys(this.rule.style)[0];
      let value = this.rule.style[key];
      this.renderer.setStyle(element, key, value);
    }
  }
}
