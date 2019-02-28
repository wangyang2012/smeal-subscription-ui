import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateSubscriptionComponent} from './create-subscription/create-subscription.component';

const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'create-subscription', component: CreateSubscriptionComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
