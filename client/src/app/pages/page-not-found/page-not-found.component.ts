import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@Component({
  selector: 'app-page-not-found',
  imports: [
    RouterModule,
    ButtonComponent,
    LayoutComponent
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent { }