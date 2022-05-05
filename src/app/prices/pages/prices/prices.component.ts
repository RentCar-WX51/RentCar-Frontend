import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {Price} from "../../model/price";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PricesService} from "../../services/prices.service";
import * as _ from "lodash";
@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit, AfterViewInit {

  priceData: Price;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'title', 'description', 'value', 'currency', 'feeType', 'validity', 'actions'];

  @ViewChild('priceForm', {static: false})
  priceForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private pricesService: PricesService) {
    this.priceData = {} as Price;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllPrices();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllPrices() {
    this.pricesService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Price) {
    this.priceData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.priceForm.resetForm();
  }

  deleteItem(id: number) {
    this.pricesService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Price) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addPrice() {
    this.priceData.id = 0;
    this.pricesService.create(this.priceData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updatePrice() {
    this.pricesService.update(this.priceData.id, this.priceData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Price) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.priceForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updatePrice();
      } else {
        console.log('about to add');
        this.addPrice();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
