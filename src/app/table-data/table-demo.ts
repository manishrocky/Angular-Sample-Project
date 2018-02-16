import { Component, OnInit } from '@angular/core';
import { TableData } from './table-data';
//import { RowContentComponent } from '../table-expand/row-content.component';
import * as moment from 'moment';

// webpack html imports
//let template = require('./table-demo.html');

@Component({
  selector: 'table-demo',
  templateUrl: './table-demo.html'
})
export class TableDemoComponent implements OnInit {
  public rows: Array<any> = [];
  public columns: Array<any> = [
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
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 20;
  public numPages: number = 1;
  public length: number = 0;
  public rowsToRender: number = 35;
  public showExpandedRow: boolean = false;
  public expandedRowIndex: number;
  public rowExpandContent: string = ``;


  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered'],
    height: '80vh',
    renderMoreAt: 0.85,
    infiniteScroll: false
  };

  private data: Array<any> = TableData;

  public constructor() {
    this.length = this.data.length;
  }

  public ngOnInit(): void {
    this.onChangeTable(this.config);
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }



    // simple sorting
    return data.sort((previous: any, current: any) => {

      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.name == 'date') {
        filteredData = filteredData.filter((item: any) => {
          //console.log(item);
          return item[column.name] = moment(new Date(item[column.name])).format('MM-DD-YYYY');
        });
      }
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });


    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rowExpandContent = this.rowContentData(filteredData);

    if (sortedData.length > this.rowsToRender && config.infiniteScroll) {
      this.rows = sortedData.slice(0, this.rowsToRender);
      this.length = this.rows.length;
    } else {
      this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.length = sortedData.length;
    }
  }

  public onScrollDown() {
    this.rowsToRender += 25;
    this.onChangeTable(this.config);
  }

  public expanderClicked(row: any) {
    console.log(row);
  }

  public onCellClick(data: any): any {
    console.log(data);
  }

  public rowContentData(data: any): any {

    this.columns.forEach((column: any) => {
      data = data.filter((item: any, index: any) => {

        //console.log(item);
        //return item[column.name] = moment(new Date(item[column.name])).format('MM-DD-YYYY');
      });
    });

    return `Here It Works`;

  }
}
