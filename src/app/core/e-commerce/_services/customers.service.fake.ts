// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
// Lodash
import { each } from 'lodash';
// CRUD
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../../_base/crud';
// Models
import { ProjectModel } from '../_models/project.model';

const API_CUSTOMERS_URL = 'https://xkszdf3uq8.execute-api.ap-south-1.amazonaws.com/dev/projects';

// Fake REST API (Mock)
// This code emulates server calls
@Injectable()
export class CustomersService {
  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {
  }

  // CREATE =>  POST: add a new customer to the server
  createCustomer(customer: ProjectModel): Observable<ProjectModel> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<ProjectModel>(API_CUSTOMERS_URL, customer, {headers: httpHeaders});
  }

  // READ
  getAllCustomers(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(API_CUSTOMERS_URL);
  }

  getCustomerById(customerId: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(API_CUSTOMERS_URL + `/${customerId}`);
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findCustomers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    const url = API_CUSTOMERS_URL;
    return this.http.get<ProjectModel[]>(API_CUSTOMERS_URL).pipe(
      mergeMap(res => {
        const result = this.httpUtils.baseFilter(res, queryParams, ['status','type']);
        return of(result);
      })
    );
  }


  // UPDATE => PUT: update the customer on the server
  updateCustomer(customer: ProjectModel): Observable<any> {
    const httpHeader = this.httpUtils.getHTTPHeaders();
    return this.http.put(API_CUSTOMERS_URL, customer, {headers: httpHeader});
  }

  // UPDATE Status
  updateStatusForCustomer(customers: ProjectModel[], status: number): Observable<any> {
    const tasks$ = [];
    each(customers, element => {
      // tslint:disable-next-line
      const _customer = Object.assign({}, element);
      tasks$.push(this.updateCustomer(_customer));
    });
    return forkJoin(tasks$);
  }

  // DELETE => delete the customer from the server
  deleteCustomer(customerId: number): Observable<any> {
    const url = `${API_CUSTOMERS_URL}/${customerId}`;
    return this.http.delete<ProjectModel>(url);
  }

  deleteCustomers(ids: number[] = []): Observable<any> {
    const tasks$ = [];
    const length = ids.length;
    // tslint:disable-next-line:prefer-const
    for (let i = 0; i < length; i++) {
      tasks$.push(this.deleteCustomer(ids[i]));
    }
    return forkJoin(tasks$);
  }
}
