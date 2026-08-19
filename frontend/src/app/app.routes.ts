import {
  Routes
} from "@angular/router";

import {
  SupplementPage
} from "./pages/supplement";

import {
  SupplementDetails
} from "./pages/supplement-details";


export const routes: Routes = [

  {
    path: "",
    redirectTo: "supplements",
    pathMatch: "full"
  },


  {
    path: "supplements",
    component: SupplementPage
  },


  {
    path: "products",
    component: SupplementPage
  },


  {
    path: "supplements/:id",
    component: SupplementDetails
  },


  {
    path: "**",
    redirectTo: "supplements"
  }

];