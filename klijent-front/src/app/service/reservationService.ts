import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../model/Reservation';

@Injectable({
    providedIn : 'root',
})
export class ReservationService{

    constructor(private http : HttpClient) {}

    getReservations(){
        return this.http.get<Reservation[]>("api/res/getReservations");
    }
}