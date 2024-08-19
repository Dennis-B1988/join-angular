import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule, 
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
