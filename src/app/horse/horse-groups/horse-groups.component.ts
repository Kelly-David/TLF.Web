import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { HorseService } from '../../shared/services/horse.service';

@Component({
  selector: 'app-horse-groups',
  templateUrl: './horse-groups.component.html',
  styleUrls: ['./horse-groups.component.scss']
})
export class HorseGroupsComponent implements OnInit {

  @Input() familyList!: [];

  public horses!: Array<string>;
  public loaded = false;
  private subscription = new Subject();

  constructor(
    private horseService: HorseService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    if (Array.isArray(this.familyList) && this.familyList.length > 0) {
      this.horses = [];
      let processed = 0;
      this.familyList.forEach(id => {
        this.horseService.V1GetHorseFamilyGroupById(id).pipe(
          takeUntil(this.subscription),
          filter(data => !!data))
          .subscribe(data => {
            this.horses.push(...(data as any).members);
            processed++;
            if (processed === this.familyList.length) {
              this.dataLoaded();
            }
          });
      });
    }
  }

  public dataLoaded() {
    this.horses = Array.from(new Set(this.horses));
    this.loaded = true;
    this.subscription.next();
    this.subscription.complete();
  }

}
