import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';

import * as queryString from 'query-string';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(private http: HttpClient, private messages: MessagesService) { }

  get<payloadT>(endPointUrl: string, payload?: any): Observable<payloadT> {
    const params = payload
      ? new HttpParams({
        fromString: queryString.stringify(payload, { skipNull: true }),
      })
      : {};

    return new Observable((observer) => {
      this.http
        .get<payloadT>(`${environment.baseUrl}/${endPointUrl}`, {
          params,
        })
        .pipe(map(response => response["payload"]), shareReplay(), catchError((error) => of(error)))
        .subscribe((res: any) => {
          res?.error ? observer.error(res.error) : observer.next(res);
          observer.complete();
        });
    });
  }

  put<payloadT>(endPointUrl: string, payload: any): Observable<any> {
    return new Observable((observer) => {
      this.http
        .put<payloadT>(
          `${environment.baseUrl}/${endPointUrl}`,
          payload,
        )
        .pipe(catchError((error) =>
          this.messages.showErrors(error.statusText)
        ))
        .subscribe((res: any) => {
          res?.error ? observer.error(res.error) : observer.next(res);
          observer.complete();
        });
    });
  }
}
