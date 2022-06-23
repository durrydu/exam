import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../_models/equipment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getEquipments() {
    return this.http.get<Equipment[]>(this.baseUrl + 'equipments');
  }

  getEquipment(equipmentId: string) {
    return this.http.get<Equipment>(this.baseUrl + 'equipments/' + equipmentId);
  }

  postEquipment(equipment: Equipment) {
    return this.http.post(this.baseUrl + 'equipments', equipment);
  }

  putEquipment(equipment: Equipment) {
    return this.http.put(
      this.baseUrl + 'equipments/' + equipment.id,
      equipment
    );
  }

  patchEquipment(equipment: Equipment) {
    return this.http.patch<Equipment>(
      this.baseUrl + 'equipments/' + equipment.id,
      equipment
    );
  }

  deleteEquipment(equipmentId: string) {
    return this.http.delete(this.baseUrl + 'equipments/' + equipmentId);
  }
}
