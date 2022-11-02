import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CifradoDatosService {
  public tarjetaText: string;
  public tarjetaEncText: string;
  public encTarjeta: string;
  public decTarjeta: string;

  public key = CryptoJS.enc.Utf8.parse('TmF Cifrado DAtOs SensiBLes'); //Clave para cifrar el contenido
  public salt = CryptoJS.enc.Base64.parse('dG1GR3JvdVBMZWd2SVQ='); // Tenxto en base 64

  constructor() {}

  desEncrypt(conversion: string): string {
    let keyAndIv = CryptoJS.PBKDF2(this.key, this.salt, {
      keySize: 256 / 32 + 128 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA1,
    }); // so PBKDF2 in CryptoJS is direct in that it
    // always begins at the beginning of the password, whereas the .net
    // implementation offsets by the last length each time .GetBytes() is called
    // so we had to generate a Iv + Salt password and then split it

    let hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);

    let key = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
    let iv = CryptoJS.enc.Hex.parse(
      hexKeyAndIv.substring(64, hexKeyAndIv.length)
    );

    // console.log(key.toString(CryptoJS.enc.Base64) + ' ********') //-------
    // console.log(iv.toString(CryptoJS.enc.Base64) + ' ???????????') //-------

    var encTarjeta = CryptoJS.AES.decrypt(conversion, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf16LE);
    // console.log(encTarjeta + ' Desencriptacion')
    return encTarjeta;
  }

  encrypt(conversion: string): string {
    let keyAndIv = CryptoJS.PBKDF2(this.key, this.salt, {
      keySize: 256 / 32 + 128 / 32,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA1,
    }); // so PBKDF2 in CryptoJS is direct in that it
    // always begins at the beginning of the password, whereas the .net
    // implementation offsets by the last length each time .GetBytes() is called
    // so we had to generate a Iv + Salt password and then split it

    let hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);

    let key = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
    let iv = CryptoJS.enc.Hex.parse(
      hexKeyAndIv.substring(64, hexKeyAndIv.length)
    );

    // console.log(keyF.toString(CryptoJS.enc.Base64) + ' ********') //-------
    // console.log(ivF.toString(CryptoJS.enc.Base64) + ' ???????????') //-------

    // console.log(conversion)
    var encTarjeta = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf16LE.parse(conversion),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
    //  console.log(encTarjeta + ' ====5')
    return encTarjeta;
  }
}
