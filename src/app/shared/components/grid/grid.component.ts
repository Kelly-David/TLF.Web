import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Image, Direction } from '../../models/web.models';
import { LightboxContentComponent } from '../lightbox-content/lightbox-content.component';
import { ViewService } from '../../services/view.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges, OnDestroy {

  @Input() imagesContent!: Image[];

  private modalRef!: NgbModalRef
  private subscription!: Subscription

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private viewService: ViewService
  ) { }

  ngOnInit(): void {

    this.subscription = this.viewService.lightboxClick.subscribe(clickEvent => {
      if(Object.keys(clickEvent).length !== 0) {
        this.showNext(clickEvent.id, clickEvent.arrow);
      }
    })
  }

  ngOnChanges(): void {
  }

  public gridCardClickEvent(imageId: any) {

    let id  = imageId as string;

    this.open(id);
  }

  private showNext(currentId: string, arrow: Direction) {

    const currentIndex = this.imagesContent.indexOf(this.imagesContent.filter(i => i.Id === currentId)[0]);
    const nextIndex = arrow == Direction.Left ? (currentIndex - 1) : (currentIndex + 1);

    let nextImage = this.imagesContent[nextIndex];

    if (nextImage !== undefined) {
      
      this.modalRef.componentInstance.image = nextImage;
    }
    else {
      this.modalRef.componentInstance.image = arrow == Direction.Left ? 
      this.imagesContent[this.imagesContent.length-1] : this.imagesContent[0];
    }
  }

  private open(id: string) {
    this.modalRef = this.modalService.open(LightboxContentComponent, {size: 'lg', centered: true });
    this.modalRef.componentInstance.image = this.imagesContent.filter(item => item.Id === id)[0];
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

}
