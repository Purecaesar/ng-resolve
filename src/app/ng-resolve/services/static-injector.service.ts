import { Injectable, Injector } from "@angular/core";

@Injectable()
export class StaticInjectorService {
  static Injector: Injector

  constructor(injector: Injector) {
    StaticInjectorService.Injector = injector;
  }
}
