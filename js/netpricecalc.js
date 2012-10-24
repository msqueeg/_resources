//Net Price Calc Code
        var dict = {};        
        dict.rb_financialaid = { 'active':false,  'title':'Financial aid', '0':'Yes','1':'No' };
        dict.txt_age = { 'active':false, 'title':'Age', 'value':'' };
        dict.rb_livingstatus = { 'active':false, 'title':'Living arrangement', 'value':'' };
        dict.rb_residencystatus = { 'active':false, 'title':'Residency', 'value':''};
        dict.rb_maritalstatus = { 'active':false, 'title':'Marital Status', '0':'No', '1':'Yes' };
        dict.rb_numberofchildren = { 'active':false, 'title':'Children', '0':'No', '1':'Yes' };
        dict.txt_numberinfamily_dep = { 'active':false, 'title':'Number in Family', 'value':'' };
        dict.txt_numberincollege_dep = { 'active':false, 'title':'Number in College', 'value':'' };
        dict.rb_parentincome_dep = { 'active':false, 'title':'Parent Income', '0':'Between $0 - $30,000', '1':'Between $30,001 - $40,000',
                                    '2':'Between $40,001 - $50,000',
                                    '3':'Between $50,001 - $60,000',
                                    '4':'Between $60,001 - $70,000',
                                    '5':'Between $70,001 - $80,000',
                                    '6':'Between $80,001 - $90,000',
                                    '7':'Between $90,001 - $100,000',
                                    '8':'Above $100,000' };
        dict.rb_applicantincome_dep = { 'active':false, 'title':'Student Income', '0':'$0', '1':'Between $1 - $5,000',
                                    '2':'Between $5,001 - $10,000','3':'Between $10,001 - $30,000','4':'Between $30,001 - $50,000',
                                    '5':'Above $50,000' };        
        dict.rb_indhasdependents = { 'active':false, 'title':'Dependents', '1':'Yes', '0':'No' };
        
        dict.txt_numberincollege_ind = { 'active':false, 'title':'Number in College', 'value':'' };
        dict.rb_parentincome_ind = { 'active':false, 'title':'Household Income', '0':'Between $0 - $30,000', '1':'Between $30,001 - $40,000',
                                    '2':'Between $40,001 - $50,000','3':'Between $50,001 - $60,000','4':'Between $60,001 - $70,000',
                                    '5':'Above $70,000' };
        

        
       
        
        // Global Variables
        var npc1_financialaid = "";
        var npc1_age = "";
        var npc1_livingstatus = "";
        var npc1_isdefaultlivingstatus = "0";
        var npc1_residencystatus = "";
        var npc1_isdefaultresidencystatus = "0";
        var npc2_maritalstatus = "";
        var npc2_numberofchildren = "";
        var npc3_numberinfamily = "";
        var npc3_numberincollege = "";
        var npc3_parentincome = "";
        var npc3_applicantincome = "";
        // var npc4_numberinfamily = ""; // Not used anymore
        var npc4_indhasdependents = "";
        var npc4_numberincollege = "";
        var npc4_parentincome = "";
        var npc_step = "0";
        var currentstepid = "0";
        var previousstepid_1 = "";
        var previousstepid_2 = "";
        var previousstepid_3 = "";
        var previousstepid_4 = "";
        var previousstepid_5 = "";
        var previousstepid_6 = "";
        var numberoflivingstatus = 0;       
      
        

var arrDepStudentIncome = [];
arrDepStudentIncome[1] = 0;
arrDepStudentIncome[2] = 4;
arrDepStudentIncome[3] = 638;
arrDepStudentIncome[4] = 1873.1;
arrDepStudentIncome[5] = 5994;
arrDepStudentIncome[6] = 14750.5;

var arrDepStudentParentIncome = [];
arrDepStudentParentIncome[1] = 0;
arrDepStudentParentIncome[2] = 2136.96;
arrDepStudentParentIncome[3] = 4622.4;
arrDepStudentParentIncome[4] = 7094.4;
arrDepStudentParentIncome[5] = 13955.24;
arrDepStudentParentIncome[6] = 17557.32;
arrDepStudentParentIncome[7] = 21210.442;
arrDepStudentParentIncome[8] = 24665.6;
arrDepStudentParentIncome[9] = 38281.5;

