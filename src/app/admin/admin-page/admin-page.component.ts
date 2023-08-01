import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  isCollapsed = false;
  chart: any;
  date = null;


  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', '2022-05-12','2022-05-13', ],
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576', '467','976',],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        elements: {
          line: {
            borderColor: '#D74E09',
            tension: 0.4,


          }
        },
      }
    });
  }

  onChangeCalendar(result: Date): void{
    console.log('Change: ', result);
  }

}
