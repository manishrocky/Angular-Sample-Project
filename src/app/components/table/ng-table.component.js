"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var NgTableComponent = (function () {
    function NgTableComponent(sanitizer, ref) {
        this.sanitizer = sanitizer;
        this.ref = ref;
        // Table values
        this.rows = [];
        this.expandable = true;
        // Outputs (Events)
        this.tableChanged = new core_1.EventEmitter();
        this.cellClicked = new core_1.EventEmitter();
        this.expanderClicked = new core_1.EventEmitter();
        this.scrolledDown = new core_1.EventEmitter();
        this.showFilterRow = false;
        this._columns = [];
        this._config = {};
        this.scrollPercentage = 0;
    }
    Object.defineProperty(NgTableComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (conf) {
            if (!conf.className) {
                conf.className = 'table-striped table-bordered';
            }
            if (conf.className instanceof Array) {
                conf.className = conf.className.join(' ');
            }
            this._config = conf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (values) {
            var _this = this;
            values.forEach(function (value) {
                if (value.filtering) {
                    _this.showFilterRow = true;
                }
                if (value.className && value.className instanceof Array) {
                    value.className = value.className.join(' ');
                }
                var column = _this._columns.find(function (col) { return col.name === value.name; });
                if (column) {
                    Object.assign(column, value);
                }
                if (!column) {
                    _this._columns.push(value);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    NgTableComponent.prototype.sanitize = function (html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    };
    Object.defineProperty(NgTableComponent.prototype, "configColumns", {
        get: function () {
            var sortColumns = [];
            this.columns.forEach(function (column) {
                if (column.sort) {
                    sortColumns.push(column);
                }
            });
            return { columns: sortColumns };
        },
        enumerable: true,
        configurable: true
    });
    NgTableComponent.prototype.onChangeTable = function (column) {
        this._columns.forEach(function (col) {
            if (col.name !== column.name && col.sort !== false) {
                col.sort = '';
            }
        });
        this.showExpandedRow = false;
        this.expandedRowIndex = null;
        this.tableChanged.emit({ sorting: this.configColumns });
        this.ref.markForCheck();
    };
    NgTableComponent.prototype.toggleRowExpansion = function (row, rowNum) {
        if (this.showExpandedRow && (this.expandedRowIndex == rowNum)) {
            this.showExpandedRow = false;
            this.expandedRowIndex = null;
        }
        else {
            this.showExpandedRow = true;
            this.expandedRowIndex = rowNum;
            this.expanderClicked.emit({ row: row, rowNum: rowNum });
            this.ref.markForCheck();
        }
    };
    ;
    NgTableComponent.prototype.checkScroll = function (event) {
        this.scrollPercentage = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight);
        if (this.scrollPercentage > this.config.renderMoreAt) {
            this.scrolledDown.emit(this.scrollPercentage);
        }
    };
    ;
    NgTableComponent.prototype.getData = function (row, propertyName) {
        return propertyName.split('.').reduce(function (prev, curr) { return prev[curr]; }, row);
    };
    NgTableComponent.prototype.cellClick = function (row, column) {
        this.cellClicked.emit({ row: row, column: column });
    };
    return NgTableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], NgTableComponent.prototype, "rows", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], NgTableComponent.prototype, "rowExpandContent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NgTableComponent.prototype, "expandable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NgTableComponent.prototype, "showExpandedRow", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], NgTableComponent.prototype, "expandedRowIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], NgTableComponent.prototype, "config", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgTableComponent.prototype, "tableChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgTableComponent.prototype, "cellClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgTableComponent.prototype, "expanderClicked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NgTableComponent.prototype, "scrolledDown", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], NgTableComponent.prototype, "columns", null);
NgTableComponent = __decorate([
    core_1.Component({
        selector: 'ng-table',
        template: "\n    <div [ngStyle]=\"{height: config?.height}\" style=\"overflow-y:scroll; width:auto; overflow-x:hidden; display:block;\" (scroll)=\"checkScroll($event)\">\n      <table id=\"data-table-custom\" class=\"table dataTable\" ngClass=\"{{config.className || ''}}\"\n             role=\"grid\" style=\"width: 100%;\" >\n        <thead>\n          <tr role=\"row\">\n            <th *ngIf=\"expandable\"></th>\n            <th *ngFor=\"let column of columns\" [ngTableSorting]=\"config\" [column]=\"column\"\n                (sortChanged)=\"onChangeTable($event)\" ngClass=\"{{column.className || ''}}\">\n              {{column.title}}\n              <i *ngIf=\"config && column.sort\" class=\"pull-right fa\"\n                [ngClass]=\"{'fa-chevron-down': column.sort === 'desc', 'fa-chevron-up': column.sort === 'asc'}\"></i>\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n        <tr *ngIf=\"showFilterRow\">\n          <td *ngIf=\"expandable\"></td>\n          <td *ngFor=\"let column of columns\">\n            <input *ngIf=\"column.filtering\" placeholder=\"{{column.filtering.placeholder}}\"\n                   [ngTableFiltering]=\"column.filtering\"\n                   class=\"form-control\"\n                   style=\"width: 85%; padding:none;\"\n                   (tableChanged)=\"onChangeTable(config)\"/>\n          </td>\n        </tr>\n          <template ngFor let-row [ngForOf]=\"rows\" let-i= \"index\" >\n          <tr [ngClass]=\"{'table-info': showExpandedRow && (i == expandedRowIndex) && expandable }\">\n            <td (click)=\"toggleRowExpansion(row, i)\" *ngIf=\"expandable\" (click)=\"cellClick(row, 'expand', i)\" style=\"text-align:center; padding:0px; padding-top:7px;\"><a style=\"width:100%; text-align:center;\">\n              <i [ngClass]=\"{'fa': true, 'fa-plus-circle': i != expandedRowIndex, 'fa-minus-circle' : i == expandedRowIndex}\" style=\"font-size:1.5em; cursor:pointer\"></i></a>\n            </td>\n            <td (click)=\"cellClick(row, column.name, i)\" *ngFor=\"let column of columns\" [innerHtml]=\"sanitize(getData(row, column.name))\" ></td>\n          </tr>\n          <tr *ngIf=\"showExpandedRow && (i == expandedRowIndex) && expandable\" class=\"table-info\" >\n              <td [attr.colspan]=\"columns.length + 1\">\n                <div [innerHtml]=\"sanitize(rowExpandContent)\"></div>\n              </td>\n          </tr>\n          </template>\n        </tbody>\n      </table>\n    </div>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, core_1.ChangeDetectorRef])
], NgTableComponent);
exports.NgTableComponent = NgTableComponent;
