import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryService } from '../service/category.service'

@Component({
  selector: 'app-user-category-sidebar',
  templateUrl: './user-category-sidebar.component.html',
  styleUrls: ['./user-category-sidebar.component.css']
})
export class UserCategorySidebarComponent implements OnInit {

  loading = false
  subscriber:any;
  selectedCategory:string = "";
  categories:{name:string , image:string} [] = [];
  categoriesName:string[] = [];
  constructor(private categoryService: CategoryService) { }
  selectCategory(event:Event  , category:string): void{
    console.log(category);
    this.selectCategoryEmitter.emit(category);
  }
  ngOnInit(): void {
    this.subscriber = this.categoryService.getCategories()
    .subscribe((response:any)=>{
      this.loading = true
      console.log(response.body)
      this.categories = response.body
      this.categoriesName = this.categories.map((category) => {
        return category.name;
      })
      if(this.categories.length > 0)
      {
        this.setDefaultCategoryEmitter.emit(this.categories[0].name);
      }
    },
    (err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong!",
        footer: ''
      })
    })

  }

@Output() selectCategoryEmitter:EventEmitter<string> = new EventEmitter()
@Output() setDefaultCategoryEmitter:EventEmitter<string> = new EventEmitter()

}
