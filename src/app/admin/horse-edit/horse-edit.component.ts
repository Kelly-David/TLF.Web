import { Component, Input, OnChanges } from '@angular/core';
import { HorseService } from '../../shared/services/horse.service';
import { Observable } from 'rxjs';
import { Horse } from 'src/app/shared/models/horse.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-horse-edit',
  templateUrl: './horse-edit.component.html',
  styleUrls: ['./horse-edit.component.scss']
})
export class HorseEditComponent implements OnChanges {

  @Input() id: string | undefined;
  public horse$: Observable<Horse> | undefined;
  public form: FormGroup;

  constructor(
    private horseService: HorseService,
    private formBuilder: FormBuilder) {

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
      'FormBreeder': ['', [Validators.required]]
    })
  }

  ngOnChanges(): void {

    if (this.id != undefined) {

      this.horse$ = this.horseService.V1GetHorseById(this.id);

      this.horseService.V1GetHorseById(this.id).pipe(take(1)).pipe(filter(data => !!data)).subscribe(data => this.PatchForm(data));
    }
  }

  public SaveForm() {

  }

  private PatchForm(data: any) {

    this.form.patchValue({
      FormId: data.id ? data.id: '',
      FormName: data.name ? data.name : '',
      FormSire: data.sire ? data.sire : '',
      FormDam: data.dam ? data.dam : '',
      FormColor: data.color ? data.color : '',
      FormYear: data.year ? data.year : '',
      FormGender: data.gender ? data.gender : '',
      FormHeight: data.height ? data.height : '',
      FormProfile: data.profile ? data.profile : '',
      FormOwner: data.owner ? data.owner : '',
      FormBreeder: data.breeder ? data.breeder : ''
    });

  }

}
