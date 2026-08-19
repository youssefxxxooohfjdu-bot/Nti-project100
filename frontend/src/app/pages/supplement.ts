import {
  Component,
  inject,
  OnInit,
  signal
} from "@angular/core";

import {
  FormsModule
} from "@angular/forms";

import {
  RouterLink
} from "@angular/router";

import {
  SupplementService
} from "../core/supplement";

import type {
  Supplement,
  CreateSupplementInput
} from "../models/Supplement";


@Component({
  selector: "app-supplement",

  imports: [
    FormsModule,
    RouterLink
  ],

  templateUrl: "./supplements.html",

  styleUrl: "./supplements.css"
})
export class SupplementPage
  implements OnInit {


  private readonly supplementService =
    inject(SupplementService);


  supplements =
    signal<Supplement[]>([]);


  loading =
    signal(false);


  message =
    signal("");


  editingSupplementId =
    signal<string | null>(null);


  form: CreateSupplementInput = {

    name: "",

    description: "",

    category: "Protein",

    price: 0,

    stock: 0,

    flavor: "",

    active: true

  };


  ngOnInit(): void {

    this.loadSupplements();

  }


  loadSupplements(): void {

    this.loading.set(true);

    this.message.set("");


    this.supplementService
      .getSupplements()
      .subscribe({

        next: (response) => {

          this.supplements.set(
            response.data ?? []
          );

          this.loading.set(false);

        },


        error: (error) => {

          console.error(
            "Error loading supplements:",
            error
          );

          this.message.set(
            "Could not load supplements. Please check the API server."
          );

          this.loading.set(false);

        }

      });

  }


  resetForm(): void {

    this.form = {

      name: "",

      description: "",

      category: "Protein",

      price: 0,

      stock: 0,

      flavor: "",

      active: true

    };

  }


  saveSupplement(): void {

    this.message.set("");


    const editingId =
      this.editingSupplementId();


    if (editingId) {

      this.supplementService
        .updateSupplement(
          editingId,
          this.form
        )
        .subscribe({

          next: () => {

            this.message.set(
              "Supplement updated successfully."
            );

            this.cancelEdit();

            this.loadSupplements();

          },


          error: (error) => {

            console.error(
              "Error updating supplement:",
              error
            );

            this.message.set(
              "Could not update supplement."
            );

          }

        });

      return;

    }


    this.supplementService
      .createSupplement(
        this.form
      )
      .subscribe({

        next: () => {

          this.message.set(
            "Supplement added successfully."
          );

          this.resetForm();

          this.loadSupplements();

        },


        error: (error) => {

          console.error(
            "Error creating supplement:",
            error
          );

          this.message.set(
            "Could not add supplement."
          );

        }

      });

  }


  deleteSupplement(
    id: string
  ): void {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this supplement?"
      );


    if (!confirmed) {

      return;

    }


    this.supplementService
      .deleteSupplement(id)
      .subscribe({

        next: () => {

          this.message.set(
            "Supplement deleted successfully."
          );

          this.loadSupplements();

        },


        error: (error) => {

          console.error(
            "Error deleting supplement:",
            error
          );

          this.message.set(
            "Could not delete supplement."
          );

        }

      });

  }


  startEdit(
    supplement: Supplement
  ): void {

    this.editingSupplementId.set(
      supplement._id
    );


    this.form = {

      name: supplement.name,

      description:
        supplement.description,

      category:
        supplement.category,

      price:
        supplement.price,

      stock:
        supplement.stock,

      flavor:
        supplement.flavor,

      active:
        supplement.active

    };

  }


  cancelEdit(): void {

    this.editingSupplementId.set(
      null
    );

    this.resetForm();

  }


  getStockStatus(
    stock: number
  ): string {

    if (stock === 0) {

      return "Out of Stock";

    }


    if (stock <= 5) {

      return "Low Stock";

    }


    return "In Stock";

  }

}