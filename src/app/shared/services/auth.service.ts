import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';
import { User, UserRoles } from '../models/web.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  public authError: Observable<string>;
  private authErrorSource = new BehaviorSubject('');

  constructor(
    public firestoreService: FirestoreService,
    private router: Router
  ) {

    this.authError = this.authErrorSource.asObservable();
    this.user = this.firestoreService.GetAuthState();
   }

  public LoginWithEmailAndPassword(email: string, password: string) {
    return this.firestoreService.LoginWithEmailAndPassword(email, password)
      .then(_ => this.router.navigate(['/dashboard/']))
      .catch(error => {
        this.authErrorSource.next(error.message);
      });
  }

  public SignOut() {
    return this.firestoreService.SignOut()
    .then(_ => this.router.navigate(['/login/']))
    .catch(error => {
      this.authErrorSource.next(error.message);
    })
  }

  private CheckUserAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }

    for (const role of allowedRoles) {

        if (user.Roles[role as keyof UserRoles]) {

          return true;
        }
    }
    return false;
  }

  public CanRead(user: User): boolean {
    const allowed = ['Reader'];
    return this.CheckUserAuthorization(user, allowed);
  }

  public CanEdit(user: User): boolean {
    const allowed = ['Admin', 'Editor'];
    return this.CheckUserAuthorization(user, allowed);
  }

  public CanDelete(user: User): boolean {
    const allowed = ['Admin'];
    return this.CheckUserAuthorization(user, allowed);
  }
  
}
