import { Component, Input, OnChanges } from '@angular/core';
import { HorseService } from '../../shared/services/horse.service';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/shared/models/horse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, filter } from 'rxjs/operators';
import { ListItem, FormEvent, FormEventType } from '../../shared/models/web.models';

@Component({
  selector: 'app-horse-edit',
  templateUrl: './horse-edit.component.html',
  styleUrls: ['./horse-edit.component.scss']
})
export class HorseEditComponent implements OnChanges {

  @Input() id: string | undefined;
  public form: FormGroup;
  public infoList = [] as Array<ListItem>;
  public familyList = [] as Array<ListItem>;
  public familyCollection = [] as Array<ListItem>;
  public loaded: boolean;

  constructor(
    private horseService: HorseService,
    private formBuilder: FormBuilder) {

    this.loaded = false;
    this.horseService.V1GetFamilyCollection().pipe(take(1)).pipe(filter(data => !!data))
      .subscribe(data => {

        this.familyCollection = data.map((item: any) => ({ Id: item.id, Value: item.description }))
      });

    this.form = this.formBuilder.group({
      'FormId': [{ value: this.id, disabled: true }, [Validators.required]],
      'FormName': ['', [Validators.required]],
      'FormSire': ['', [Validators.required]],
      'FormDam': ['', [Validators.required]],
      'FormColor': ['', [Validators.required]],
      'FormYear': ['', [Validators.required]],
      'FormGender': ['', [Validators.required]],
      'FormHeight': ['', [Validators.required]],
      'FormProfile': ['', [Validators.required]],
      'FormOwner': ['', [Validators.required]],
      'FormBreeder': ['', [Validators.required]],
      'FormCheckAMHA': [],
      'FormCheckAMHR': [],
      'FormCheckASPC': [],
      'FormCheckBMHS': [],
      'FormCheckFilterReference': [],
      'FormCheckFilterStallion': [],
      'FormCheckFilterBreeding': [],
      'FormCheckFilterMare': [],
      'FormCheckFilterFoal': [],
    })
  }

  ngOnChanges(): void {

    this.loaded = false;

    this.infoList = [];

    if (this.id != undefined) {

      this.horseService.V1GetHorseById(this.id).pipe(take(1)).pipe(filter(data => !!data)).subscribe(data => this.PatchForm(data));
    }
  }

  public SaveForm() {

    let horse = {
      name: this.FormName,
      year: this.FormYear,
      height: this.FormHeight,
      color: this.FormColor,
      gender: this.FormGender,
      sire: this.FormSire,
      dam: this.FormDam,
      breeder: this.FormBreeder,
      owner: this.FormOwner,
      profile: this.FormProfile,
      registrations: [],
      filter: [],
      info: []
    } as any;

    if (this.FormCheckAMHA == true) {
      horse.registrations.push("AMHA");
    }
    if (this.FormCheckAMHR == true) {
      horse.registrations.push("AMHR");
    }
    if (this.FormCheckASPC == true) {
      horse.registrations.push("ASPC");
    }
    if (this.FormCheckBMHS == true) {
      horse.registrations.push("BMHS");
    }

    if (this.FormCheckFilterBreeding == true) {
      horse.filter.push("breeding");
    }
    if (this.FormCheckFilterStallion == true) {
      horse.filter.push("stallion");
    }
    if (this.FormCheckFilterMare == true) {
      horse.filter.push("mare");
    }
    if (this.FormCheckFilterFoal == true) {
      horse.filter.push("foal");
    }
    if (this.FormCheckFilterReference == true) {
      horse.filter.push("reference");
    }

    horse.info = this.infoList.map(item => item.Value);

    console.log(horse);
  }

