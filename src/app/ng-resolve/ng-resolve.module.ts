import { NgModule } from "@angular/core";
import { StaticInjectorService } from "./services/static-injector.service";

@NgModule({
  providers: [StaticInjectorService],
})
export class NgResolveModule {
  constructor(_: StaticInjectorService) {}
}
