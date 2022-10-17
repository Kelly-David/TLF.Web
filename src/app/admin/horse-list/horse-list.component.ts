import { Component, OnInit } from '@angular/core';
import { HorseService } from '../../shared/services/horse.service';
import { Observable } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {

  public horses$!: Observable<any[]>;

  public selected: string | undefined;

  constructor(
    private horseService: HorseService
  ) { }

  ngOnInit(): void {

    this.horses$ = this.horseService.horses();
  }

}
