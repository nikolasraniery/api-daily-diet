export class CustomError {
  code: number;
  message: string;

  constructor({code, message}: { code: number, message: string}) { 
    this.code = code;
    this.message = message;
  }
}