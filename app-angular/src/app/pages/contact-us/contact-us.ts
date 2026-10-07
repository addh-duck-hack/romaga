import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Navbar } from 'src/app/shared/components/navbar/navbar';
import { MainFooter } from 'src/app/shared/components/main-footer/main-footer';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-contact-us',
  imports: [RouterLink, Navbar, MainFooter],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export default class ContactUs {
  services = [
    'Carga general y especializada',
    'Izajes con grúa articulada',
    'Materiales y residuos peligrosos',
    'Suministro de agua',
    'Otro'
  ];

  fullName = signal('');
  email = signal('');
  phone = signal('');
  service = signal(this.services[0]);
  message = signal('');

  sending = signal(false);
  descriptionErrors = signal<string[]>([]);
  descriptionSuccess = signal<string>('');

  private mailService = inject(MailService);

  onFormSubmit(event: Event): void {
    event.preventDefault();
    this.submitForm();
  }

  submitForm(): void {
    this.descriptionErrors.set([]);
    this.descriptionSuccess.set('');
    const errors: string[] = [];

    const fullName = this.fullName().trim();
    const email = this.email().trim();
    const message = this.message().trim();

    if (!fullName || fullName.length < 2 || fullName.length > 100) {
      errors.push('El nombre completo debe tener entre 2 y 100 caracteres.');
    }
    if (!email) {
      errors.push('El correo electrónico es requerido.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Ingresa un correo electrónico válido.');
    }
    if (!this.service()) {
      errors.push('Selecciona el servicio de tu interés.');
    }
    if (!message || message.length < 10 || message.length > 2000) {
      errors.push('El mensaje debe tener entre 10 y 2000 caracteres.');
    }
    if (this.phone().length > 30) {
      errors.push('El teléfono es demasiado largo.');
    }

    if (errors.length > 0) {
      this.descriptionErrors.set(errors);
      return;
    }

    this.sending.set(true);
    this.mailService.sendContactEmail({
      fullName,
      email,
      phone: this.phone().trim(),
      service: this.service(),
      message
    }).subscribe({
      next: (response) => {
        this.sending.set(false);
        this.descriptionSuccess.set(response.message || 'Gracias, hemos recibido su solicitud. Nos pondremos en contacto pronto.');
        this.fullName.set('');
        this.email.set('');
        this.phone.set('');
        this.service.set(this.services[0]);
        this.message.set('');
      },
      error: (error: HttpErrorResponse) => {
        this.sending.set(false);
        this.descriptionErrors.set([error.error?.error?.message ?? 'No se pudo enviar la solicitud. Intenta nuevamente.']);
      }
    });
  }
}
