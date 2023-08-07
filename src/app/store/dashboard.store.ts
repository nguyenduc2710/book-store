import { BillReport } from "@/model/bill_reports.model";
import { BillService } from "@/services/bills.service";
import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap, tap, of } from "rxjs";

export interface DashboardState {
  billReport: BillReport,
}

const initState: DashboardState = {
  billReport: {
    bills: [],
    topProducts: [],
    categoriesRp: {
      categories: [],
      totalBooksSold: 0
    },
    yearReports: undefined,
    year: '',
  },
}

@Injectable({ providedIn: 'root' })
export class DashboardStore extends ComponentStore<DashboardState>{
  constructor(
    private billService: BillService
  ) {
    super(initState);
  }


  //SELECTORS
  readonly billReport$ = this.select((state) => state.billReport);
  //ViewModel
  readonly vm$ = this.select(
    this.billReport$,
    (billReport) => ({
      billReport
    })
  )

  //UPDATERS
  readonly writeBillReport = this.updater((state: DashboardState, billReport: BillReport) => (
    {
      ...state,
      billReport: billReport
    }
  ));

  //EFFECTS
  readonly initBillReport = this.effect((param$: Observable<string>) => param$.pipe(
    switchMap((year) =>
      this.billService.initBillReports(year).pipe(
        tapResponse(
          (billRp: BillReport) => {
            this.writeBillReport(billRp);
          },
          err => console.log(err)
        )
      )
    )
  ))

}
