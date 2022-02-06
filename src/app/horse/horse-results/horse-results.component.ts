import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HorseService } from '../../shared/services/horse.service';

@Component({
  selector: 'app-horse-results',
  templateUrl: './horse-results.component.html',
  styleUrls: ['./horse-results.component.scss']
})
export class HorseResultsComponent implements OnInit {

  @Input() horseId!: string;
  public horse$!: Observable<any>;
  public results$!: Observable<any>;
  public progeny$!: Observable<any>;

  constructor(
    private horseService: HorseService
  ) { }

  ngOnInit(): void {

    this.horse$ = this.horseService.V1GetHorseById(this.horseId);
    this.results$ = this.horseService.V1GetAccoladesByHorseId(this.horseId);
    this.progeny$ = this.horseService.V1GetProgenyByParentId(this.horseId);
  }

}
