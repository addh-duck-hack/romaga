export interface RouteCostResponse {
  ok:      boolean;
  message: string;
  inegi:   CostInegi;
}

export interface CostInegi {
  data:     CostInegi;
  meta:     MetaInegi;
  response: ResponseInegi;
}

export interface CostInegi {
  geojson:      string;
  costo_caseta: number;
  tiempo_min:   number;
  advertencia:  string;
  long_km:      number;
  peaje:        string;
  eje_excedente: number;
}

export interface MetaInegi {
  fuente: string;
}

export interface ResponseInegi {
  success: boolean;
  message: string;
}
