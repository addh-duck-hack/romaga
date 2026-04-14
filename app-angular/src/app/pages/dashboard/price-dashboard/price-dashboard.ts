import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InegiService } from 'src/app/services/inegi.service';
import { UserService } from 'src/app/services/user.service';
import { DestinationInegi } from 'src/app/shared/interfaces/destination.interface';
import * as L from 'leaflet';
import { GeoJsonObject } from 'geojson';

@Component({
  selector: 'price-dashboard',
  imports: [],
  templateUrl: './price-dashboard.html',
  styleUrl: './price-dashboard.css'
})

export default class PriceDashboard implements AfterViewInit{
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

  // Variables para Leaflet para los mapas
  private map!: L.Map;
  ngAfterViewInit(): void {
    this.initMap();
  }
  private initMap(): void{
    this.map = L.map('main-chart').setView([19.432629, -99.133203], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);
  }

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
      this.botonOrigenTitulo.set('Buscar');
      this.cleanMap();
    }
  }

  searchOrigen(): void{
    const sessionToken = this.getSessionToken();
    this.inegiService.getDestination(this.origen(), sessionToken).subscribe({
      next: (response) => {
        if(response.length > 0){
          this.origenResponse.set(response)
          // Limpiamos el mapa antes de agregar nuevos puntos
          this.cleanMap();
          // Mostramos los puntos en el mapa
          for (let index = 0; index < response.length; index++) {
            const destination = response[index];
            this.setPointInMap(destination.geojson, false, (index + 1).toString())
          }
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

  selectOrigen(origen: DestinationInegi) {
    this.origenSeleccionado.set(origen);
    this.origen.set(origen.nombre);
    this.botonOrigenTitulo.set('Cambiar');
    this.origenResponse.set([]);

    // Limpiamos el mapa y agregamos solo el punto seleccionado
    this.cleanMap();
    this.setPointInMap(origen.geojson, true, origen.nombre + ' / ' + origen.ent_abr);
  }

  private cleanMap(){
    this.map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        this.map.removeLayer(layer);
      }
    });
    this.map.setView([19.432629, -99.133203], 7);
  }

  private setPointInMap(geojsonData: string | GeoJsonObject, setView: boolean, label?: string) {
    let parsedGeojson: GeoJsonObject;

    try {
      parsedGeojson = typeof geojsonData === 'string' ? JSON.parse(geojsonData) : geojsonData;
    } catch (error) {
      console.error('GeoJSON inválido:', error, geojsonData);
      return;
    }

    if ('crs' in parsedGeojson) {
      const geojsonWithoutCrs = { ...parsedGeojson } as any;
      delete geojsonWithoutCrs.crs;
      parsedGeojson = geojsonWithoutCrs;
    }

    const layer = L.geoJSON(parsedGeojson as any, {
      onEachFeature: (feature, layer) => {
        if (label) {
          layer.bindTooltip(label, { permanent: true, direction: 'top' });
        }
      }
    }).addTo(this.map);

    if (setView){
      const point = (parsedGeojson as any).type === 'Point'
        ? (parsedGeojson as any).coordinates
        : (parsedGeojson as any).geometry?.type === 'Point'
          ? (parsedGeojson as any).geometry.coordinates
          : null;

      if (point && Array.isArray(point) && point.length >= 2) {
        this.map.setView([point[1], point[0]], 12);
      }

      if (layer.getBounds) {
        this.map.fitBounds(layer.getBounds(), { maxZoom: 16 });
      }
    }
  }

  searchDestino() {
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
