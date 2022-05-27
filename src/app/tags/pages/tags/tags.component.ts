import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {Tag} from "../../model/tag";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TagsService} from "../../services/tags.service";
import * as _ from "lodash";
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, AfterViewInit {

  tagData: Tag;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name'];

  @ViewChild('tagForm', {static: false})
  tagForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private tagsService: TagsService) {
    this.tagData = {} as Tag;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllTags();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllTags() {
    this.tagsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Tag) {
    this.tagData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.tagForm.resetForm();
  }

  deleteItem(id: number) {
    this.tagsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Tag) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addTag() {
    this.tagData.id = 0;
    this.tagsService.create(this.tagData).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateTag() {
    this.tagsService.update(this.tagData.id, this.tagData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Tag) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.tagForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateTag();
      } else {
        console.log('about to add');
        this.addTag();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }

}
