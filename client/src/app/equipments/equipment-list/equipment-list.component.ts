import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Equipment } from 'src/app/_models/equipment';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { EquipmentService } from 'src/app/_services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css'],
})
export class EquipmentListComponent implements OnInit {
  public displayedColumns = ['id', 'model', 'manufactureDate', 'action'];
  equipments: Equipment[] = [];

  equipment: Equipment;

  public dataSource = new MatTableDataSource<Equipment>();
  clickedRows = new Set<Equipment>();
  constructor(
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private router: Router,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  loadEquipments() {
    this.equipmentService.getEquipments().subscribe(
      (response) => {
        //this.equipments = reponse;
        this.dataSource.data = response;
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    );
  }

  selectRow(row: Equipment) {
    this.clickedRows.clear();
    this.clickedRows.add(row);
    this.equipment = row;
  }

  edit() {
    if (this.equipment && this.clickedRows.has(this.equipment)) {
      this.router.navigateByUrl(/equipments/ + this.equipment.id);
    } else {
      this.toastr.error('Please select one row data');
    }
  }

  delete() {
    if (this.equipment) {
      this.confirmService
        .confirm('Confirmation', 'Do you want to delete this row?')
        .subscribe((yes) => {
          if (yes) {
            this.equipmentService.deleteEquipment(this.equipment.id).subscribe(
              (rep) => {
                this.toastr.success('Deleted successfully!');
                this.loadEquipments();
                this.clickedRows.clear();
              },
              (error) => {
                this.toastr.error(error);
              }
            );
          }
        });
    } else {
      this.toastr.error('Please select one row data');
    }
  }

  create() {
    this.router.navigateByUrl('/equipments/create');
  }
}
