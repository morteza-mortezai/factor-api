import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  normalizePhone(phone: string): string {
    let value = phone.trim().replace(/\D/g, '');

    if (value.startsWith('0098')) {
      value = `0${value.slice(4)}`;
    } else if (value.startsWith('98')) {
      value = `0${value.slice(2)}`;
    } else if (value.startsWith('9')) {
      value = `0${value}`;
    }

    if (!/^09\d{9}$/.test(value)) {
      throw new Error('Invalid Iranian phone number');
    }

    return value;
  }
}
