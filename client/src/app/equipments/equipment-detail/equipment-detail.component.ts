import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EquipmentService } from 'src/app/_services/equipment.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css'],
})
export class EquipmentDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  isEdit: Boolean = false;
  equipment: any;

  constructor(
    private equipmentService: EquipmentService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private routerTo: Router
  ) {}

  ngOnInit(): void {
    this.loadEquipment();
  }

  loadEquipment() {
    var id = this.route.snapshot.paramMap.get('id') as string;
    if (id === 'create') {
      this.equipment = {
        id: '',
        model: '',
        brand: '',
        weight: '',
        manufactureDate: new Date().toISOString().slice(0, 10),
      };
      // this.editForm.reset();
    } else {
      this.isEdit = true;
      this.equipmentService.getEquipment(id).subscribe((equipment) => {
        this.equipment = equipment;
      });
    }
  }

  updateOrAddEquipment(form: NgForm) {
    if (this.isEdit) {
      this.equipmentService.putEquipment(this.equipment).subscribe(
        (rep) => {
          this.equipment = rep;
          this.toastr.success('updated successfully');
          this.editForm.reset(this.equipment);
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    } else {
      this.equipmentService.postEquipment(this.equipment).subscribe(
        (rep) => {
          this.equipment = rep;
          this.toastr.success('insert into successfully');
          this.editForm.reset(this.equipment);
          this.routerTo
            .navigateByUrl('/equipments/' + this.equipment.id)
            .then(() => {
              window.location.reload();
            });
        },
        (error) => {
          this.toastr.error(error);
        }
      );
    }
  }

  cancel() {
    this.routerTo.navigateByUrl('/equipments');
  }
}
