         jQuery.expr[":"].containsNoCase = function(el, i, m) {
             var search = m[3];
             if (!search) return false;
             return eval("/" + search + "/i").test($(el).text());
         };
  
         jQuery(document).ready(function() {
             // used for the first example in the blog post
             jQuery('li:contains(\'DotNetNuke\')').css('color', '#0000ff').css('font-weight', 'bold');
  
             // hide the cancel search image
             jQuery('#imgSearch').hide();
  
             // reset the search when the cancel image is clicked
             jQuery('#imgSearch').click(function() {
                 resetSearch();
             });
  
             // cancel the search if the user presses the ESC key
             jQuery('#txtSearch').keyup(function(event) {
                 if (event.keyCode == 27) {
                     resetSearch();
                 }
             });
  
             // execute the search
             jQuery('#txtSearch').keyup(function() {
                 // only search when there are 3 or more characters in the textbox
                 if (jQuery('#txtSearch').val().length > 2) {
                     // hide all rows
                     jQuery('#tblSearch tr').hide();
                     // show the header row
                     jQuery('#tblSearch tr:first').show();
                     // show the matching rows (using the containsNoCase from Rick Strahl)
                     jQuery('#tblSearch tr td:containsNoCase(\'' + jQuery('#txtSearch').val() + '\')').parent().show();
                     // show the cancel search image
                     jQuery('#imgSearch').show();
                 }
                 else if (jQuery('#txtSearch').val().length == 0) {
                     // if the user removed all of the text, reset the search
                     resetSearch();
                 }
  
                 // if there were no matching rows, tell the user
                 if (jQuery('#tblSearch tr:visible').length == 1) {
                     // remove the norecords row if it already exists
                     jQuery('.norecords').remove();
                     // add the norecords row
                     jQuery('#tblSearch').append('<tr class="norecords"><td colspan="5" class="Normal">No records were found</td></tr>');
                 }
             });
         });
  
         function resetSearch() {
             // clear the textbox
             jQuery('#txtSearch').val('');
             // show all table rows
             jQuery('#tblSearch tr').show();
             // remove any no records rows
             jQuery('.norecords').remove();
             // remove the cancel search image
             jQuery('#imgSearch').hide();
             // make sure we re-focus on the textbox for usability
             jQuery('#txtSearch').focus();
         }
