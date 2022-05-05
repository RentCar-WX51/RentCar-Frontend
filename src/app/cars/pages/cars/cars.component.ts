import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {Car} from "../../model/car";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CarsService} from "../../services/cars.service";
import * as _ from "lodash";
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, AfterViewInit {

  carData: Car;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name'];

  @ViewChild('carForm', {static: false})
  carForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private carsService: CarsService) {
    this.carData = {} as Car;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllCars();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllCars() {
    this.carsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Car) {
    this.carData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.carForm.resetForm();
  }

  deleteItem(id: number) {
    this.carsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Car) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addCar() {
    this.carData.id = 0;
    this.carsService.create(this.carData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateCar() {
    this.carsService.update(this.carData.id, this.carData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Car) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.carForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateCar();
      } else {
        console.log('about to add');
        this.addCar();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }

}
