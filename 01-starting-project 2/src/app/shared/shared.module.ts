import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';

const components = [CardComponent];

@NgModule({
  declarations: components,
  exports: components,
})
export class SharedModule {}
