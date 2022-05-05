import { AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {Tenant} from "../../model/tenant";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenantsService} from "../../services/tenants.service";
import * as _ from "lodash";

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {

  tenantData: Tenant;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'city','email','cellphone', 'actions'];

  @ViewChild('tenantForm', {static: false})
  tenantForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private tenantsService: TenantsService) {

    this.tenantData = {} as Tenant;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.getAllTenants();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllTenants() {
    this.tenantsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Tenant) {
    this.tenantData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.tenantForm.resetForm();
  }

  deleteItem(id: number) {
    this.tenantsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Tenant) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addTenant() {
    this.tenantData.id = 0;
    this.tenantsService.create(this.tenantData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateTenant() {
    this.tenantsService.update(this.tenantData.id, this.tenantData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Tenant) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.tenantForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateTenant();
      } else {
        console.log('about to add');
        this.addTenant();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }


}
