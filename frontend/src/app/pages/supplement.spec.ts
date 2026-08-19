import {
  ComponentFixture,
  TestBed
} from "@angular/core/testing";

import {
  SupplementPage
} from "./supplement";


describe("SupplementPage", () => {

  let component:
    SupplementPage;

  let fixture:
    ComponentFixture<SupplementPage>;


  beforeEach(async () => {

    await TestBed
      .configureTestingModule({

        imports: [
          SupplementPage
        ]

      })
      .compileComponents();


    fixture =
      TestBed.createComponent(
        SupplementPage
      );

    component =
      fixture.componentInstance;

    await fixture.whenStable();

  });


  it("should create", () => {

    expect(component)
      .toBeTruthy();

  });

});