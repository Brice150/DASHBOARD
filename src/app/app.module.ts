import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRouter } from './app.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageModule } from './page/page.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ErrorPathComponent } from './error-path/error-path.component';

@NgModule({
  declarations: [AppComponent, ErrorPathComponent],
  imports: [
    BrowserModule,
    appRouter,
    BrowserAnimationsModule,
    PageModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
