import {
  Injectable,
  inject
} from "@angular/core";

import {
  HttpClient
} from "@angular/common/http";

import {
  Observable
} from "rxjs";

import {
  API_BASE_URL
} from "./api.config";

import type {
  Supplement,
  CreateSupplementInput,
  UpdateSupplementInput
} from "../models/Supplement";


export interface SupplementResponse {
  success: boolean;
  data: Supplement;
  message?: string;
}


export interface SupplementsResponse {
  success: boolean;

  data?: Supplement[];

  count?: number;

  message?: string;
}


@Injectable({
  providedIn: "root"
})
export class SupplementService {

  private http =
    inject(HttpClient);


  private apiUrl =
    `${API_BASE_URL}/supplements`;


  getSupplements():
    Observable<SupplementsResponse> {

    return this.http.get<SupplementsResponse>(
      this.apiUrl
    );

  }


  getSupplementById(
    id: string
  ):
    Observable<SupplementResponse> {

    return this.http.get<SupplementResponse>(
      `${this.apiUrl}/${id}`
    );

  }


  createSupplement(
    supplement: CreateSupplementInput
  ):
    Observable<SupplementResponse> {

    return this.http.post<SupplementResponse>(
      this.apiUrl,
      supplement
    );

  }


  updateSupplement(
    id: string,
    supplement: UpdateSupplementInput
  ):
    Observable<SupplementResponse> {

    return this.http.patch<SupplementResponse>(
      `${this.apiUrl}/${id}`,
      supplement
    );

  }


  deleteSupplement(
    id: string
  ):
    Observable<{
      success: boolean;
      message?: string;
    }> {

    return this.http.delete<{
      success: boolean;
      message?: string;
    }>(
      `${this.apiUrl}/${id}`
    );

  }

}