import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { Employee } from '../model/employee';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit, OnDestroy {
  
  employees: Employee[] = [];
  subscription: Subscription = new Subscription;


  constructor(private employeeService: EmployeeService){}


  async ngOnInit(): Promise<void> {
    this.subscription = (await this.employeeService.currentEmployees()).subscribe((X: Employee[]) => this.employees = X);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
