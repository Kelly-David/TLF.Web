import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './landing/index/index.component';
import { HorsesComponent } from './horse/horses/horses.component';
import { HorseRouteComponent } from './horse/horse-route/horse-route.component';
import { FarmComponent } from './views/farm/farm.component';
import { PygmyGoatsComponent } from './views/pygmy-goats/pygmy-goats.component';
import { ShowingComponent } from './views/show-horses/showing.component';
import { ShowResultsComponent } from './views/show-results/show-results.component';
import { PastChampionsComponent } from './views/past-champions/past-champions.component';
import { BreedingComponent } from './views/breeding/breeding.component';
import { SalesComponent } from './views/sales/sales.component';
import { ContactViewComponent } from './contact/contact-view/contact-view.component';
import { VisitComponent } from './views/visit/visit.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: IndexComponent },
	{ path: 'our-farm', component: FarmComponent },
	{ path: 'pygmy-goats', component: PygmyGoatsComponent },
	{ path: 'horses', component: HorsesComponent},
	{ path: 'horse/:route', component: HorseRouteComponent, runGuardsAndResolvers: 'always' },  
	{
		path: 'breeding',
		children: [
		  { path: '', pathMatch: 'full', redirectTo: 'the-miniature-horse' },
		  { path: 'the-miniature-horse', component: BreedingComponent },
		  { path: 'our-program', component: BreedingComponent },
		  { path: 'expected-foals', component: BreedingComponent },
		]
	  },
	{ path: 'showing', component: ShowingComponent },
	{ path: 'show-results', component: ShowResultsComponent },
	{ path: 'past-champions', component: PastChampionsComponent },
	{ path: 'sales', component: SalesComponent },
	{ path: 'recent-sales', component: SalesComponent },
	{ path: 'contact', component: ContactViewComponent },
	{ path: 'links', component: ContactViewComponent },
	{ path: 'visit', component: VisitComponent },

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
