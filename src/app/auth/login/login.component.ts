import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/models/web.models';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public title!: string;
	public activeLink!: string;
	public routesToShow!: Array<string>;
  public form!: FormGroup;
  public user!: User
  public errorMessage!: string;
  public formSubmitted = false as boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.title = 'Login';

    this.authService.user.pipe(take(1)).subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard/']);
      }
    });

    this.authService.authError.subscribe(message => this.errorMessage = message);

    this.form = this.formBuilder.group(
      {
        'FormEmail' : [ '', [Validators.email, Validators.required]],
        'FormPassword' : [ '', [Validators.required]]
      }
    );
  }

  get FormEmail() { return this.form.get('FormEmail')?.value };
  get FormPassword() { return this.form.get('FormPassword')?.value };

  public Login() {

    if (!this.formSubmitted) {

      this.formSubmitted = true;

      return this.authService.LoginWithEmailAndPassword(this.FormEmail, this.FormPassword)
      .then( _ => {
        this.formSubmitted = false;
      });
    }

    return;
  }

}
