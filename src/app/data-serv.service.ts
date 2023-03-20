import { Injectable } from '@angular/core';
import { Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServService {
  canvasRealWidth = new Subject<string>;
  constructor() {

}
}
