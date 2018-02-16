"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var table_demo_1 = require("./table-data/table-demo");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var ng2_bootstrap_2 = require("ng2-bootstrap");
var ng_table_module_1 = require("./components/ng-table-module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            table_demo_1.TableDemoComponent,
            app_component_1.AppComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            ng_table_module_1.Ng2TableModule,
            ng2_bootstrap_1.PaginationModule.forRoot(),
            ng2_bootstrap_2.TabsModule,
            common_1.CommonModule,
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
