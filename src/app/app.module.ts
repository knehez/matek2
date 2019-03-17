import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { SimpleOperationComponent } from './exercises/simple-operation/simple-operation.component';
import { RelationComponent } from './exercises/relation/relation.component';
import { SequenceComponent } from './exercises/sequence/sequence.component';
import { TextualComponent } from './textual/textual.component';
import { MultiplicationComponent } from './exercises/multiplication/multiplication.component';
import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SimpleOperationComponent,
    RelationComponent,
    SequenceComponent,
    TextualComponent,
    MultiplicationComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, PanelModule, 
    DialogModule, ButtonModule, CheckboxModule, InputTextModule, CardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
