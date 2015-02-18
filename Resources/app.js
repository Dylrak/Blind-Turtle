// Creates a tab group
var tabGroup = Titanium.UI.createTabGroup();

// Creates a window
var win1 = Titanium.UI.createWindow({  
    title:'Roosterwijzigingen'
});

// Creates a tab for the window
var tab1 = Titanium.UI.createTab({
    title:'Roosterwijzigingen',
    window:win1
});

// Creates a webview for the window
var webview1 = Titanium.UI.createWebView({
	url:'http://www3.pj.nl/gym_info_leerlingen/'
});

// Adds the webview to the window
win1.add(webview1);

// The process mentioned above is repeated for the other two tabs
var win2 = Titanium.UI.createWindow({  
    title:'Mededelingen'
});

var tab2 = Titanium.UI.createTab({
    title:'Mededelingen',
    window:win2
});

var webview2 = Titanium.UI.createWebView({
	url:'http://www3.pj.nl/infoschermgymnasium/'
});

win2.add(webview2);

var win3 = Titanium.UI.createWindow({  
    title:'Stentor',
    backgroundColor: '#fff',
    color: '#000'
});

var tab3 = Titanium.UI.createTab({
    title:'Stentor',
    window:win3
});

// Creates a button
var button = Ti.UI.createButton({
	title:'Gevleugeld Woord insturen',
	height:70,
	width:170,
	backgroundColor: '#e20177',
	color: '#fff'
});

// Adds an event listener to the button that opens an email dialog when the button is clicked/tapped
button.addEventListener('click',function(e)
{
   	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.subject = "Gevleugeld Woord via de PJ Info-app";
	emailDialog.toRecipients = ['mennohellinga@zoho.com'];
	emailDialog.open();
});

// Adds the button to the window
win3.add(button);

// Adds the tabs to the tab group
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);

// Opens the tab group
tabGroup.open();