var arrIndStudentIncomeWithDep = [];
arrIndStudentIncomeWithDep[1] = 24.36;
arrIndStudentIncomeWithDep[2] = 6466.44;
arrIndStudentIncomeWithDep[3] = 14094.53;
arrIndStudentIncomeWithDep[4] = 21919.59;
arrIndStudentIncomeWithDep[5] = 29775.94;
arrIndStudentIncomeWithDep[6] = 57121.48;

var arrIndStudentIncomeWithoutDep = [];
arrIndStudentIncomeWithoutDep[1] = 1158.1;
arrIndStudentIncomeWithoutDep[2] = 10888.9;
arrIndStudentIncomeWithoutDep[3] = 14625.9;
arrIndStudentIncomeWithoutDep[4] = 18880.8;
arrIndStudentIncomeWithoutDep[5] = 23128.6;
arrIndStudentIncomeWithoutDep[6] = 35430.4;
        
        // POA
        var POA_Total = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var POA_TRF = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var POA_BS = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var POA_RB = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];        
        var POA_O = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        
             
        // TGA
        var TGA_0 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_1_1000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_1001_2500 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_2501_5000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_5001_7500 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_7501_10000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_10001_12500 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_12501_15000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_15001_20000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_20001_30000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_30001_40000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_40000 = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        var TGA_NFAFSA = ['0', '0', '0', '0', '0', '0', '0', '0', '0'];
        POA_Total = ['31460','0','24510'];
