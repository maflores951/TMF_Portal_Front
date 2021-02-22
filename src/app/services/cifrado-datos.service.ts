import { Injectable } from '@angular/core';
 import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CifradoDatosService {

  public tarjetaText: string;
  public tarjetaEncText: string;
  public encTarjeta: string;
  public decTarjeta: string;
  public key = CryptoJS.enc.Utf8.parse('RfUjXn2r5u8x/A?D'); 
  public iv = CryptoJS.enc.Utf8.parse('RfUjXn2r5u8x/A?D');

  constructor() { }

  desEncrypt(conversion: string): string {

    var encTarjeta = CryptoJS.AES.decrypt(conversion, this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
    // console.log(encTarjeta + ' ******* desCifrado');
    return encTarjeta;

  }

  encrypt(conversion: string): string {
    //console.log(conversion + ' ******* 1');
    //console.log(conversion + ' encrypt*******');
    //var encTarjeta = CryptoJS.AES.encrypt(conversion.trim(), this.llave.trim()).toString();
    //console.log(encTarjeta + ' ******* 2');

     var encTarjeta = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(conversion), this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
       }).toString();  
    //console.log(encTarjeta + ' ******* Cifrado');
    return encTarjeta;
  }
}