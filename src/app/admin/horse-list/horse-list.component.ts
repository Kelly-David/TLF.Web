import { Component, OnInit } from '@angular/core';
import { HorseService } from '../../shared/services/horse.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { V1Horse } from '../../shared/models/v1.model';
import { CrudAction, ActionType } from '../../shared/models/web.models';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {

  public horses$!: Observable<any[]>;
  public selected!: CrudAction<V1Horse> | undefined;

  constructor(
    private horseService: HorseService) { }

  ngOnInit(): void {

    this.horses$ = this.horseService.horses();
  }

  public AddHorse() {
     
    let horse = {} as V1Horse;
    
    horse.id = this.horseService.UniqueId();

    this.selected = { Type: ActionType.Add, Object: horse } as CrudAction<V1Horse>;
  }

  public UpdateHorse(horse: V1Horse) {
    this.selected = horse != undefined ? {Type: ActionType.Update, Object: horse} : undefined;
  }

}
