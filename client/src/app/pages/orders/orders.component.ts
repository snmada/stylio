import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { CustomerSidebarComponent } from '../../shared/components/customer-sidebar/customer-sidebar.component';

@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    LayoutComponent,
    CustomerSidebarComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent { }