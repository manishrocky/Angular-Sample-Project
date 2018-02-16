"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_table_component_1 = require("./table/ng-table.component");
var ng_table_filtering_directive_1 = require("./table/ng-table-filtering.directive");
var ng_table_paging_directive_1 = require("./table/ng-table-paging.directive");
var ng_table_sorting_directive_1 = require("./table/ng-table-sorting.directive");
var Ng2TableModule = (function () {
    function Ng2TableModule() {
    }
    return Ng2TableModule;
}());
Ng2TableModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective],
        exports: [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective]
    })
], Ng2TableModule);
exports.Ng2TableModule = Ng2TableModule;
