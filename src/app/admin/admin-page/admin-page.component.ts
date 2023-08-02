import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { YearReport } from 'src/app/model/bill_reports.model';
import { BillService } from 'src/app/services/bills.service';
import { BillStore } from 'src/app/store/bill.store';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit, OnDestroy {
  year = 2023;
  isCollapsed = false;
  salesChart: any;
  categoryChart: any;
  date = null;
  readonly destroy$ = new Subject<void>;
  constructor(private billStore: BillStore,
    private billService: BillService) { }

  ngOnInit(): void {
    this.test();
  }

  createSalesChart(saleNProfitRp: YearReport) {
    this.salesChart = new Chart("salesChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Jan', 'Feb', 'Mar', 'April',
          'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "Sales",
            data: saleNProfitRp.sales,
            backgroundColor: '#F18F01',
            borderColor: '#F18F01'
          },
          {
            label: "Profit",
            data: saleNProfitRp.profits,
            backgroundColor: '#48639C',
            borderColor: '#48639C'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        elements: {
          line: {
            tension: 0.4,
          }
        },
      }
    });
  }

  // createCategoryChart(){
  //   this.categoryChart = new Chart()
  // }

  onChangeCalendar(result: Date): void {
    console.log(result.getFullYear());
  }

  test() {
    const reportDatas = this.billService.initBillReports(this.year.toString());
    reportDatas.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if(data.categoriesRp && data.topProducts && data.yearReports && data.bills){
        this.createSalesChart(data.yearReports);
      }
    })
  };


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
