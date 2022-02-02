import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Direction, Image } from '../../models/web.models';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-lightbox-content',
  templateUrl: './lightbox-content.component.html',
  styleUrls: ['./lightbox-content.component.scss']
})
export class LightboxContentComponent implements OnChanges {

  @Input() image!: Image;

  constructor(
    public activeModal: NgbActiveModal,
    private viewService: ViewService
  ) { }

  ngOnChanges(): void {
  }

  public arrowClick(arrow: string) {
    
    var direction : Direction = Direction[arrow as keyof typeof Direction];

    return this.viewService.emitLightboxControlClick({id: this.image.Id, arrow: direction});
  }

}
