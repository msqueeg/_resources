function onLoadCallback() {
          var dataTable = new google.visualization.DataTable();
          dataTable.addRows(5);
 
          dataTable.addColumn('number');
          dataTable.addColumn('number');
		  dataTable.addColumn('number');
		  dataTable.addColumn('number');
		  dataTable.addColumn('number');
		  dataTable.addColumn('number');
		  dataTable.addColumn('number');
		  dataTable.addColumn('number');
		  dataTable.addColumn('number');
          dataTable.setValue(0, 0, 1804);
          dataTable.setValue(0, 1, 205);
          dataTable.setValue(1, 0, 63);
          dataTable.setValue(1, 1, 365);
		  dataTable.setValue(0, 2, 44.5);
          dataTable.setValue(0, 3, 16.7);
          dataTable.setValue(1, 2, 60.9);
          dataTable.setValue(1, 3, 0.3);
		  dataTable.setValue(0, 4, 22832);
          dataTable.setValue(1, 4, 8088);
          dataTable.setValue(2, 4, 2350);
          dataTable.setValue(3, 4, 588);
		  dataTable.setValue(0, 5, 100);
          dataTable.setValue(1, 5, 94);
          dataTable.setValue(2, 5, 81);
          dataTable.setValue(3, 5, 55);
          dataTable.setValue(4, 5, 35);
		  dataTable.setValue(0, 6, 1455);
          dataTable.setValue(0, 7, 1112);
          dataTable.setValue(0, 8, 376);
          dataTable.setValue(1, 6, 384);
          dataTable.setValue(1, 7, 222);
          dataTable.setValue(1, 8, 112);
 
          draw(dataTable);
        }
 
      function draw(dataTable) {
        var enrollment = new google.visualization.ImageChart(document.getElementById('enrollment-status'));
		var enrollmentView = new google.visualization.DataView(dataTable);
		enrollmentView.setColumns([0,1]);
		enrollmentView.setRows([0,1]);
        var enrollmentOptions = {
          chxl: '0:|undergraduate|graduate',
          chxp: '0,14,71',
          chxr: '0,-15,100|1,0,1990',
          chxs: '0,013e7f,10.5,0,l,676767|1,013e7f,10.5,1,t,ffffff',
          chxtc: '0,10|1,8',
          chxt: 'x,y',
          chbh: 'a,3,9',
          chs: '480x345',
          cht: 'bvg',
          chco: 'C41230,013E7F',
          chds: '0,1995,-10,2000',
          chd: 't:1804,63|205,365',
          chdl: 'Full Time|Part Time',
          chg: '0,-1,0,0',
          chma: '20,20,10,15|5,10',
          chtt: 'Student Enrollment Status',
          chts: '013e7f,15.5'
        };
        enrollment.draw(enrollmentView, enrollmentOptions);
 
		var progress = new google.visualization.ImageChart(document.getElementById('progress-status'));
		var progressView = new google.visualization.DataView(dataTable);
		progressView.setColumns([2,3]);
		progressView.setRows([0,1]);
        var progressOptions = {
          chxl: '1:|After Four Years|After Six Years',
          chxp: '1,75,25',
          chxr: '0,0,100',
          chxs: '0,013e7f,11.5,0,l,676767|1,013e7f,11.5,0,l,676767',
          chxt: 'x,y',
          chbh: 'a',
          chs: '440x220',
          cht: 'bhs',
          chco: '013e7f,b5d6f1',
          chds: '0,100,0,100',
          chd: 't:44.5,60.9|16.7,0.3',
          chdl: 'Graduated|Still Enrolled',
	  chma: '20,20,10,15|5,10',
          chtt: 'Progress Rate for Students Starting in Fall 2003',
	  chts: '013e7f,15.5'
        };
        progress.draw(progressView, progressOptions);
		
		var costs = new google.visualization.ImageChart(document.getElementById('undergraduate-costs'));
		var costsView = new google.visualization.DataView(dataTable);
		costsView.setColumns([4]);
		costsView.setRows([0,1,2,3]);
        var costsOptions = {
          chxs: '0,00000000,11.5',
          chxt: 'x',
          chs: '480x345',
          cht: 'p3',
          chco: '013E7F|C41230|3399CC|FF9900',
          chds: '0,22832',
          chd: 't:22832,8088,2350,588',
          chdl: 'Tuition|Room and Board|Other Expenses|Required Fees',
          chp: '0.8',
          chl: '|||',
          chma: '35,35,35,35|0,5',
          chtt: 'Typical Undergraduate Costs without Financial Aid',
          chts: '013e7f,15.5'
        };
        costs.draw(costsView, costsOptions);
		
		var aid = new google.visualization.ImageChart(document.getElementById('financial-aid'));
		var aidView = new google.visualization.DataView(dataTable);
		aidView.setColumns([5]);
		aidView.setRows([0,1,2,3,4]);
        var aidOptions = {
          chxl: '0:|0|25|50|75|100|1:|State Grants|Federal Grants|Student Loans|Institutional Aid Scholarships|Any Type Of Grant Aid',
          chxp: '',
          chxr: '',
          chxs: '0,013e7f,11.5,0,l,676767|1,013e7f,10.5,1,l,676767',
          chxtc: '',
          chxt: 'x,y',
          chs: '380x200',
          cht: 'bhs',
          chco: '013E7F',
          chma: '25,25,25,25|5',
          chtt: 'Undergraduate Financial Aid Awards',
          chts: '013e7f,15.5'
        };
        aid.draw(aidView, aidOptions);
        
		var admissions = new google.visualization.ImageChart(document.getElementById('preparation'));
		var admissionsView = new google.visualization.DataView(dataTable);
		admissionsView.setColumns([6,7,8]);
		admissionsView.setRows([0,1]);
        var admissionsOptions = {
          chxl: '1:|New Freshmen|New Transfers',
          chxp: '1,25,75',
          chxr: '0,0,1700',
          chxs: '',
          chxtc: '',
          chxt: 'y,x',
          chbh: 'a,5,15',
          chs: '380x200',
          cht: 'bvg',
          chco: '013E7F,C41230,3399CC',
          chds: '0,1700,0,1700,0,1700',
          chd: 't:1455,384|1112,222|376,112',
          chdl: 'Applied|Admitted|Enrolled',
          chtt: 'Undergraduate Enrollment',
		  chts: '013e7f,15.5'
        };
        admissions.draw(admissionsView, admissionsOptions);
 
      }
 
      function handleQueryResponse(response) {
        if (response.isError()) {
          alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
          return;
        }
        draw(response.getDataTable());
      }
 
      google.load("visualization", "1", {packages:["imagechart"]});
      google.setOnLoadCallback(onLoadCallback);
