import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { YearReport, categoryRp } from 'src/app/model/bill_reports.model';
import { Book } from 'src/app/model/books.model';
import { BillService } from 'src/app/services/bills.service';
import { BillStore } from 'src/app/store/bill.store';
// import { Context } from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js/auto';
// import 'chartjs-plugin-datalabels';

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
  topProducts: { book: Book, quantity: number }[] = [];
  date = null;
  totalBooksSold = 0;
  readonly destroy$ = new Subject<void>;

  constructor(
    private billStore: BillStore,
    private billService: BillService
  ) { }

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

  createCategoryChart(categoriesRp: categoryRp) {
    const categories = categoriesRp.categories.map(item => item.category);
    const quantityData = categoriesRp.categories.map(item => item.quantity);
    this.categoryChart = new Chart('categoryChart', {
      type: 'doughnut',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Books sold',
            data: quantityData,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(72, 114, 75)',
              'rgb(189, 89, 142)',
              'rgb(45, 134, 89)',
              'rgb(128, 128, 128)',
              'rgb(120, 168, 196)',
              'rgb(228, 137, 102)',
              'rgb(192, 120, 168)',
              'rgb(128, 190, 128)',
              'rgb(237, 151, 74)',
              'rgb(158, 127, 205)',
              'rgb(91, 186, 149)',
            ],
          }
        ],
      },
    })
  }

  onChangeCalendar(result: Date): void {
    console.log(result.getFullYear());
  }

  test() {
    const reportDatas = this.billService.initBillReports(this.year.toString());
    reportDatas.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if (data.categoriesRp && data.topProducts && data.yearReports && data.bills) {
        this.createSalesChart(data.yearReports);
        this.createCategoryChart(data.categoriesRp);
        this.totalBooksSold = data.categoriesRp.totalBooksSold;
        data.topProducts.forEach((item: any) => {
          this.topProducts.push(item);
        })
        console.log(data);
      }
    })
  };


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
