import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './landing/index/index.component';
import { HorsesComponent } from './horse/horses/horses.component';
import { HorseRouteComponent } from './horse/horse-route/horse-route.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: IndexComponent },
	{ path: 'horses', component: HorsesComponent},
	{ path: 'horse/:route', component: HorseRouteComponent, runGuardsAndResolvers: 'always' },

	// Redirects from old TLF Website
	{ path: 'pygmy-goats.html', pathMatch: 'full', redirectTo: 'pygmy-goats' },
	{ path: 'pygmy-goats/herd-sires.html', pathMatch: 'full', redirectTo: 'pygmy-goats' },
	{ path: 'pygmy-goats/does-kids.html', pathMatch: 'full', redirectTo: 'pygmy-goats' },
	{ path: 'about-us.html', pathMatch: 'full', redirectTo: 'our-farm' },
	{ path: 'sale-horses.html', pathMatch: 'full', redirectTo: 'sales' },
	{ path: 'social.html.html', pathMatch: 'full', redirectTo: 'showing' },
	{ path: 'show-horses.html', pathMatch: 'full', redirectTo: 'showing' },
	{ path: 'champions.html', pathMatch: 'full', redirectTo: 'past-champions' },
	{ path: 'gallery.html', pathMatch: 'full', redirectTo: 'our-farm' },
	{ path: 'contact.php', pathMatch: 'full', redirectTo: 'contact' },
	{ path: 'horses.html', pathMatch: 'full', redirectTo: 'horses' },
	{ path: 'stallions-colts.html', pathMatch: 'full', redirectTo: 'horses' },
	{ path: 'mares-fillies.html', pathMatch: 'full', redirectTo: 'horses' },
	{ path: 'foals.html', pathMatch: 'full', redirectTo: 'horses' },
	{ path: '**', redirectTo: 'home' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
