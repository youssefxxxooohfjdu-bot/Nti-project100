import {
  Component,
  inject,
  OnInit,
  signal
} from "@angular/core";

import {
  ActivatedRoute,
  Router
} from "@angular/router";

import {
  SupplementService
} from "../core/supplement";

import type {
  Supplement
} from "../models/Supplement";


@Component({
  selector: "app-supplement-details",

  imports: [],

  templateUrl: "./supplement-details.html",

  styleUrl: "./supplement-details.css"
})
export class SupplementDetails
  implements OnInit {

  private readonly supplementService =
    inject(SupplementService);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);


  supplement =
    signal<Supplement | null>(null);


  loading =
    signal(false);


  errorMessage =
    signal("");


  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get("id");

    if (!id) {

      this.errorMessage.set(
        "Supplement ID was not found."
      );

      return;
    }

    this.loadSupplement(id);
  }


  loadSupplement(id: string): void {

    this.loading.set(true);

    this.errorMessage.set("");

    this.supplementService
      .getSupplementById(id)
      .subscribe({

        next: (response) => {

          this.supplement.set(
            response.data
          );

          this.loading.set(false);
        },

        error: () => {

          this.errorMessage.set(
            "Could not load supplement."
          );

          this.loading.set(false);
        }

      });
  }


  goBack(): void {

    this.router.navigate([
      "/supplements"
    ]);
  }


  addToCart(): void {

    const currentSupplement =
      this.supplement();

    if (!currentSupplement) {
      return;
    }

    if (currentSupplement.stock <= 0) {
      return;
    }

    alert(
      `${currentSupplement.name} added to cart!`
    );
  }

}