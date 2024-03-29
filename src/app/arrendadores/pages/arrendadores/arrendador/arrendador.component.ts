import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as _ from "lodash";
import {Arrendador} from "../../../model/arrendador";
import {ArrendadorService} from "../../../service/arrendador.service";

@Component({
  selector: 'app-arrendador',
  templateUrl: './arrendador.component.html',
  styleUrls: ['./arrendador.component.css']
})
export class ArrendadorComponent implements OnInit {

  arrendadorData: Arrendador;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'age', 'email', 'actions'];

  @ViewChild('arrendadorForm', {static: false})
  arrendadorForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private arrendadorService: ArrendadorService) {
    this.arrendadorData = {} as Arrendador;
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
    this.arrendadorService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Arrendador) {
    this.arrendadorData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.arrendadorForm.resetForm();
  }

  deleteItem(id: number) {
    this.arrendadorService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Arrendador) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addPrecio() {
    this.arrendadorData.id = 0;
    this.arrendadorService.create(this.arrendadorData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updatePrecio() {
    this.arrendadorService.update(this.arrendadorData.id, this.arrendadorData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Arrendador) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.arrendadorForm.form.valid) {
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
