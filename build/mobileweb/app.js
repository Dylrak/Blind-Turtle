

//Create Window
var firstwindow = Ti.UI.createWindow({
	title:"Beginscherm",
	backgroundColor:"#fff"
});

//Create View
var firstview = Ti.UI.createView();

//Create Text
var text = Ti.UI.createView({
	text:"Welkom bij de PJ Info-app. Vul alstublieft uw leerlingnummer en school in.",
	height:40,
	width:Ti.UI.FILL
});

//Add Text to View
firstwindow.add(text);

//Add View to Window
firstwindow.add(firstview);

//Check if this is the first time this app is run.
if (Ti.App.Properties.getString("School") == null || Ti.App.Properties.getString("Student") == null) {
	firstwindow.open();
}