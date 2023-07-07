import { Component, ContentChild, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: 'app-layout-footer',
  template: `
    <footer class="footer">
      @ 2023 BOKET.COM
      <div id="shadow">l,;l,</div>
    </footer>
  `,
  styles: ['.footer {width: 100%; text-align: center;}'],
})

export class LayoutFooter{
  @ViewChild(TemplateRef, { static: true }) panelBody: TemplateRef<unknown> | undefined;


}
