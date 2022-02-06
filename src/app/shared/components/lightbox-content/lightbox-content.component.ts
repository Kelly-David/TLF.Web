import { Component, Input, OnInit, OnChanges, HostListener } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Direction, Image, KEY_CODE } from '../../models/web.models';
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.code === KEY_CODE.RIGHT_ARROW) {
      this.arrowClick(Direction[Direction.Right]);
    }

    if (event.code === KEY_CODE.LEFT_ARROW) {
      this.arrowClick(Direction[Direction.Left]);
    }
  }

  public arrowClick(arrow: string) {

    console.log(arrow);
    
    var direction : Direction = Direction[arrow as keyof typeof Direction];

    return this.viewService.emitLightboxControlClick({id: this.image.Id, arrow: direction});
  }

}
