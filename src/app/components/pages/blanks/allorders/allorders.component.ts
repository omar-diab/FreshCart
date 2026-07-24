import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { OrderService } from '../../../../core/services/order/order.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [NgClass, DatePipe, RouterLink],
  templateUrl: './allorders.component.html',
  styles: ``
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService = inject(OrderService);

  ordersList: any[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');

    if (!token) {
      this.isLoading = false;
      return;
    }

    const decoded: any = jwtDecode(token);

    this._OrdersService.getUserOrders(decoded.id).subscribe({
      next: (res) => {
        this.ordersList = res.reverse();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}