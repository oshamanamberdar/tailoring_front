import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Order} from "../../customer-profile/model/order";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Measurement} from "../../customer-profile/model/measurement";

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMeasurementList(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${this.apiServerUrl}/measurement/all`)
  }
  public addMeasurementByCustomerId(customerId: number, measurement: Measurement): Observable<Measurement> {
    return this.http.post<Measurement>(`${this.apiServerUrl}/measurement/customers/${customerId}/measurement`, measurement)
  }
  public deleteMeasurementById(measurementId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/measurement/delete/${measurementId}`)
  }
  public  getMeasurementById(measurementId: number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/measurement/find/${measurementId}`)
  }
  public getMeasurementByCustomerId(customerId: number):Observable<Measurement>{
    return this.http.get<Measurement>(`${this.apiServerUrl}/measurement/customer/${customerId}/measurement`)
  }
}
