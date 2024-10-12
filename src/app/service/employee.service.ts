import { Injectable, inject } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../model/employee";
import { Firestore, collection, collectionData, addDoc, doc, setDoc, deleteDoc, getDocs, getFirestore, Timestamp} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private firestore: Firestore = inject(Firestore);

  private state$ = new BehaviorSubject<Employee[]>([]);

  public async currentEmployees(){
    this.state$ = new BehaviorSubject<Employee[]>([]);

    const allEmployees = await getDocs(collection(this.firestore, "employees"));

    allEmployees.forEach((doc) => {
        const tmp = new Employee(
          doc.get('name') as string, 
          (doc.get('dateOfBirth') as Timestamp).toDate(),
          doc.get('city') as string, 
          doc.get('salary') as number,
          doc.get('gender') as string, 
          doc.get('email') as string);

          this.state$.value.push(tmp);
    });

    return this.state$.asObservable();
  }


  async addEmployee(employee: Employee) {
    const docRef = await addDoc(collection(this.firestore, "employees"), 
    {
      name: employee.name,
      dateOfBirth: Timestamp.fromDate(employee.dateOfBirth),
      city: employee.city,
      salary: employee.salary,
      gender: employee.gender,
      email: employee.email,
    });
  }
}
