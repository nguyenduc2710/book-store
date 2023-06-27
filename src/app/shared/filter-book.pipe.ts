import { Pipe, PipeTransform } from "@angular/core";
import { BookService } from "../services/book.services";

@Pipe({
  name: 'FilterBook'
})
export class FilterBook implements PipeTransform{
  transform(value: any[], searchString: string) {
    if(searchString){
      const search = searchString.toLowerCase();
      return value.filter((item) => {
        return item.name.toLowerCase().indexOf(search) > -1;
      })
    }
    return value;
  }
}
