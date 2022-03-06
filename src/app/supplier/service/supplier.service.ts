import { Injectable } from '@angular/core';
import {END} from "@angular/cdk/keycodes";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../customer/model/customer";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


}
