import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, Subscription } from 'rxjs';
import { Chart } from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import chartDataLabels from 'chartjs-plugin-datalabels'
import { DashboardState, DashboardStore } from '@/store/dashboard.store';
import { BillService } from '@/services/bills.service';
import { YearReport, categoryRp } from '@/model/bill_reports.model';
import { OriginBill } from '@/model/bill.model';
import { Book } from '@/model/books.model';

type AdminNavigate = 'Dashboard' | 'Customers' | 'Products' | 'Orders' | 'Tasks';


Chart.register(chartDataLabels);
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  year = new Date().getFullYear().toString();
  dashboardRp: DashboardState = {
    billReport: {
      bills: [],
      topProducts: [],
      categoriesRp: {
        categories: [],
        totalBooksSold: 0
      },
      yearReports: undefined,
      year: this.year,
    },
  }
  isCollapsed = false;
  salesChart: any;
  categoryChart: any;
  totalBooksSold = 0;
  topProducts: { book: Book, quantity: number }[] = [];
  totalProfits = 0;
  totalSales = 0;
  totalExpenses = 0;
  readonly destroy$ = new Subject<void>;
  readonly report$ = this.dashboardStore.vm$;
  subcription$ = new Subscription;
  listOfBills: OriginBill[] = [];

  navigate: AdminNavigate = 'Dashboard';

  constructor(
    private billService: BillService,
    private dashboardStore: DashboardStore,
  ) {}

  // doughnutCenterLabel = {
  //   id: 'doughnutLabel',
  //   beforeDatasetsDraw(chart: Chart, args: any, pluginOptions:any) {
  //     const { ctx, data } = chart;
  //     ctx.save();
  //     const xCoor = chart.getDatasetMeta(0).data[0].x;
  //     const yCoor = chart.getDatasetMeta(0).data[0].y;
  //     ctx.font = 'bold 20px sans-serif';
  //     ctx.textAlign = 'center';
  //     ctx.textBaseline = 'middle';
  //     ctx.fillStyle = 'rgba(54,162,235,1)';
  //     ctx.fillText('Center Text', xCoor, yCoor);
  //   }
  // }

  ngOnInit(): void {
    this.subcription$ = this.dashboardStore.billReport$.subscribe((billRp) => {
      if (billRp.categoriesRp && billRp.topProducts && billRp.yearReports && billRp.bills) {
        this.salesChart.destroy();
        this.categoryChart.destroy();
        this.topProducts = [];
        this.listOfBills = [];

        this.totalProfits = billRp.yearReports.profits.reduce((accumulate, profit) => accumulate + profit, 0);
        this.totalSales = billRp.yearReports.sales.reduce((accumulate, sales) => accumulate + sales, 0);
        this.totalExpenses = this.totalSales - this.totalProfits;
        this.createSalesChart(billRp.yearReports);
        this.createCategoryChart(billRp.categoriesRp);
        this.listOfBills = this.filterNearestOrder(billRp.bills).splice(0, 5);
        this.totalBooksSold = billRp.categoriesRp.totalBooksSold;
        billRp.topProducts.forEach((item: any) => {
          this.topProducts.push(item);
        })
      }
    })
    this.initDashboard();
  }

  onNavigate(title: AdminNavigate){
    this.navigate = title;
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
        responsive: true,
        plugins: {
          datalabels: {
            display: false
          }
        },
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
    const categories = categoriesRp.categories.map(item => item.category.toString());
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
      options: {
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
            },
            formatter: (value, context) => {
              // Customize label format as needed
              return context.chart.data.labels![context.dataIndex];
            },
          },
        },
      },
      // plugins: [this.doughnutCenterLabel]
    })
  }

  onChangeCalendar(result: Date): void {
    const year = result.getFullYear().toString();
    this.dashboardStore.initBillReport(year);
  }

  initDashboard() {
    const reportDatas = this.billService.initBillReports(this.year);
    reportDatas.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      if (data.categoriesRp && data.topProducts && data.yearReports && data.bills) {
        this.topProducts = [];

        this.totalProfits = data.yearReports.profits.reduce((accumulate: number, profit: number) => accumulate + profit, 0);
        this.totalSales = data.yearReports.sales.reduce((accumulate: number, sales: number) => accumulate + sales, 0);
        this.totalExpenses = this.totalSales - this.totalProfits;
        this.createSalesChart(data.yearReports);
        this.createCategoryChart(data.categoriesRp);
        this.listOfBills = this.filterNearestOrder(data.bills).splice(0, 5);
        this.totalBooksSold = data.categoriesRp.totalBooksSold;
        data.topProducts.forEach((item: any) => {
          this.topProducts.push(item);
        })
        console.log(data);
      }
    })
  };

  filterNearestOrder(bill: OriginBill[]){
    const arrangedBills = bill.sort((a, b) => {
      const aDate = Number(a.bill.dateBuy.split(' ')[0].split('-').join(''));
      const bDate = Number(b.bill.dateBuy.split(' ')[0].split('-').join(''));
      return bDate - aDate;
    });
    return arrangedBills;
  }

  test() {
    // this.filterNearestOrder(this.listOfBills);
    console.log(this.dashboardStore.basdd);
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
