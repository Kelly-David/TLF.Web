import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Strings } from '../../shared/strings';
import { User } from '../../shared/models/web.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public activeLink!: string;
  public routesToShow!: string[];
  public user$!: Observable<User>;

  constructor(
    private authService: AuthService
  ) {
    this.activeLink = Strings.routeLogout;

		this.routesToShow = new Array<string>(
			Strings.routeLogout			
			);

   }

  ngOnInit(): void {

    this.user$ = this.authService.user as Observable<User>;
  }

  public Logout() {
    return this.authService.SignOut();
  }

}
