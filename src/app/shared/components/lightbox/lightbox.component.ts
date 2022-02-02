import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LightboxContentComponent } from '../lightbox-content/lightbox-content.component';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {

  constructor(
    public modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(LightboxContentComponent);
    modalRef.componentInstance.name = 'World';
  }

}
