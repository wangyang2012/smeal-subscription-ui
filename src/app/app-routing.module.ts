import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateSubscriptionComponent} from './create-subscription/create-subscription.component';
import {ThanksComponent} from './thanks/thanks.component';

const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'create-subscription', component: CreateSubscriptionComponent},
    { path: 'thanks', component: ThanksComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
