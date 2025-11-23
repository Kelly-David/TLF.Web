import { Component, Input, OnChanges, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { HorseService } from '../../shared/services/horse.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, filter } from 'rxjs/operators';
import { ListItem, FormEvent, ActionType, CrudAction } from '../../shared/models/web.models';
import { V1Horse } from 'src/app/shared/models/v1.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horse-edit',
  templateUrl: './horse-edit.component.html',
  styleUrls: ['./horse-edit.component.scss']
})
export class HorseEditComponent implements OnChanges, OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  @Input() input: CrudAction<V1Horse> | undefined;
  public horse!: V1Horse;
  public form: FormGroup;
  public infoList = [] as Array<ListItem>;
  public familyList = [] as Array<ListItem>;
  public familyCollection = [] as Array<ListItem>;
  public loaded: boolean;

  // new properties
  public allHorses = [] as Array<{ Id?: string; Name?: string }>;
  public copiedPedigree: any = undefined;
  public ActionType = ActionType;
  public selectedProgeny: Array<{ Id?: string; Name?: string }> = [];

  constructor(private horseService: HorseService, private formBuilder: FormBuilder) {
    
    this.loaded = false;

    this.horseService.V1GetFamilyCollection().pipe(take(1)).pipe(filter(data => !!data))
      .subscribe(data => {

        this.familyCollection = data.map((item: any) => ({ Id: item.id, Value: item.description }))
      });

    this.form = this.formBuilder.group({
      'FormId': [{ value: '', disabled: true }, [Validators.required]],
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
      'FormCheckFilterShowing': [],
      'FormCheckFilterMare': [],
      'FormCheckFilterFoal': [],
      'FormAvailable': [],
      'FormSold': [],
      'FormProgeny': [[]]
    })
  }

  ngOnInit(): void {
    // load minimal list of all horses for the dropdown (id + name)
    this.horseService.horses().pipe(take(1)).pipe(filter(data => !!data)).subscribe(data => {
      this.allHorses = data.map((item: any) => ({ Id: item.id, Name: item.name }));
      
      // initialize selectedProgeny from current form value (if any)
      const current = this.form.get('FormProgeny')?.value || [];
      this.selectedProgeny = (current || []).map((id: string) => this.allHorses.find(h => h.Id === id)).filter(Boolean) as any[];
    });

    // mutual exclusivity: if Available checked, clear Sold; if Sold checked, clear Available
    const availControl = this.form.get('FormAvailable');
    const soldControl = this.form.get('FormSold');

    if (availControl && soldControl) {
      const sub1 = availControl.valueChanges.subscribe(val => {
        if (val === true) {
          soldControl.setValue(false, { emitEvent: false });
        }
      });
      const sub2 = soldControl.valueChanges.subscribe(val => {
        if (val === true) {
          availControl.setValue(false, { emitEvent: false });
        }
      });

      this.subscriptions.push(sub1, sub2);
    }

    // update selectedProgeny when FormProgeny changes
    const progenyControl = this.form.get('FormProgeny');
    if (progenyControl) {
      const subP = progenyControl.valueChanges.subscribe((ids: string[]) => {
        this.selectedProgeny = (ids || []).map((id: string) => this.allHorses.find(h => h.Id === id)).filter(Boolean) as any[];
      });
      this.subscriptions.push(subP);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnChanges(): void {

    this.loaded = false;
    this.infoList = [];

    if (this.input != undefined) {

      this.horse = this.input.Object as V1Horse;

      switch (this.input.Type) {

        case ActionType.Add: {

          this.PatchForm(this.horse);

          break;
        } 
        case ActionType.Update: {

          this.horseService.V1GetHorseById(this.horse.id!).pipe(take(1)).pipe(filter(data => !!data)).subscribe(data => this.PatchForm(data));
          
          break;
        }
      }
    }
  }

  // copy pedigree from another horse id; also patch sire/dam for convenience
  public CopyPedigreeFrom(horseId: string) {
    if (!horseId) {
      this.copiedPedigree = undefined;
      return;
    }

    this.horseService.V1GetHorseById(horseId).pipe(take(1)).pipe(filter(data => !!data)).subscribe((h: any) => {
      if (!h) return;
      // store pedigree to apply on save
      this.copiedPedigree = h.pedigree ? h.pedigree : undefined;

      // also copy top-level sire/dam fields into the form so user can see them
      this.form.patchValue({
        FormSire: h.sire ? h.sire : this.form.get('FormSire')?.value,
        FormDam: h.dam ? h.dam : this.form.get('FormDam')?.value
      });
    });
  }

  private PatchForm(data: V1Horse) {

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
      FormCheckFilterShowing: false,
      FormCheckFilterMare: false,
      FormCheckFilterFoal: false,
      FormAvailable: data.available === true,
      FormSold: data.sold === true,
      FormProgeny: data.progeny ? data.progeny : []
    });

    data.registration?.forEach((val: any) => {

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

    data.filter?.forEach((val: any) => {

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
        case "showing": {
          this.form.patchValue({ FormCheckFilterShowing: true });
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
  get FormProfile() { return this.form.get('FormProfile')?.value as string }
  get FormOwner() { return this.form.get('FormOwner')?.value }
  get FormBreeder() { return this.form.get('FormBreeder')?.value }
  get FormCheckAMHA() { return this.form.get('FormCheckAMHA')?.value }
  get FormCheckAMHR() { return this.form.get('FormCheckAMHR')?.value }
  get FormCheckASPC() { return this.form.get('FormCheckASPC')?.value }
  get FormCheckBMHS() { return this.form.get('FormCheckBMHS')?.value }
  get FormCheckFilterReference() { return this.form.get('FormCheckFilterReference')?.value }
  get FormCheckFilterStallion() { return this.form.get('FormCheckFilterStallion')?.value }
  get FormCheckFilterBreeding() { return this.form.get('FormCheckFilterBreeding')?.value }
  get FormCheckFilterShowing() { return this.form.get('FormCheckFilterShowing')?.value }
  get FormCheckFilterMare() { return this.form.get('FormCheckFilterMare')?.value }
  get FormCheckFilterFoal() { return this.form.get('FormCheckFilterFoal')?.value }
  get FormAvailable() { return this.form.get('FormAvailable')?.value }
  get FormSold() { return this.form.get('FormSold')?.value }
  get FormProgeny() { return this.form.get('FormProgeny')?.value as string[] }

  public InfoChanges(event: FormEvent) {

    switch (event.Type) {

      case ActionType.Update: {
        this.infoList[event.Item.Index!] = event.Item;
        break;
      }
      case ActionType.Delete: {
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
      case ActionType.Update: {
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

  public UpdateFamilyList(list: Array<ListItem>) {
    this.familyList = list;
  }

  public UpdateProfile(url: string) {
    this.form.patchValue({ FormProfile: url });
  }

  public DeleteHorse() {
    if (confirm("Are you sure?")) {
      this.horseService.V1DeleteHorse(this.horse.id!, this.horse.name!);
      this.input = undefined;
      this.ngOnChanges();
    }
  }

  public SaveForm() {

    if (confirm("Are you sure?")) {
      this.horse = {
        id: this.FormId,
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
        registration: [],
        filter: [],
        info: [],
        family: []
      } as any;

      // if a pedigree was copied from another horse, include it on the saved object
      if (this.copiedPedigree) {
        (this.horse as any).pedigree = this.copiedPedigree;
      }

      if (this.FormCheckAMHA == true) {
        this.horse.registration?.push("AMHA");
      }
      if (this.FormCheckAMHR == true) {
        this.horse.registration?.push("AMHR");
      }
      if (this.FormCheckASPC == true) {
        this.horse.registration?.push("ASPC");
      }
      if (this.FormCheckBMHS == true) {
        this.horse.registration?.push("BMHS");
      }

      if (this.FormCheckFilterBreeding == true) {
        this.horse.filter?.push("breeding");
      }
      if (this.FormCheckFilterStallion == true) {
        this.horse.filter?.push("stallion");
      }
      if (this.FormCheckFilterShowing == true) {
        this.horse.filter?.push("showing");
      }
      if (this.FormCheckFilterMare == true) {
        this.horse.filter?.push("mare");
      }
      if (this.FormCheckFilterFoal == true) {
        this.horse.filter?.push("foal");
      }
      if (this.FormCheckFilterReference == true) {
        this.horse.filter?.push("reference");
      }

      // available / sold flags
      if (this.FormAvailable === true) {
        this.horse.available = true;
      } else {
        this.horse.available = false;
      }

      if (this.FormSold === true) {
        this.horse.sold = true;
      } else {
        this.horse.sold = false;
      }

      // progeny
      this.horse.progeny = this.FormProgeny ? this.FormProgeny : [];

      this.horse.info = this.infoList?.map(item => item.Value!);
      this.horse.family = this.familyList?.map(item => item.Id!);

      switch (this.input?.Type) {
        case ActionType.Add: {
          this.horseService.V1AddHorse(this.horse);
          break;
        }
        case ActionType.Update: {
          this.horseService.V1UpdateHorse(this.horse.id!, this.horse);
          break;
        }
      }
    }
  }

  public RemoveProgeny(id?: string) {
    if (!id) return;
    const list = this.FormProgeny ? [...this.FormProgeny] : [];
    const idx = list.indexOf(id);
    if (idx >= 0) {
      list.splice(idx, 1);
      this.form.patchValue({ FormProgeny: list });
    }
  }
}
