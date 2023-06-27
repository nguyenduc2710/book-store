import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})
export class FilterDataService{
  filterString = new BehaviorSubject<string>('');

  searchOnChange(value: string){
    this.filterString.next(value);
  }

}
