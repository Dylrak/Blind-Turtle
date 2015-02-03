/////////////////////////////////SETTINGS///////////////////////////
	//Create window
	var settings = Ti.UI.createWindow({
		title:"Instellingen",
		backgroundColor:"#fff"
	});
	
	//Create textfield
	var textField = Ti.UI.createTextField({
  		width: 200,
  		height: 30
	});
	
	//Create image for dropdown
	var img = Ti.UI.createImageView({
	    image : "1downarrow.png",
	    height : 20,
	    width  :20,
	    right : 0
	});
	//Create label for selected item
	var selectedItem = Ti.UI.createLabel({
	    text : "Kies uw school…",
	    width : 180,
	    height : 35,
	    top : 0
	});
	 
	//Create view for dropdown bar
	var viewMenu = Ti.UI.createView({
	    borderWidth : 1,
	    borderColor : "blue",
	    height : 35,
	    width : 200,
	    top : 50
	});
	viewMenu.addEventListener('click',function(e){
	    viewContainer.show();
	});
	 
	viewMenu.add(img);
	viewMenu.add(selectedItem);
	
	//Create list of schools
	var options = 
	["!mpulse",
	"!mpulse Kollum",
	"Dalton Dokkum", 
	"De Brêge",
	"De Dyk",
	"De Foorakker",
	"ISK",
	"Leeuwarder Lyceum",
	"Montessori High School",
	"Stedelijk Gymnasium",
	"YnSicht"];
	
	//Create viewContainer for schools
	var viewContainer = Ti.UI.createScrollView({
	    height : 150,
	    width : 200,
	    contentHeight : "auto",
	    contentWidth : Ti.UI.SIZE,
	    top : 51+35,
	    visible : false,
	    borderColor : "gray",
	    layout : "vertical",
	});
	
	//Create labels from options
	for (i=0;i<options.length;i++){
	    var item = Ti.UI.createLabel({
	        text : options[i],
	        height : 20,
	        width : 200
	    });
	    item.addEventListener('click',function(e){
	        viewMenu.children[1].text=this.text;
	        viewContainer.hide();
	        Ti.App.Properties.setString("School")=this.text;
	    });
	    viewContainer.add(item);
	}
	
	//Add Views to Window
	settings.add(textField);
	settings.add(viewMenu);
	settings.add(viewContainer);

/////////////////////////////////SETTINGS///////////////////////////

//Check if this is the first time this app is run.
if (Ti.App.Properties.getString("School") == null || Ti.App.Properties.getString("Class") == null) {
	settings.open();
} else {
	settings.open();
}
