import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentDetailComponent } from '../equipments/equipment-detail/equipment-detail.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedchangesGuardGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService) {}
  canDeactivate(
    component: EquipmentDetailComponent
  ): Observable<boolean> | boolean {
    if (component.editForm.dirty) {
      return this.confirmService.confirm(
        'Confirmation',
        'Are you sure you want to leave unsaved changes?'
      );
    }
    return true;
  }
}
