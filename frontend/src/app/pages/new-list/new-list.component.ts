import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService:TaskService, private router: Router) { }

  ngOnInit(): void {
  }
  createList(title: string){
    this.taskService.createList(title).subscribe((res:any)=>{
      console.log(res);
      //Now we redirect to /list/:res_id
      this.router.navigate(['/lists', res._id]);
    })
  }
}
