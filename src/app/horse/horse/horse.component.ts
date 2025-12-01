import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { HorseService } from 'src/app/shared/services/horse.service';
import { Image } from '../../shared/models/web.models';
import { ViewService } from '../../shared/services/view.service';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})
export class HorseComponent implements OnChanges, OnDestroy {

  @Input() horseID = '' as string;

  public horse$!: Observable<any>;

  private images!: Subscription;

  public contentReady = false;
  public contentImages!: Image[];

  // grouped accolades
  public groupedAccolades: { [year: string]: any[] } = {};
  public groupedAccoladesKeys: string[] = [];
  // flat sorted accolades list (sorted by year desc)
  public sortedAccolades: any[] = [];
  // progeny accolades grouped by progeny name (include progeny id and basic horse fields)
  public progenyAccolades: Array<{ id: string; name: string; accolades: any[]; sire?: string; dam?: string; color?: string; gender?: string; year?: number }> = [];
  private progenySubs: Subscription[] = [];
  private horseSub?: Subscription;

  constructor(
    private horseService: HorseService,
  ) { }

  ngOnDestroy(): void {
    
    this.images.unsubscribe();
    if (this.horseSub) {
      this.horseSub.unsubscribe();
    }
    this.progenySubs.forEach(s => s.unsubscribe());
  }

  ngOnChanges() {
    if (this.horseID !== '') {

      this.horse$   = this.horseService.V1GetHorseById(this.horseID);

      // subscribe to horse observable to compute grouped accolades
      if (this.horseSub) {
        this.horseSub.unsubscribe();
      }
      this.horseSub = this.horse$.subscribe(horse => {
        if (horse && Array.isArray(horse.accolades) && horse.accolades.length) {
          const groups: { [year: string]: any[] } = {};
          horse.accolades.forEach((a: any) => {
            const y = a && a.year ? String(a.year) : 'Unknown';
            if (!groups[y]) groups[y] = [];
            groups[y].push(a);
          });
          // sort years descending
          this.groupedAccoladesKeys = Object.keys(groups).sort((a, b) => Number(b) - Number(a));
          this.groupedAccolades = groups;

          // also prepare a flat sorted list for simple rendering
          this.sortedAccolades = (horse.accolades || []).slice().sort((a: any, b: any) => (b.year || 0) - (a.year || 0));
        } else {
          this.groupedAccolades = {};
          this.groupedAccoladesKeys = [];
          this.sortedAccolades = [];
        }
        
        // load accolades for progeny (if any)
        // clear previous subs
        this.progenySubs.forEach(s => s.unsubscribe());
        this.progenySubs = [];
        this.progenyAccolades = [];
        if (horse && Array.isArray(horse.progeny) && horse.progeny.length) {
          const pending: Array<Promise<void>> = [];
          horse.progeny.forEach((pid: string) => {
            if (!pid) return;
            const p = new Promise<void>((resolve) => {
              const sub = this.horseService.V1GetHorseById(pid).pipe(take(1)).subscribe((ph: any) => {
                if (ph) {
                  const list = Array.isArray(ph.accolades) ? ph.accolades.slice().sort((a: any, b: any) => (b.year || 0) - (a.year || 0)) : [];
                  // only push progeny that have at least one accolade
                  if (list && list.length) {
                    this.progenyAccolades.push({
                      id: ph.id || pid,
                      name: ph.name || pid,
                      accolades: list,
                      sire: ph.sire || undefined,
                      dam: ph.dam || undefined,
                      color: ph.color || undefined,
                      gender: ph.gender || undefined,
                      year: ph.year ? Number(ph.year) : undefined
                    });
                  }
                }
                resolve();
              }, () => resolve());
              this.progenySubs.push(sub);
            });
            pending.push(p);
          });
          // when all fetched, sort progeny list by name
          Promise.all(pending).then(() => {
            this.progenyAccolades.sort((a, b) => String(a.name).localeCompare(String(b.name)));
          });
        }
      });

      this.images = this.horseService.V1GetImagesByHorseId(this.horseID).subscribe(images => {
        if (images !== undefined) {

          let index = 0;

          this.contentImages = images.map(item => {

            return ({
                Id: (index++).toString(), 
                PathToFullImg: item.downloadURL, 
                PathToThumbnail: item.downloadURL,
                Description: "",
                AltText: ""
             })
          });

          this.contentReady = true;
        }
      });
    }
  }
}