import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ThreeDStuffComponent} from "./components/three-dstuff/three-dstuff.component";
import {SplineStuffComponent} from "./components/spline-stuff/spline-stuff.component";
import {WebpageComponent} from "./components/webpage/webpage.component";
import {BackgroundComponent} from "./components/background/background.component";


const routes: Routes = [
  {path: '', component: BackgroundComponent},
  {path: 'splineStuff', component: SplineStuffComponent},
  {path: 'webpage', component: WebpageComponent},
  {path:'background', component: BackgroundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
