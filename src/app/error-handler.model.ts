import { ErrorHandler } from "@angular/core";

// TODO can be improved - add other error type checks, add notification service call to display errors in the UI etc..
export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (error instanceof Error) {
      console.log('a client side error happened:');
      console.log(error);
    } else {
      console.log('an unknown error happened:');
      console.log(error);
    }
  }
}
