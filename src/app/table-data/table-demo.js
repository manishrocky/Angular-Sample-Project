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
var table_data_1 = require("./table-data");
//import { RowContentComponent } from '../table-expand/row-content.component';
var moment = require("moment");
// webpack html imports
//let template = require('./table-demo.html');
var TableDemoComponent = (function () {
    function TableDemoComponent() {
        this.rows = [];
        this.columns = [
            { title: 'Event ID', name: 'eventId', sort: 'asc' },
            {
                title: 'Date',
                name: 'date',
                sort: true
            },
            { title: 'Raw Text', name: 'rawText', sort: 'asc' },
            { title: 'Processed Text', name: 'processedText', sort: 'asc' },
            { title: 'Trd Search', name: 'isTrdSearch', sort: 'asc' },
            { title: 'App Command', name: 'appCommand', sort: 'asc' },
            { title: 'Search Word', name: 'searchWord', sort: 'asc' },
            { title: 'Deliver Word', name: 'deliverWord', sort: 'asc' },
            { title: 'Contact Word', name: 'contactWord', sort: 'asc' },
            { title: 'Folder Word', name: 'folderWord', sort: 'asc' },
            { title: 'Folder Name', name: 'folderName', sort: 'asc' },
            { title: 'Query Text', name: 'queryText', sort: '', filtering: { filterString: '', placeholder: 'Filter by Query Text' } },
            { title: 'Citation', name: 'citation', sort: 'asc' },
            { title: 'Document Title', name: 'documentTitle', sort: 'asc' },
            { title: 'Jurisdiction', name: 'jurisdiction', sort: 'asc' },
            { title: 'Content Type', name: 'contentType', sort: 'asc' },
            { title: 'Is Successful', name: 'isSuccessful', sort: 'asc' },
            { title: 'Recording Length', name: 'recordingLength', sort: 'asc' },
            { title: 'Correlation Id', name: 'correlationId', sort: 'asc' },
            { title: 'Session Id', name: 'sessionId', sort: 'asc' },
            { title: 'App Version', name: 'appVersion', sort: 'asc' },
            { title: 'Operating System', name: 'operatingSystem', sort: 'asc' },
            { title: 'Source Device', className: 'text-warning', name: 'sourceDevice', sort: '', filtering: { filterString: '', placeholder: 'Filter by Source Device' } },
            { title: 'Processed Text', className: ['office-header', 'text-success'], name: 'processedText', sort: 'asc' },
        ];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 20;
        this.numPages = 1;
        this.length = 0;
        this.rowsToRender = 35;
        this.showExpandedRow = false;
        this.rowExpandContent = "";
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered'],
            height: '80vh',
            renderMoreAt: 0.85,
            infiniteScroll: false
        };
        this.data = table_data_1.TableData;
        this.length = this.data.length;
    }
    TableDemoComponent.prototype.ngOnInit = function () {
        this.onChangeTable(this.config);
    };
    TableDemoComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    TableDemoComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    TableDemoComponent.prototype.changeFilter = function (data, config) {
        var _this = this;
        var filteredData = data;
        this.columns.forEach(function (column) {
            if (column.name == 'date') {
                filteredData = filteredData.filter(function (item) {
                    //console.log(item);
                    return item[column.name] = moment(new Date(item[column.name])).format('MM-DD-YYYY');
                });
            }
            if (column.filtering) {
                filteredData = filteredData.filter(function (item) {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter(function (item) {
                return item[config.filtering.columnName].match(_this.config.filtering.filterString);
            });
        }
        var tempArray = [];
        filteredData.forEach(function (item) {
            var flag = false;
            _this.columns.forEach(function (column) {
                if (item[column.name].toString().match(_this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    };
    TableDemoComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.data, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rowExpandContent = this.rowContentData(filteredData);
        if (sortedData.length > this.rowsToRender && config.infiniteScroll) {
            this.rows = sortedData.slice(0, this.rowsToRender);
            this.length = this.rows.length;
        }
        else {
            this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
            this.length = sortedData.length;
        }
    };
    TableDemoComponent.prototype.onScrollDown = function () {
        this.rowsToRender += 25;
        this.onChangeTable(this.config);
    };
    TableDemoComponent.prototype.expanderClicked = function (row) {
        console.log(row);
    };
    TableDemoComponent.prototype.onCellClick = function (data) {
        console.log(data);
    };
    TableDemoComponent.prototype.rowContentData = function (data) {
        this.columns.forEach(function (column) {
            data = data.filter(function (item, index) {
                //console.log(item);
                //return item[column.name] = moment(new Date(item[column.name])).format('MM-DD-YYYY');
            });
        });
        return "Here It Works";
    };
    return TableDemoComponent;
}());
TableDemoComponent = __decorate([
    core_1.Component({
        selector: 'table-demo',
        templateUrl: './table-demo.html'
    }),
    __metadata("design:paramtypes", [])
], TableDemoComponent);
exports.TableDemoComponent = TableDemoComponent;