POA_TRF = ['21080','0','21080'];
POA_BS = ['930','0','930'];
POA_RB = ['7100','0','0'];
POA_O = ['2350','0','2500'];
TGA_0 = ['17356','0','14731'];
TGA_1_1000 = ['17850','0','15023'];
TGA_1001_2500 = ['17181','0','15756'];
TGA_2501_5000 = ['15850','0','13925'];
TGA_5001_7500 = ['13750','0','8000'];
TGA_7501_10000 = ['12800','0','8000'];
TGA_10001_12500 = ['11200','0','8000'];
TGA_12501_15000 = ['10000','0','8000'];
TGA_15001_20000 = ['13000','0','8000'];
TGA_20001_30000 = ['14000','0','8000'];
TGA_30001_40000 = ['14000','0','8000'];
TGA_40000 = ['8500','0','9000'];
TGA_NFAFSA = ['10500','0','20730'];


        function HideAllSteps() {
            var dv_npc_s1_t = document.getElementById("dv_npc_s1_t");
            var dv_npc_s2_t = document.getElementById("dv_npc_s2_t");
            var dv_npc_s3_t = document.getElementById("dv_npc_s3_t");
            var dv_npc_s4_t = document.getElementById("dv_npc_s4_t");
            var dv_npc_s5_t = document.getElementById("dv_npc_s5_t");
            var dv_npc_s6_t = document.getElementById("dv_npc_s6_t");
            var dv_npc_s6_r = document.getElementById("dv_npc_s6_r");
            var dv_npc_s0 = document.getElementById("dv_npc_s0");
            var dv_npc_s1 = document.getElementById("dv_npc_s1");
            var dv_npc_s2 = document.getElementById("dv_npc_s2");
            var dv_npc_s3 = document.getElementById("dv_npc_s3");
            var dv_npc_s4 = document.getElementById("dv_npc_s4");
            var dv_npc_s5 = document.getElementById("dv_npc_s5");
            var dv_npc_s6 = document.getElementById("dv_npc_s6");
            if (dv_npc_s0 && dv_npc_s1_t && dv_npc_s2_t && dv_npc_s3_t && dv_npc_s4_t && dv_npc_s5_t && dv_npc_s1 && dv_npc_s2 && dv_npc_s3 && dv_npc_s4 && dv_npc_s5 && dv_npc_s6 && dv_npc_s6_r) {
                dv_npc_s1_t.style.display = "none";
                dv_npc_s2_t.style.display = "none";
                dv_npc_s3_t.style.display = "none";
                dv_npc_s4_t.style.display = "none";
                dv_npc_s5_t.style.display = "none";
                dv_npc_s6_t.style.display = "none";
                dv_npc_s6_r.style.display = "none";
                dv_npc_s0.style.display = "none";
                dv_npc_s1.style.display = "none";
                dv_npc_s2.style.display = "none";
                dv_npc_s3.style.display = "none";
                dv_npc_s4.style.display = "none";
                dv_npc_s5.style.display = "none";
                dv_npc_s6.style.display = "none";
                dv_npc_s6_r.style.display = "none";
            }
        }
        
        // function executes when user clicks 'Modify' button        
        function ClearVars() {
            // clear variables
            npc1_financialaid = "";
            npc1_age = "";
            npc1_livingstatus = "";
            npc1_isdefaultlivingstatus = "0";
            npc1_residencystatus = "";
            npc1_isdefaultresidencystatus = "0";
            npc2_maritalstatus = "";
            npc2_numberofchildren = "";
            npc3_numberinfamily = "";
            npc3_numberincollege = "";
            npc3_parentincome = "";
            npc3_applicantincome = "";
            npc4_numberinfamily = "";
            npc4_indhasdependents = "";            
            npc4_numberincollege = "";
            npc4_parentincome = "";            
            npc_step = "0";
            currentstepid = "0";
            
            // set active=false to 'dict' variable
            for(propertyName in dict) {
                if(typeof(dict[propertyName]) !== 'function') {
                    dict[propertyName].active = false;
                }
            }
            
            
            // setup initial constants
            SetupConstants();            
        }
       
        function ResetSpan(s) {
            if (s) {
                var sid = document.getElementById(s);
                if (sid) {
                    sid.innerHTML = "";
                }
            }
        }

        function ResetRadioButton(rb) {
            if (rb) {
                var n = document.getElementsByName(rb);
                if (n) {
                    for (var i = 0; i < n.length; i++) {
                        n[i].checked = false;
                    }
                }
            }
        }

        function ResetTextBox(t) {
            if (t) {
                var txt = document.getElementById(t);
                if (txt) {
                    txt.value = "";
                }
            }
        }

        function GetRadioButtonValues(rb) {
            if (rb) {
                var n = document.getElementsByName(rb);
                if (n) {
                    for (var i = 0; i < n.length; i++) {
                        if (n[i].checked) {
                            return {label:n[i],value:n[i].value};
                        }
                    }
                }
            }
            return {value:"",label:""};
        }

        function GetTextBoxValue(t) {
            if (t) {
                var txt = document.getElementById(t);
                if (txt) {
                    return txt.value;
                }
            }
        }

        function ResetForm() {
            // 1
            ResetRadioButton("rb_financialaid");
            ResetTextBox("txt_age");
            ResetRadioButton("rb_livingstatus");
            ResetRadioButton("rb_residencystatus");
            // 2
            ResetRadioButton("rb_maritalstatus");
            ResetRadioButton("rb_numberofchildren");
            // 3
            ResetTextBox("txt_numberinfamily_dep");
            ResetTextBox("txt_numberincollege_dep");
            ResetRadioButton("rb_parentincome_dep");
            ResetRadioButton("rb_applicantincome_dep");
            // 4
            ResetRadioButton("rb_indhasdependents");
            ResetTextBox("txt_numberinfamily_ind");
            ResetTextBox("txt_numberincollege_ind");
            ResetRadioButton("rb_parentincome_ind");
            // 5
            
            // 6
            ResetSpan("s_step6_body");
        }

        function ResetAllPreviousStepIds() {
            previousstepid_1 = "";
            previousstepid_2 = "";
            previousstepid_3 = "";
            previousstepid_4 = "";
            previousstepid_5 = "";
            previousstepid_6 = "";
        }

        function StartOver() {
            ResetForm();
            ResetAllPreviousStepIds();
            GoTo("0");
        }
        
        function IsInteger(sText)
        {
            var ValidChars = "0123456789";
            var IsNumber = true;
            var Char;

            for (i = 0; i < sText.length && IsNumber == true; i++) {
                Char = sText.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    IsNumber = false;
                }
            }
            return IsNumber;
        }

        function IsNumeric(sText) {
            var ValidChars = "0123456789.";
            var IsNumber = true;
            var Char;

            for (i = 0; i < sText.length && IsNumber == true; i++) {
                Char = sText.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    IsNumber = false;
                }
            }
            return IsNumber;
        }

        // Step id Defenition
        // 1 Age, Living Status, Residency Status
        // 2 Marital Status, Number of Children
        // 3 Dependent
        // 4 Independent
        // 6 Summary page
        // 5 OUTPUT PAGE        
        function GoNext() {
            if (currentstepid) {
                if (currentstepid == "0") {
                    // Reset
                    ResetAllPreviousStepIds();
                    // Rules
                    GoTo("1");
                    return;
                } else if (currentstepid == "1") {
                    // Financial Aid
                    npc1_financialaid = GetRadioButtonValues("rb_financialaid").value;
                    // Age
                    npc1_age = GetTextBoxValue("txt_age");
                    // Living Status
                    if (npc1_livingstatus != "-1") {
                        if (npc1_isdefaultlivingstatus == "0") {
                            npc1_livingstatus = GetRadioButtonValues("rb_livingstatus").value;
                        }
                    }
                    // Residency Status
                    if (npc1_residencystatus != "-1") {
                        if (npc1_isdefaultresidencystatus == "0") {
                            npc1_residencystatus = GetRadioButtonValues("rb_residencystatus").value;
                        }
                    }
                    // Validate
                    if (npc1_financialaid == "" || npc1_age == "" || npc1_livingstatus == "" || npc1_residencystatus == "") {
                        alert("Please answer all questions before proceeding.");
                        return;
                    }
                    if (!IsInteger(npc1_age)) {
                        alert("Please enter integers only.");
                        return;
                    }
                    
                    // Save entered values into dictionary
                    dict['rb_financialaid'].active = true;
                    dict['txt_age'].active = true;
                    dict['txt_age'].value = npc1_age;
                    if (npc1_livingstatus != "-1") {
                        if (npc1_isdefaultlivingstatus == "0") {
                            dict['rb_livingstatus'].active = true;
                            dict['rb_livingstatus']['value'] = GetRadioButtonValues("rb_livingstatus").label.getAttribute('title');
                            
                        }
                    }
                    if (npc1_residencystatus != "-1") {
                        if (npc1_isdefaultresidencystatus == "0") {
                            dict['rb_residencystatus'].active = true;
                            dict['rb_residencystatus']['value'] = GetRadioButtonValues("rb_residencystatus").label.getAttribute('title');
                        }
                    }
                    
                    // Rules
                    if (npc1_financialaid == "1") {
                        //GenerateReport(); // Generate report on step 6
                        GoTo("5");
                    } else if (npc1_age * 1 > 23) {
                        GoTo("4");
                    } else {
                        GoTo("2");
                    }
                    return;
                } else if (currentstepid == "2") {
                    // Marital Status
                    npc2_maritalstatus = GetRadioButtonValues("rb_maritalstatus").value;
                    // Number of Children
                    npc2_numberofchildren = GetRadioButtonValues("rb_numberofchildren").value;
                    // Validate
                    if (npc2_maritalstatus == "" || npc2_numberofchildren == "") {
                        alert("Please answer all questions before proceeding.");
                        return;
                    }
                    if (!IsInteger(npc2_numberofchildren)) {
                        alert("Please enter integers only.");
                        return;
                    }
                    
                    // Save entered values into dictionary
                    dict['rb_maritalstatus'].active = true;
                    dict['rb_numberofchildren'].active = true;
                    
                    // Rules
                    if (npc2_maritalstatus == "1") {
                        GoTo("4");
                    } else if (npc2_numberofchildren * 1 > 0) {
                        GoTo("4");
                    } else {
                        GoTo("3");
                    }
                    return;
                } else if (currentstepid == "3") {
                    // Number in Family
                    npc3_numberinfamily = GetTextBoxValue("txt_numberinfamily_dep");
                    // Number in College
                    npc3_numberincollege = GetTextBoxValue("txt_numberincollege_dep");
                    // Parent Income
                    npc3_parentincome = GetRadioButtonValues("rb_parentincome_dep").value;
                    // Applicant Income
                    npc3_applicantincome = GetRadioButtonValues("rb_applicantincome_dep").value;
                    // Validate
                    if (npc3_numberinfamily == "" || npc3_numberincollege == "" || npc3_parentincome == "" || npc3_applicantincome == "") {
                        alert("Please answer all questions before proceeding.");
                        return;
                    }
                    if (!IsInteger(npc3_numberinfamily) || !IsInteger(npc3_numberincollege)) {
                        alert("Please enter integers only.");
                        return;
                    }
                    if (npc3_numberincollege * 1 <= 0 || !IsInteger(npc3_numberincollege)) {
                        alert("Please enter a numeric value greater than zero for Number in College.");
                        return;
                    }
                    if (npc3_numberincollege*1 >= npc3_numberinfamily*1) {
                        //alert("The value entered for Number in College should not exceed the Number in Family.");
                        alert("The value entered for Number in College should be at least one less than the Number in Family.");
                        return;
                    }
                    
                    // Save entered values into dictionary
                    dict['txt_numberinfamily_dep'].active = true;
                    dict['txt_numberinfamily_dep'].value = npc3_numberinfamily;
                    dict['txt_numberincollege_dep'].active = true;
                    dict['txt_numberincollege_dep'].value = npc3_numberincollege;
                    dict['rb_parentincome_dep'].active = true;
                    dict['rb_applicantincome_dep'].active = true;
                    
                    // Rules
                    // GenerateReport(); // generate report on step 6
                    GoTo("5");
                    return;
                } else if (currentstepid == "4") {
                    // Dependents
                    npc4_indhasdependents = GetRadioButtonValues('rb_indhasdependents').value;                   
                    
                    // Number in College
                    npc4_numberincollege = GetTextBoxValue("txt_numberincollege_ind");
                    if (!IsInteger(npc4_numberincollege)) {
                        alert("Please enter integers only.");
                        return;
                    }
                    
                    // Parent Income
                    npc4_parentincome = GetRadioButtonValues("rb_parentincome_ind").value;
                    // Validate
                    if (npc4_indhasdependents == "" || npc4_numberincollege == "" || npc4_parentincome == "") {
                        alert("Please answer all questions before proceeding.");
                        return;
                    }                                        
                    if (npc4_numberincollege*1 <= 0) {
                        alert("Please enter a numeric value greater than zero for Number in College.");
                        return;
                    }                    
                    
                    // Save entered values into dictionary
                    dict['rb_indhasdependents'].active = true;                    
                    dict['txt_numberincollege_ind'].active = true;
                    dict['txt_numberincollege_ind'].value = npc4_numberincollege;
                    dict['rb_parentincome_ind'].active = true;
                    
                    // Rules
                    //GenerateReport(); // generate report on step 6
                    GoTo("5");
                    return;
                }
                else if(currentstepid == "5")
                {
                    GenerateReport(); // generate report on step 6
                    GoTo("6");
                }
            }
        }

        function GenerateReport() {
            var efc = 0;
            if (npc1_financialaid * 1 == 0) {
                //efc = CalculateEFC();
                efc = GetEFC();
            }
            var lookup_column = "-1";
            if (npc1_livingstatus == "-1") {
                lookup_column = npc1_livingstatus;
            } else {
                var res_status = 0;
                if (npc1_residencystatus != "-1") {
                    res_status = npc1_residencystatus;
                }
                lookup_column = numberoflivingstatus * 1 * res_status * 1 + npc1_livingstatus * 1;
            }
            
            if (lookup_column == "-1") {
                return;
            }
            
            var s_etpoa = document.getElementById("s_etpoa");
            var s_etf = document.getElementById("s_etf");
            var s_erb = document.getElementById("s_erb");
            var s_ebs = document.getElementById("s_ebs");
            var s_eo = document.getElementById("s_eo");
            var s_etga = document.getElementById("s_etga");
            var s_enp = document.getElementById("s_enp");
            var x = 0;
            var y = 0;
            
            if (s_etpoa) {
                x = POA_Total[lookup_column];
                s_etpoa.innerHTML = formatCurrency(x);
            }
            if (s_etf) {
                s_etf.innerHTML = formatCurrency(POA_TRF[lookup_column]);
            }
            if (s_erb) {
                s_erb.innerHTML = formatCurrency(POA_RB[lookup_column]);
            }
            if (s_ebs) {
                s_ebs.innerHTML = formatCurrency(POA_BS[lookup_column]);
            }
            if (s_eo) {
                s_eo.innerHTML = formatCurrency(POA_O[lookup_column]);
            }
            if (s_etga) {
                if (npc1_financialaid * 1 == 1) {
                    // NON-FAFSA
                    y = TGA_NFAFSA[lookup_column];
                }  else if (efc * 1 == 0) {
                    y = TGA_0[lookup_column];
                } else if (efc * 1 >= 1 && efc * 1 <= 1000) {
                    y = TGA_1_1000[lookup_column];
                } else if (efc * 1001 >= 1 && efc * 1 <= 2500) {
                    y = TGA_1001_2500[lookup_column];
                } else if (efc * 2501 >= 1 && efc * 1 <= 5000) {
                    y = TGA_2501_5000[lookup_column];
                } else if (efc * 1 >= 5001 && efc * 1 <= 7500) {
                    y = TGA_5001_7500[lookup_column];
                } else if (efc * 1 >= 7501 && efc * 1 <= 10000) {
                    y = TGA_7501_10000[lookup_column];
                } else if (efc * 1 >= 10001 && efc * 1 <= 12500) {
                    y = TGA_10001_12500[lookup_column];
                } else if (efc * 1 >= 12501 && efc * 1 <= 15000) {
                    y = TGA_12501_15000[lookup_column];
                } else if (efc * 1 >= 15001 && efc * 1 <= 20000) {
                    y = TGA_15001_20000[lookup_column];
                } else if (efc * 1 >= 20001 && efc * 1 <= 30000) {
                    y = TGA_20001_30000[lookup_column];
                } else if (efc * 1 >= 30001 && efc * 1 <= 40000) {
                    y = TGA_30001_40000[lookup_column];
                } else if (efc * 1 >= 40001) {
                    y = TGA_40000[lookup_column];
                }
                s_etga.innerHTML = formatCurrency(y);
            }
            if (s_enp) {
                var z = x * 1 - y * 1;
                s_enp.innerHTML = formatCurrency(z);
            }
            
        }
        
        
        // Get EFC 
        function GetEFC() 
        {
            var returnValue = 0;
            
            // If student is dependent
            if(npc1_age*1<=23 && npc2_maritalstatus == "0" && npc2_numberofchildren * 1 == 0) {            
                var parentIncomeIndex = GetRadioButtonValues('rb_parentincome_dep')['value'];
                parentIncomeIndex = (parentIncomeIndex * 1)+1;
                var studentIncomeIndex = GetRadioButtonValues('rb_applicantincome_dep')['value'];
                studentIncomeIndex = (studentIncomeIndex * 1)+1;
                
                var parentContr = arrDepStudentParentIncome[parentIncomeIndex];
                var studentContr = arrDepStudentIncome[studentIncomeIndex];
                // get number of persons in college
                var numberOfStudentInCollege = GetTextBoxValue('txt_numberincollege_dep')*1;
                
                returnValue = parentContr/numberOfStudentInCollege + studentContr;                
            }
            else {
                var hasDependent  = GetRadioButtonValues('rb_indhasdependents')['value'];
                var studentIncomeIndex = GetRadioButtonValues('rb_parentincome_ind')['value'];
                var numberInCollege = GetTextBoxValue('txt_numberincollege_ind')*1;
                studentIncomeIndex = (studentIncomeIndex * 1)+1;
                var studentContr = 0;                
                if(hasDependent == '1') {                
                    // With children
                    studentContr =   arrIndStudentIncomeWithDep[studentIncomeIndex];
                }
                else {
                    // Without children
                    studentContr = arrIndStudentIncomeWithoutDep[studentIncomeIndex];
                }                
                returnValue = studentContr/numberInCollege;
            }
            
            return returnValue;
        }       
        
        
        // Generate summary table with user's input
        function GenerateSummary() {
            
            var html = '<table border=\'0\' cellpadding=\'2\' cellspacing=\'0\' style=\'width:100%;\'>';
            
            // Step 1
            if(dict['rb_financialaid'].active == true) {
                html = html + '<tr><td class=\'boldtd\'>'+dict['rb_financialaid'].title+'</td><td>' + dict['rb_financialaid'][npc1_financialaid]+'</td></tr>';
            }
            if(dict['txt_age'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['txt_age'].title+'</td><td>'+dict['txt_age'].value+'</td></tr>';
            }
            if(dict['rb_livingstatus'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_livingstatus'].title+'</td><td>'+dict['rb_livingstatus']['value']+'</td></tr>';
            }
            if(dict['rb_residencystatus'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_residencystatus'].title+'</td><td>'+dict['rb_residencystatus']['value']+'</td></tr>';
            }
            
            // Step 2
            if(dict['rb_maritalstatus'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_maritalstatus'].title+'</td><td>'+dict['rb_maritalstatus'][npc2_maritalstatus]+'</td></tr>';
            }
            if(dict['rb_numberofchildren'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_numberofchildren'].title+'</td><td>'+dict['rb_numberofchildren'][npc2_numberofchildren]+'</td></tr>';
            }
            
            // Step 3
            if(dict['txt_numberinfamily_dep'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['txt_numberinfamily_dep'].title+'</td><td>'+dict['txt_numberinfamily_dep'].value+'</td></tr>';
            }
            if(dict['txt_numberincollege_dep'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['txt_numberincollege_dep'].title+'</td><td>'+dict['txt_numberincollege_dep'].value+'</td></tr>';
            }
            if(dict['rb_parentincome_dep'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_parentincome_dep'].title+'</td><td>'+dict['rb_parentincome_dep'][npc3_parentincome]+'</td></tr>';
            }
            if(dict['rb_applicantincome_dep'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_applicantincome_dep'].title+'</td><td>'+dict['rb_applicantincome_dep'][npc3_applicantincome]+'</td></tr>';
            }
            
            // Step 4
            if(dict['rb_indhasdependents'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_indhasdependents'].title+'</td><td>'+dict['rb_indhasdependents'][npc4_indhasdependents]+'</td></tr>';
            }
            if(dict['txt_numberincollege_ind'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['txt_numberincollege_ind'].title+'</td><td>'+dict['txt_numberincollege_ind'].value+'</td></tr>';
            }
            if(dict['rb_parentincome_ind'].active == true) {
                html = html +'<tr><td class=\'boldtd\'>'+dict['rb_parentincome_ind'].title+'</td><td>'+dict['rb_parentincome_ind'][npc4_parentincome]+'</td></tr>';
            }
            
            
            
            var dv_summary = document.getElementById('dv_summary');
            dv_summary.innerHTML = html +  '</table>';
        }

        function GoPrevious() {
            if (currentstepid == "1") {
                GoTo(previousstepid_1);
            } else if (currentstepid == "2") {
                GoTo(previousstepid_2);
            } else if (currentstepid == "3") {
                GoTo(previousstepid_3);
            } else if (currentstepid == "4") {
                GoTo(previousstepid_4);
            } else if (currentstepid == "5") {
                GoTo(previousstepid_5);            
            } else if (currentstepid == "6") {
                GoTo(previousstepid_6);
            }
            return;
        }
        
        function GoTo(stepid) {
            if (stepid) {
                var dvid = document.getElementById('dv_npc_s' + stepid);
                var titleid = document.getElementById('dv_npc_s' + stepid + '_t');
                var stepnumber = document.getElementById("s_step" + stepid);
                var dv_npc_s6_r = document.getElementById("dv_npc_s"+stepid+"_r");
                
                if ((dvid && titleid && stepnumber) || (dvid && stepid=="0")) {
                    // Handle Step Number
                    if (stepid == "0") {                      // Going Back to Step #0  
                        npc_step = "0";
                    }
                    else if (stepid * 1 > currentstepid) {    // next
                        npc_step = npc_step * 1 + 1;
                    } else {                                  // previous
                        npc_step = npc_step * 1 - 1;
                    }

                    // Update Step Number
                    if (stepid != "0") {
                        stepnumber.innerHTML = npc_step;
                    }

                    // Show/Hide Step - Change Step
                    HideAllSteps();
                    dvid.style.display = "block";                    
                    if (stepid != "0") {
                        titleid.style.display = "block";
                    }
                    if(stepid == "5") {
                        GenerateSummary();
                    }
                    if (stepid == "6") {
                        dv_npc_s6_r.style.display = "block";
                        var s_step6_h1 = document.getElementById("s_step6_h1");
                        var s_step6_h2 = document.getElementById("s_step6_h2");
                        if (s_step6_h1 && s_step6_h2) {
                            if (npc1_financialaid * 1 == 0) {
                                s_step6_h1.style.display = "block";
                                s_step6_h2.style.display = "none";
                            } else {
                                s_step6_h1.style.display = "none";
                                s_step6_h2.style.display = "block";
                            }
                        }
                    }
                    
                    // Update currentstepid
                    UpdatePreviousStepId(stepid);
                    currentstepid = stepid;
                }
            }
        }

        function UpdatePreviousStepId(cid) {
            // No Previous Id for Step Id #0
            if (cid == "1") {
                if ((previousstepid_1 == "") || (currentstepid * 1 < previousstepid_1 * 1)) {
                    previousstepid_1 = currentstepid;
                }
            }
            else if (cid == "2") {
                if ((previousstepid_2 == "") || (currentstepid * 1 < previousstepid_2 * 1)) {
                    previousstepid_2 = currentstepid;
                }
            } else if (cid == "3") {
                if ((previousstepid_3 == "") || (currentstepid * 1 < previousstepid_3 * 1)) {
                    previousstepid_3 = currentstepid;
                }
            } else if (cid == "4") {
                if ((previousstepid_4 == "") || (currentstepid * 1 < previousstepid_4 * 1)) {
                    previousstepid_4 = currentstepid;
                }
            } else if (cid == "5") {
                if ((previousstepid_5 == "") || (currentstepid * 1 < previousstepid_5 * 1)) {
                    previousstepid_5 = currentstepid;
                }
            }
            else if (cid == "6") {
                if ((previousstepid_6 == "") || (currentstepid * 1 < previousstepid_6 * 1)) {
                    previousstepid_6 = currentstepid;
                }
            }
        }

        function formatCurrency(num) {
            num = num.toString().replace(/\$|\,/g, '');
            if (isNaN(num))
                num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num * 100 + 0.50000000001);
            cents = num % 100;
            num = Math.floor(num / 100).toString();
            if (cents < 10)
                cents = "0" + cents;
            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
                num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
            return (((sign) ? '' : '-') + '$' + num ); //+ '.' + cents
        }

        function HideTag(ptr) {
            if (ptr) {
                var ptrHandle = document.getElementById(ptr);
                if (ptrHandle) {
                    ptrHandle.style.display = "none";
                }
            }
        }

        function ShowTag(ptr) {
            if (ptr) {
                var ptrHandle = document.getElementById(ptr);
                if (ptrHandle) {
                    ptrHandle.style.display = "block";
                }
            }
        }
