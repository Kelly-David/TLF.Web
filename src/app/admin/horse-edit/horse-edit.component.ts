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
      'FormProgeny': [[]],
      // Pedigree fields
      'FormPedigreeSire': [''],
      'FormPedigreeGsiretop': [''],
      'FormPedigreeGsiretopsire': [''],
      'FormPedigreeGsiretopdam': [''],
      'FormPedigreeGdamtop': [''],
      'FormPedigreeGdamtopsire': [''],
      'FormPedigreeGdamtopdam': [''],
      'FormPedigreeDam': [''],
      'FormPedigreeGsirebtm': [''],
      'FormPedigreeGsirebtmsire': [''],
      'FormPedigreeGsirebtmbtm': [''],
      'FormPedigreeGdambtm': [''],
      'FormPedigreeGdambtmsire': [''],
      'FormPedigreeGdambtmbtm': ['']
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
      // clear pedigree fields on the form
      this.form.patchValue({
        FormPedigreeSire: '',
        FormPedigreeGsiretop: '',
        FormPedigreeGsiretopsire: '',
        FormPedigreeGsiretopdam: '',
        FormPedigreeGdamtop: '',
        FormPedigreeGdamtopsire: '',
        FormPedigreeGdamtopdam: '',
        FormPedigreeDam: '',
        FormPedigreeGsirebtm: '',
        FormPedigreeGsirebtmsire: '',
        FormPedigreeGsirebtmbtm: '',
        FormPedigreeGdambtm: '',
        FormPedigreeGdambtmsire: '',
        FormPedigreeGdambtmbtm: ''
      });
      return;
    }

    this.horseService.V1GetHorseById(horseId).pipe(take(1)).pipe(filter(data => !!data)).subscribe((h: any) => {
      if (!h) return;
      // store pedigree to apply on save
      this.copiedPedigree = h.pedigree ? h.pedigree : undefined;

      // also copy top-level sire/dam fields into the form so user can see them
      this.form.patchValue({
        FormSire: h.sire ? h.sire : this.form.get('FormSire')?.value,
        FormDam: h.dam ? h.dam : this.form.get('FormDam')?.value,
        // and patch the pedigree inputs so the form is prefilled for editing
        FormPedigreeSire: h.pedigree?.sire ? h.pedigree.sire : '',
        FormPedigreeGsiretop: h.pedigree?.gsiretop ? h.pedigree.gsiretop : '',
        FormPedigreeGsiretopsire: h.pedigree?.gsiretopsire ? h.pedigree.gsiretopsire : '',
        FormPedigreeGsiretopdam: h.pedigree?.gsiretopdam ? h.pedigree.gsiretopdam : '',
        FormPedigreeGdamtop: h.pedigree?.gdamtop ? h.pedigree.gdamtop : '',
        FormPedigreeGdamtopsire: h.pedigree?.gdamtopsire ? h.pedigree.gdamtopsire : '',
        FormPedigreeGdamtopdam: h.pedigree?.gdamtopdam ? h.pedigree.gdamtopdam : '',
        FormPedigreeDam: h.pedigree?.dam ? h.pedigree.dam : '',
        FormPedigreeGsirebtm: h.pedigree?.gsirebtm ? h.pedigree.gsirebtm : '',
        FormPedigreeGsirebtmsire: h.pedigree?.gsirebtmsire ? h.pedigree.gsirebtmsire : '',
        FormPedigreeGsirebtmbtm: h.pedigree?.gsirebtmbtm ? h.pedigree.gsirebtmbtm : '',
        FormPedigreeGdambtm: h.pedigree?.gdambtm ? h.pedigree.gdambtm : '',
        FormPedigreeGdambtmsire: h.pedigree?.gdambtmsire ? h.pedigree.gdambtmsire : '',
        FormPedigreeGdambtmbtm: h.pedigree?.gdambtmbtm ? h.pedigree.gdambtmbtm : ''
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
      FormProgeny: data.progeny ? data.progeny : [],
      // pedigree patching
      FormPedigreeSire: data.pedigree?.sire ? data.pedigree.sire : '',
      FormPedigreeGsiretop: data.pedigree?.gsiretop ? data.pedigree.gsiretop : '',
      FormPedigreeGsiretopsire: data.pedigree?.gsiretopsire ? data.pedigree.gsiretopsire : '',
      FormPedigreeGsiretopdam: data.pedigree?.gsiretopdam ? data.pedigree.gsiretopdam : '',
      FormPedigreeGdamtop: data.pedigree?.gdamtop ? data.pedigree.gdamtop : '',
      FormPedigreeGdamtopsire: data.pedigree?.gdamtopsire ? data.pedigree.gdamtopsire : '',
      FormPedigreeGdamtopdam: data.pedigree?.gdamtopdam ? data.pedigree.gdamtopdam : '',
      FormPedigreeDam: data.pedigree?.dam ? data.pedigree.dam : '',
      FormPedigreeGsirebtm: data.pedigree?.gsirebtm ? data.pedigree.gsirebtm : '',
      FormPedigreeGsirebtmsire: data.pedigree?.gsirebtmsire ? data.pedigree.gsirebtmsire : '',
      FormPedigreeGsirebtmbtm: data.pedigree?.gsirebtmbtm ? data.pedigree.gsirebtmbtm : '',
      FormPedigreeGdambtm: data.pedigree?.gdambtm ? data.pedigree.gdambtm : '',
      FormPedigreeGdambtmsire: data.pedigree?.gdambtmsire ? data.pedigree.gdambtmsire : '',
      FormPedigreeGdambtmbtm: data.pedigree?.gdambtmbtm ? data.pedigree.gdambtmbtm : ''
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
  // Pedigree getters
  get FormPedigreeSire() { return this.form.get('FormPedigreeSire')?.value }
  get FormPedigreeGsiretop() { return this.form.get('FormPedigreeGsiretop')?.value }
  get FormPedigreeGsiretopsire() { return this.form.get('FormPedigreeGsiretopsire')?.value }
  get FormPedigreeGsiretopdam() { return this.form.get('FormPedigreeGsiretopdam')?.value }
  get FormPedigreeGdamtop() { return this.form.get('FormPedigreeGdamtop')?.value }
  get FormPedigreeGdamtopsire() { return this.form.get('FormPedigreeGdamtopsire')?.value }
  get FormPedigreeGdamtopdam() { return this.form.get('FormPedigreeGdamtopdam')?.value }
  get FormPedigreeDam() { return this.form.get('FormPedigreeDam')?.value }
  get FormPedigreeGsirebtm() { return this.form.get('FormPedigreeGsirebtm')?.value }
  get FormPedigreeGsirebtmsire() { return this.form.get('FormPedigreeGsirebtmsire')?.value }
  get FormPedigreeGsirebtmbtm() { return this.form.get('FormPedigreeGsirebtmbtm')?.value }
  get FormPedigreeGdambtm() { return this.form.get('FormPedigreeGdambtm')?.value }
  get FormPedigreeGdambtmsire() { return this.form.get('FormPedigreeGdambtmsire')?.value }
  get FormPedigreeGdambtmbtm() { return this.form.get('FormPedigreeGdambtmbtm')?.value }

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
      
      // assemble pedigree object from individual fields
      const pedigree: any = {};
      if (this.FormPedigreeSire) pedigree.sire = this.FormPedigreeSire;
      if (this.FormPedigreeGsiretop) pedigree.gsiretop = this.FormPedigreeGsiretop;
      if (this.FormPedigreeGsiretopsire) pedigree.gsiretopsire = this.FormPedigreeGsiretopsire;
      if (this.FormPedigreeGsiretopdam) pedigree.gsiretopdam = this.FormPedigreeGsiretopdam;
      if (this.FormPedigreeGdamtop) pedigree.gdamtop = this.FormPedigreeGdamtop;
      if (this.FormPedigreeGdamtopsire) pedigree.gdamtopsire = this.FormPedigreeGdamtopsire;
      if (this.FormPedigreeGdamtopdam) pedigree.gdamtopdam = this.FormPedigreeGdamtopdam;
      if (this.FormPedigreeDam) pedigree.dam = this.FormPedigreeDam;
      if (this.FormPedigreeGsirebtm) pedigree.gsirebtm = this.FormPedigreeGsirebtm;
      if (this.FormPedigreeGsirebtmsire) pedigree.gsirebtmsire = this.FormPedigreeGsirebtmsire;
      if (this.FormPedigreeGsirebtmbtm) pedigree.gsirebtmbtm = this.FormPedigreeGsirebtmbtm;
      if (this.FormPedigreeGdambtm) pedigree.gdambtm = this.FormPedigreeGdambtm;
      if (this.FormPedigreeGdambtmsire) pedigree.gdambtmsire = this.FormPedigreeGdambtmsire;
      if (this.FormPedigreeGdambtmbtm) pedigree.gdambtmbtm = this.FormPedigreeGdambtmbtm;

      if (Object.keys(pedigree).length) {
        (this.horse as any).pedigree = pedigree;
      }

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
