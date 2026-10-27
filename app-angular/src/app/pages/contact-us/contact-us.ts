import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from 'src/app/shared/components/navbar/navbar';
import { MainFooter } from 'src/app/shared/components/main-footer/main-footer';

type ContactChannel = 'whatsapp' | 'email';

const WHATSAPP_NUMBER = '5217821035684';
const CONTACT_EMAIL = 'transportes@romaga.com.mx';

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

  descriptionErrors = signal<string[]>([]);
  descriptionSuccess = signal<string>('');

  onFormSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const submitter = event.submitter as HTMLButtonElement | null;
    this.submitForm(submitter?.value === 'email' ? 'email' : 'whatsapp');
  }

  submitForm(channel: ContactChannel): void {
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

    const phone = this.phone().trim();
    const body = [
      `Nombre: ${fullName}`,
      `Correo: ${email}`,
      ...(phone ? [`Teléfono: ${phone}`] : []),
      `Servicio de interés: ${this.service()}`,
      '',
      message
    ].join('\n');

    const url = channel === 'whatsapp'
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, me gustaría solicitar una cotización.\n\n${body}`)}`
      : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Solicitud de cotización - ${fullName}`)}&body=${encodeURIComponent(body)}`;

    if (channel === 'whatsapp') {
      window.open(url, '_blank', 'noopener');
    } else {
      window.location.href = url;
    }

    this.descriptionSuccess.set(channel === 'whatsapp'
      ? 'Abrimos WhatsApp con su solicitud. Solo confirme el envío del mensaje.'
      : 'Abrimos su aplicación de correo con su solicitud. Solo confirme el envío del mensaje.');
  }
}
