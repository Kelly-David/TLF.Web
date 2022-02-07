import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { HorseService } from '../../services/horse.service';

@Component({
  selector: 'app-horse-link',
  templateUrl: './horse-link.component.html',
  styleUrls: ['./horse-link.component.scss']
})
export class HorseLinkComponent implements OnChanges {

  @Input() horse = <any>null;
  @Input() horseId = '' as string;
  @Input() imageCard = true;

  public routerLink!: string; 
  public horse$!: Observable<any>;

  constructor(
    private horseService: HorseService
  ) { }

  ngOnChanges(): void {    
    
    if (this.horseId !== '') {

      this.horse$ = this.horseService.V1GetHorseById(this.horseId);
    }
    else if (this.horse !== null && this.horse?.id !== "") {

      this.routerLink = this.nameAsRoute(this.horse.name);
    }
  }

  public nameAsRoute(name: string): string {
    let route = '';
    route = name.split(' ').join('-').toLowerCase();
    return route;
  }

}
