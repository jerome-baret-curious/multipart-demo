import {Injectable} from '@angular/core';
import {from, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MultiService {

  fetchMulti(): Observable<FormData> {
    return from(fetch("http://localhost:8080/multi", {
      method: "GET"
    })).pipe(switchMap(mp => mp.formData()));
  };
}
