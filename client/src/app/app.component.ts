import {Component, OnInit} from '@angular/core';
import {APIService} from './api.service';
import {groupBy} from 'lodash';

@Component({
  selector: 'app-root',
  providers: [APIService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  public data: any;
  public currentElementID: string;
  public male: any[];
  public female: any[];

  //pie chart data
  public pieChartLabels: string[] = ['Female', 'Male'];
  public pieChartData: number[] = [0, 0];
  public pieChartType: string = 'pie';

  //line chart data
  public lineChartType: string = 'line';
  public lineChartData: any[] = [{data: []}, {data: []}, {data: []}];
  public lineChartLabels: Array<any> = ["1962", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972"];
  public lineChartOptions: any = {
    responsive: true
  };

  //line chart relations data
  public relationLineChartType: string = 'line';
  public relationLineChartData: any[] = [
    {data: []},
    {data: []}
  ];
  public relationLineChartLabels: Array<any> = ['Dead', 'Alive', 'Dead for another cause'];
  public relationLineChartOptions: any = {
    responsive: true
  };

  //bar chart data
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['0-19', '21-40', '41-60', '61-80', '81-100'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    {data: []},
    {data: []},
  ];

  //doughnut chart data
  public doughnutChartLabels: string[] = ['Dead', 'Alive', 'Dead for another cause'];
  public doughnutChartData: number[] = [0, 0, 0];
  public doughnutChartType: string = 'doughnut';

  // Radar
  public radarChartLabels: string[] = ['Age', 'Time', 'Thickness'];
  public radarChartData: any = [
    {data: []},
    {data: []}
  ];
  public radarChartType: string = 'radar';

  constructor(private apiService: APIService) {
  }

  ngOnInit() {
    this.getData();
  }

  enter(currentID) {
    this.currentElementID = currentID;
  }

  getData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
      this.male = this.data.filter(element => element.sex == 1);
      this.female = this.data.filter(element => element.sex == 0);
    }, error => {
      console.error(error)
    }, () => {
      console.log('Data loaded');
      this.getMaleFemaleData();
      this.getSurvivalTimeData();
      this.getAgeAverageData();
      this.getStatusData();
      this.getRelationsData()
    })
  }

  getMaleFemaleData() {
    let numOfMales = 0;
    let numOfFemales = 0;
    for (let i = 0; i < this.data.length; i++) {
      let element = this.data[i];
      if (element.sex == 1) {
        numOfMales++
      } else {
        numOfFemales++
      }
    }
    this.pieChartData = [numOfFemales, numOfMales]
  }

  getSurvivalTimeData() {
    let interval = 1825; //5 years
    let data;
    let infoData = [];
    let maleInfoData = [];
    let femaleInfoData = [];
    let maleData = [];
    let femaleData = [];

    data = groupBy(this.data.filter(element => element.time >= interval), 'year');
    this.lineChartLabels = Object.keys(data);
    console.log(this.lineChartLabels);

    for (let element of this.lineChartLabels) {
      infoData.push(data[element].length / this.data.length * 100);
    }
    console.log(infoData);


    data = groupBy(this.male.filter(element => element.time >= interval), 'year');

    for (let element of this.lineChartLabels) {
      try {
        maleInfoData.push(data[element].length / this.male.length * 100);
      } catch (err) {
        maleInfoData.push(0);
      }
    }

    data = groupBy(this.female.filter(element => element.time >= interval), 'year');

    for (let element of this.lineChartLabels) {
      try {
        femaleInfoData.push(data[element].length / this.female.length * 100);
      } catch (err) {
        femaleInfoData.push(0);
      }
    }

    this.lineChartData = [
      {
        data: femaleInfoData,
        label: 'Female'
      }, {
        data: maleInfoData,
        label: 'Male'
      }, {
        data: infoData,
        label: 'Total'
      }
    ];
    /*

    let result = this.data.reduce(function (r, a) {
      let slot = Math.floor((a.time - 1) / interval);
      (r[slot] = r[slot] || []).push(a.time);
      return r;
    }, []);

    for (let i = 0; i < result.length; i++) {
      data.push(result[i].length/this.data.length);
    }

    let maleResult = this.male.reduce(function (r, a) {
      let slot = Math.floor((a.time - 1) / interval);
      (r[slot] = r[slot] || []).push(a.time);
      return r;
    }, []);

    for (let i = 0; i < maleResult.length; i++) {
      maleData.push(maleResult[i].length/this.male.length);
    }

    let femaleResult = this.female.reduce(function (r, a) {
      let slot = Math.floor((a.time - 1) / interval);
      (r[slot] = r[slot] || []).push(a.time);
      return r;
    }, []);

    for (let i = 0; i < femaleResult.length; i++) {
      femaleData.push(femaleResult[i].length/this.female.length);
    }


    this.lineChartData = [
      {
        data: femaleData,
        label: 'Female'
      }, {
        data: maleData,
        label: 'Male'
      }, {
        data: data,
        label: 'Total'
      }
    ];*/
  }

  getAgeAverageData() {
    let interval = 20;

    let maleResult = this.male.reduce(function (r, a) {
      let slot = Math.floor((a.age - 1) / interval);
      (r[slot] = r[slot] || []).push(a);
      return r;
    }, []);

    let femaleResult = this.female.reduce(function (r, a) {
      let slot = Math.floor((a.age - 1) / interval);
      (r[slot] = r[slot] || []).push(a);
      return r;
    }, []);

    console.log(this.getArrayOfLengths(femaleResult));
    console.log(this.getArrayOfLengths(maleResult));

    this.barChartData = [{
      data: this.getArrayOfLengths(femaleResult),
      label: 'Female'
    }, {
      data: this.getArrayOfLengths(maleResult),
      label: 'Male'
    }];
  }

  getArrayOfLengths(array: Array<any>) {
    let data: any[] = [];
    for (let i = 0; i < array.length; i++) {
      data.push(array[i].length);
    }
    return data;
  }

  getStatusData() {
    //1 died from melanoma, 2 alive, 3 dead from other causes.
    let dead = 0;
    let alive = 0;
    let deadOtherCause = 0;

    let maleDead = 0;
    let maleAlive = 0;
    let maleDeadOtherCause = 0;

    let femaleDead = 0;
    let femaleAlive = 0;
    let femaleDeadOtherCause = 0;

    for (let i = 0; i < this.data.length; i++) {
      let element = this.data[i];
      switch (element.status) {
        case 1:
          dead++;
          if (element.sex == 1)
            maleDead++;
          else
            femaleDead++;
          break;
        case 2:
          alive++;
          if (element.sex == 1)
            maleAlive++;
          else
            femaleAlive++;
          break;
        case 3:
          deadOtherCause++;
          if (element.sex == 1)
            maleDeadOtherCause++;
          else
            femaleDeadOtherCause++;
          break;
      }
    }

    this.doughnutChartData = [dead, alive, deadOtherCause];
    this.relationLineChartData = [
      {
        data: [femaleDead, femaleAlive, femaleDeadOtherCause],
        label: 'Female'
      },
      {
        data: [maleDead, maleAlive, maleDeadOtherCause],
        label: 'Male'
      }
    ];
  }

  getRelationsData() {
    let maleThickness = this.male.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.thickness / this.male.length);
    }, 0);
    let maleAge = this.male.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.age / this.male.length);
    }, 0);
    let maleTime = this.male.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.time / this.male.length)
    }, 0);

    let femaleThickness = this.female.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.thickness / this.female.length);
    }, 0);
    let femaleAge = this.female.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.age / this.female.length);
    }, 0);
    let femaleTime = this.female.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.time / this.female.length)
    }, 0);

    maleTime /= 365;
    femaleTime /= 365;

    this.radarChartData = [
      {
        data: [femaleAge, femaleTime, femaleThickness],
        label: 'Female'
      },
      {
        data: [maleAge, maleTime, maleThickness],
        label: 'Male'
      }
    ];

  }
}
