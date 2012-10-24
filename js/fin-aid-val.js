$().ready(function(){
	$("#financialAidCalc_form").submit(function(){
			student_type = $("#student_type").val();
			student_gpa = $("#student_gpa").val();
			student_act = $("#student_act").val();
			
			$(this).ajaxSubmit({
					beforeSubmit: function(){},
					success: function(data) {
							$("#amountTotal").html(data);
							
							//$("#fm_Student_Type").val(student_type);
							//$("#fm_Student_GPA").val(student_gpa);
							//$("#fm_Student_ACT").val(student_act);
							//$("#fm_Calculated_Aid_Amount").val(data);
							$("#form_24 #element_11").val(student_type);
							$("#form_24 #element_14").val(student_gpa);
							$("#form_24 #element_13").val(student_act);
							$("#form_24 #element_10").val(data);
					}
			});
			return false;
	});
	
	$("#financialAidCalc_form").submit() ;
	
	$("select[name=student_type]").change(function() {
		if ($(this).val() == 'transfer_resident' || $(this).val() == 'transfer_commuter') {
		//alert('it works');
		$("#student_act").attr("disabled", "disabled");
		} else {
		$("#student_act").removeAttr("disabled");
		}
	});
	$("button").click(function () {
		$("#financialAidCalcContact").show("slow");
	});
});
