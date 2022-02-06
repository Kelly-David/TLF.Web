import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-horse-link',
  templateUrl: './horse-link.component.html',
  styleUrls: ['./horse-link.component.scss']
})
export class HorseLinkComponent implements OnChanges {

  @Input() horse: undefined | any;

  public routerLink!: string;

  constructor() { }

  ngOnChanges(): void {    
    
    if (this.horse !== null) {

      this.routerLink = this.nameAsRoute(this.horse.name);
    }
  }

  private nameAsRoute(name: string): string {
    let route = '';
    route = name.split(' ').join('-').toLowerCase();
    return route;
  }

}
