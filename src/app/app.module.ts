import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BmiVisualizerComponent } from './components/bmi-visualizer/bmi-visualizer.component';
import { AppErrorHandler } from './error-handler.model';
import { PetsListComponent } from './components/pets-list/pets-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BmiVisualizerComponent,
    PetsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