  private PatchForm(data: any) {

    this.infoList = [];
    this.familyList = [];

    let i = 0;
    data.info?.forEach((val: string) => {
      this.infoList.push({ Index: i, Value: val });
      i++;
    });

    i = 0;
    data.family?.forEach((val: string) => {
      this.familyList.push({ Id: val });
      i++;
    });

    this.form.patchValue({
      FormId: data.id ? data.id : '',
      FormName: data.name ? data.name : '',
      FormSire: data.sire ? data.sire : '',
      FormDam: data.dam ? data.dam : '',
      FormColor: data.color ? data.color : '',
      FormYear: data.year ? data.year : '',
      FormGender: data.gender ? data.gender : '',
      FormHeight: data.height ? data.height : '',
      FormProfile: data.profile ? data.profile : '',
      FormOwner: data.owner ? data.owner : '',
      FormBreeder: data.breeder ? data.breeder : '',
      FormCheckAMHA: false,
      FormCheckAMHR: false,
      FormCheckASPC: false,
      FormCheckBMHS: false,
      FormCheckFilterReference: false,
      FormCheckFilterStallion: false,
      FormCheckFilterBreeding: false,
      FormCheckFilterMare: false,
      FormCheckFilterFoal: false
    });

    data.registration.forEach((val: any) => {

      switch (val) {
        case "AMHA": {
          this.form.patchValue({ FormCheckAMHA: true });
          break;
        }
        case "AMHR": {
          this.form.patchValue({ FormCheckAMHR: true });
          break;
        }
        case "ASPC": {
          this.form.patchValue({ FormCheckASPC: true });
          break;
        }
        case "BMHS": {
          this.form.patchValue({ FormCheckBMHS: true });
          break;
        }
      }
    });

    data.filter.forEach((val: any) => {

      switch (val) {
        case "foal": {
          this.form.patchValue({ FormCheckFilterFoal: true });
          break;
        }
        case "stallion": {
          this.form.patchValue({ FormCheckFilterStallion: true });
          break;
        }
        case "mare": {
          this.form.patchValue({ FormCheckFilterMare: true });
          break;
        }
        case "breeding": {
          this.form.patchValue({ FormCheckFilterBreeding: true });
          break;
        }
        case "reference": {
          this.form.patchValue({ FormCheckFilterReference: true });
          break;
        }
      }
    });

    this.loaded = true;
  }

  get FormId() { return this.form.get('FormId')?.value }
  get FormName() { return this.form.get('FormName')?.value }
  get FormSire() { return this.form.get('FormSire')?.value }
  get FormDam() { return this.form.get('FormDam')?.value }
  get FormColor() { return this.form.get('FormColor')?.value }
  get FormYear() { return this.form.get('FormYear')?.value }
  get FormGender() { return this.form.get('FormGender')?.value }
  get FormHeight() { return this.form.get('FormHeight')?.value }
  get FormProfile() { return this.form.get('FormProfile')?.value }
  get FormOwner() { return this.form.get('FormOwner')?.value }
  get FormBreeder() { return this.form.get('FormBreeder')?.value }
  get FormCheckAMHA() { return this.form.get('FormCheckAMHA')?.value }
  get FormCheckAMHR() { return this.form.get('FormCheckAMHR')?.value }
  get FormCheckASPC() { return this.form.get('FormCheckASPC')?.value }
  get FormCheckBMHS() { return this.form.get('FormCheckBMHS')?.value }
  get FormCheckFilterReference() { return this.form.get('FormCheckFilterReference')?.value }
  get FormCheckFilterStallion() { return this.form.get('FormCheckFilterStallion')?.value }
  get FormCheckFilterBreeding() { return this.form.get('FormCheckFilterBreeding')?.value }
  get FormCheckFilterMare() { return this.form.get('FormCheckFilterMare')?.value }
  get FormCheckFilterFoal() { return this.form.get('FormCheckFilterFoal')?.value }

  public InfoChanges(event: FormEvent) {

    switch (event.Type) {

      case FormEventType.Update: {
        this.infoList[event.Item.Index!] = event.Item;
        break;
      }
      case FormEventType.Delete: {
        this.infoList.forEach((item, index) => {
          if (event.Item.Index == index) this.infoList.splice(index, 1);
        })

        // Reset the indexes
        let i = 0;
        this.infoList.forEach(item => {
          item.Index = i;
          i++;
        })

        break;
      }
      case FormEventType.Update: {
        this.infoList[event.Item.Index!] = event.Item;
        break;
      }
    };
  }

  public AddInfoItem() {
    let item = {
      Index: this.infoList?.length,
      Value: ""
    } as ListItem;

    this.infoList.push(item);
  }




}
