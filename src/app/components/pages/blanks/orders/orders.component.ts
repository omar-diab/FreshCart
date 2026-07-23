import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../core/services/order/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styles: ``
})
export class OrdersComponent implements OnInit{
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrderService = inject(OrderService);


  cardID: string | null = '';

  orders: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params) =>{
        this.cardID = params.get('id');
      },
      error(err) {
        console.log(err)
      },
    })
  }

  OrderSubmit(): void {
    this._OrderService.checkOut(this.cardID, this.orders.value).subscribe({
      next:(res) => {
        if(res.status == 'success') {
          window.open(res.session.url, '_blank');
        }
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
