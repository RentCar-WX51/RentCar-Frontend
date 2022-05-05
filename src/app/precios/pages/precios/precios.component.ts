import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {Precio} from "../../model/precio";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PreciosService} from "../../services/precios.service";
import * as _ from "lodash";
@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit, AfterViewInit {

  precioData: Precio;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'valor', 'moneda', 'tipoTarifa', 'vigencia', 'actions'];

  @ViewChild('precioForm', {static: false})
  precioForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private preciosService: PreciosService) {
    this.precioData = {} as Precio;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllPrecios();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllPrecios() {
    this.preciosService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Precio) {
    this.precioData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.precioForm.resetForm();
  }

  deleteItem(id: number) {
    this.preciosService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Precio) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addPrecio() {
    this.precioData.id = 0;
    this.preciosService.create(this.precioData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updatePrecio() {
    this.preciosService.update(this.precioData.id, this.precioData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Precio) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.precioForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updatePrecio();
      } else {
        console.log('about to add');
        this.addPrecio();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
