import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionFilter'
})
export class CollectionFilterPipe implements PipeTransform {

  transform(collection: any[] | null, term: string | boolean, filterByField: string): any {

    if (term !== undefined) {

      if (typeof term === "boolean") {

        return collection?.filter(item => item[filterByField] === term);
      } 
      else {

        return term ? collection?.filter(item => item[filterByField].toLowerCase().indexOf(term.toLowerCase()) !== -1) : collection;
      }
    }

    else return collection;
  }

}
