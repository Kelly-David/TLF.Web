import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from '../../models/horse.model';
import { ViewService } from '../../services/view.service';
import { HorseService } from '../../services/horse.service';

@Component({
  selector: 'app-horse-card',
  templateUrl: './horse-card.component.html',
  styleUrls: ['./horse-card.component.scss']
})
export class HorseCardComponent implements OnChanges {

  @Input() horseId!: string;
  @Input() limitview = false as boolean;
  @Input() splitview = false as boolean;

  public horse$!: Observable<any>;

  constructor( 
    public viewService: ViewService,
    private horseService: HorseService
  ) { }

  ngOnChanges() {

    if (this.horseId !== "") {

      this.horse$ = this.horseService.V1GetHorseById(this.horseId);
    }

  }

  public nameAsRoute(name: string): string {

    let route = '';

    return name.split(' ').join('-').toLowerCase();
  }

  public getThumbnail(name: string) {
    
    return '../../assets/image/horse/thumb/' + name;
  }

}
