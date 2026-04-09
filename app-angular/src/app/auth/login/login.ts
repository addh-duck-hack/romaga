import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@environments/environment';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export default class Login {
  // Generales
  typeForm = signal('login');
  buttonText = signal('Iniciar sesión');
  title = signal('¡Hola!');
  subtitle = signal('Bienvenido de vuelta');
  env = environment;
  // Variables para formulario
  name = signal('');
  email = signal('');
  password = signal('');
  password2 = signal('');
  customerKey = signal('');
  // Variable para manejar errores
  descriptionErrors = signal<string[]>([])

  // Consumo de servicios
  userService = inject(UserService)
  userSession = signal<User>;

  changeForm(type: string) {
    this.typeForm.set(type);
    this.descriptionErrors.set([]);
    switch (type) {
      case 'login':
        this.title.set('¡Hola!');
        this.subtitle.set('Bienvenido de vuelta');
        this.buttonText.set('Iniciar sesión');
        break;
      case 'register':
        this.title.set('¡Crea tu cuenta!');
        this.subtitle.set('Ingresa tus datos para registrarte');
        this.buttonText.set('Registrarse');
        break;
      case 'forgot':
        this.title.set('¿Olvidaste tu contraseña?');
        this.subtitle.set('Ingresa tu correo para recuperar tu contraseña');
        this.buttonText.set('Recuperar contraseña');
        break;
      default:
        break;
    }
  }

  submitForm() {
    switch(this.typeForm()){
      case 'login':
        this.loginUser();
        break;
      case 'register':
        this.registerUser();
        break;
      case 'forgot':
        this.restartPassword();
        break;
      default:
        break;
    }
  }

  registerUser(){
    // Limpiar errores previos
    this.descriptionErrors.set([]);
    const errors: string[] = [];

    // Validar que todos los campos estén llenos
    if (!this.name()) {
      errors.push('El nombre es requerido');
    }
    if (!this.email()) {
      errors.push('El email es requerido');
    }
    if (!this.password()) {
      errors.push('La contraseña es requerida');
    }
    if (!this.customerKey()) {
      errors.push('La clave de cliente es requerida');
    }

    // Validar que el name tenga al menos 5 caracteres
    if (this.name() && this.name().length < 5) {
      errors.push('El nombre debe tener al menos 5 caracteres');
    }

    // Validar que el email tenga un formato válido
    if (this.email()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email())) {
        errors.push('Por favor ingresa un email válido');
      }
    }

    // Validar que la password tenga al menos 5 caracteres
    if (this.password() && this.password().length < 5) {
      errors.push('La contraseña debe tener al menos 5 caracteres');
    }

    //Validar que las contraseñas coincidan
    if(this.password() != this.password2()){
      errors.push('Las contraseñas no coinciden');
    }

    // Validar que customerKey tenga exactamente 15 caracteres
    if (this.customerKey() && this.customerKey().length !== 15) {
      errors.push('La clave de cliente debe tener exactamente 15 caracteres, si no cuentas con ella comunicate con tu administrador para que te la proporcione');
    }

    // Si hay errores, almacenarlos y retornar
    if (errors.length > 0) {
      this.descriptionErrors.set(errors);
      return;
    }

    // Si todas las validaciones pasaron, continuar con el registro
    console.log('Formulario válido, proceder con el registro');

    // Cunsumir el servicio para registrar usuario

  }

  loginUser(): void {
    // Limpiar errores previos
    this.descriptionErrors.set([]);
    const errors: string[] = [];

    // Validar que todos los campos estén llenos
    if (!this.email()) {
      errors.push('El email es requerido');
    }
    if (!this.password()) {
      errors.push('La contraseña es requerida');
    }

    // Validar que el email tenga un formato válido
    if (this.email()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email())) {
        errors.push('Por favor ingresa un email válido');
      }
    }

    // Si hay errores, almacenarlos y retornar
    if (errors.length > 0) {
      this.descriptionErrors.set(errors);
      return;
    }

    // Si todas las validaciones pasaron, continuar con el login
    console.log('Formulario válido, proceder con el login');

    // Cunsumir el servicio para registrar usuario
    this.userService.loginNewSession(this.email(), this.password()).subscribe((response) => {
      console.log(response)
    });
  }

  restartPassword(){
    // Limpiar errores previos
    this.descriptionErrors.set([]);
    const errors: string[] = [];

    // Validar que todos los campos estén llenos
    if (!this.email()) {
      errors.push('El email es requerido');
    }
    if (!this.customerKey()) {
      errors.push('La clave de cliente es requerida');
    }

    // Validar que el email tenga un formato válido
    if (this.email()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email())) {
        errors.push('Por favor ingresa un email válido');
      }
    }

    // Validar que customerKey tenga exactamente 15 caracteres
    if (this.customerKey() && this.customerKey().length !== 15) {
      errors.push('La clave de cliente debe tener exactamente 15 caracteres, si no cuentas con ella comunicate con tu administrador para que te la proporcione');
    }

    // Si hay errores, almacenarlos y retornar
    if (errors.length > 0) {
      this.descriptionErrors.set(errors);
      return;
    }

    // Si todas las validaciones pasaron, continuar con el login
    console.log('Formulario válido, proceder con el login');
  }
}
