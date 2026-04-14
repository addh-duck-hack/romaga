import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InegiService } from 'src/app/services/inegi.service';
import { UserService } from 'src/app/services/user.service';
import { DestinationInegi } from 'src/app/shared/interfaces/destination.interface';

@Component({
  selector: 'price-dashboard',
  imports: [],
  templateUrl: './price-dashboard.html',
  styleUrl: './price-dashboard.css'
})

export default class PriceDashboard {
  // Variables para el origen
  origen = signal('');
  errorOrigen = signal('');
  origenResponse = signal<DestinationInegi[]>([]);
  origenSeleccionado = signal<DestinationInegi | null>(null);
  botonOrigenTitulo = signal('Buscar');

  destino = signal('');

  //Variables para consmo de servicios
  inegiService = inject(InegiService);
  userService = inject(UserService);
  router = inject(Router)

  validateOrigen(){
    // Primero validamos el tipo de boton Buscar/Cambiar
    if (this.botonOrigenTitulo() == 'Buscar'){
      // Validamos que se escribio un origen
      if (!this.origen()) {
        this.errorOrigen.set('Ingrese el origen a buscar');
        return;
      }else{
        // Validar que el origen tenga al menos 3 caracteres
        if (this.origen() && this.origen().length < 3) {
          this.errorOrigen.set('El origen debe tener al menos 3 caracteres');
          return;
        }else{
          this.errorOrigen.set('');
        }
      }

      // Cuando ya se valido realizamos la busqueda
      if(!this.errorOrigen()){
        this.searchOrigen();
      }
    }else{
      this.origen.set('');
      this.origenSeleccionado.set(null);
      this.botonOrigenTitulo.set('Buscar')
    }
  }

  searchOrigen(): void{
    const sessionToken = this.getSessionToken();
    this.inegiService.getDestination(this.origen(), sessionToken).subscribe({
      next: (response) => {
        if(response.length > 0){
          this.origenResponse.set(response)
        }else{
          this.errorOrigen.set('No se encontraron lugares para esta busqueda')
        }
      },
      error: (error: HttpErrorResponse) => {
         // Mostrar el mensaje de error del servidor
        this.errorOrigen.set(error.error.error.message);
      }
    })
  }

  selectOrigen(origen: DestinationInegi){
    this.origenSeleccionado.set(origen)
    this.origen.set(origen.nombre)
    this.botonOrigenTitulo.set('Cambiar')
    this.origenResponse.set([])
  }

  searchDestino(){
    console.log("Se va a buscar origen: " + this.destino());
  }

  getSessionToken():string {
    // Validamos que el token esta vigente para poder hacer la consulta
    if(this.userService.isTokenValid()){
      return this.userService.sessionUser()?.token || ""
    }else{
      // Si el token ya expiro, cerramos la sesion y mandamos a pagina principal
      this.userService.clearSession();
      this.router.navigate(['/']);
      return ""
    }
  }
}
