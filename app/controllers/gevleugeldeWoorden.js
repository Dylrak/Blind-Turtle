// called when the button gevleugeldeWoorden in views/index.xml is clicked
// creates and opens an email dialog
// CAVEATS:
//	-will only open when there is an email account registered with the device
//	-email address must be corrected before distribution

function doclick(e){
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.subject = "Gevleugelde Woorden; via Blind Turtle";
	emailDialog.toRecipients = ['mennohellinga@zoho.com']; //PLEASE CHANGE BEFORE DISTRIB!
	emailDialog.open();
}
