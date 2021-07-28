import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  mensajes : any;

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit(){
    this.mensajes=this.dataService.getPosts()
  }

  listen(id:any){
    console.log("El id es: ", id)
  }
}
