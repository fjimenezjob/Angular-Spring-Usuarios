import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { of, Observable , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {
  private urlEndpoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router ) { }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES); 
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndpoint, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {
      console.error(e.error.mensaje);
      swal(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error , 'error');
        return throwError(e);
      })
    )
  }

  update(cliente:  Cliente) : Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
      console.error(e.error.mensaje);
      swal(e.error.mensaje,e.error.error , 'error');
      return throwError(e);
      }));
    }
 
  delete (id : number) : Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
      console.error(e.error.mensaje);
      swal(e.error.mensaje , e.error.error , 'error');
      return throwError(e);
      }));
    }

}