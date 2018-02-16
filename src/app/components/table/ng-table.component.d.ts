import { EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
export declare class NgTableComponent {
    private sanitizer;
    ref: ChangeDetectorRef;
    rows: Array<any>;
    rowExpandContent: string;
    expandable: boolean;
    showExpandedRow: boolean;
    expandedRowIndex: number;
    config: any;
    tableChanged: EventEmitter<any>;
    cellClicked: EventEmitter<any>;
    expanderClicked: EventEmitter<any>;
    scrolledDown: EventEmitter<any>;
    showFilterRow: Boolean;
    columns: Array<any>;
    private _columns;
    private _config;
    scrollPercentage: number;
    constructor(sanitizer: DomSanitizer, ref: ChangeDetectorRef);
    sanitize(html: string): SafeHtml;
    readonly configColumns: any;
    onChangeTable(column: any): void;
    toggleRowExpansion(row: any, rowNum: number): void;
    checkScroll(event: any): void;
    getData(row: any, propertyName: string): string;
    cellClick(row: any, column: any): void;
}
