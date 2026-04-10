import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { map } from 'rxjs';

@Component({
  selector: 'app-validate-email',
  imports: [],
  templateUrl: './validate-email.html',
  styleUrl: './validate-email.css'
})
export default class ValidateEmail {
  env = environment
  token = toSignal(
    inject(ActivatedRoute).queryParams.pipe(
      map((params) => params['token'])
    )
  );

  validateEmail(){
    console.log('Se va a validar el token: ' + this.token());
  }
}
