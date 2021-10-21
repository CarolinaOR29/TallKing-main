import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorialesPageRoutingModule } from './tutoriales-routing.module';

import { TutorialesPage } from './tutoriales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialesPageRoutingModule
  ],
  declarations: [TutorialesPage]
})
export class TutorialesPageModule {}
