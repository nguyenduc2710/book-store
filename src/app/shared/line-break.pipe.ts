import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'lineBreak'
})
export class LineBreak implements PipeTransform{
  transform(value: string) {
    const sentences = value.split('. ');
    const addBreak = sentences.map((item, index) => {
      if(index % 5 === 0){
        return item + "\n";
      }
      return item;
    })
    return addBreak.join('. ');
  }
}
