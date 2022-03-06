import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiServerUrl  = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }
  public getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiServerUrl}/order/all`)
  }
  public addOrderByCustomerId(customerId: number, order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiServerUrl}/order/customer/${customerId}/order`, order)
  }
  public deleteOrderById(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/order/delete/${orderId}`)
  }
  public  getOrderById(orderId: number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/order/find/${orderId}`)
  }
  public getOrderByCustomerId(customerId: number):Observable<Order>{
    return this.http.get<Order>(`${this.apiServerUrl}/order/customer/${customerId}/order`)
  }
  public getCustomerByOrderId(orderId: number): Observable<Order>{
    return this.http.get<Order>(`${this.apiServerUrl}/order/${orderId}`)
  }
}
