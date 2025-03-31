import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  imports: [   
    RouterModule,
    ButtonComponent,
    LayoutComponent,
    MatIconModule
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent { }