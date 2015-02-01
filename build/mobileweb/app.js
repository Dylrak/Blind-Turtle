//Check if this is the first time this app is run.
if (Ti.App.Properties.getString("School") == null || Ti.App.Properties.getString("Class") == null) {
	//Create Window
	var firstwindow = Ti.UI.createWindow({
		title:"Beginscherm",
		backgroundColor:"#fff"
	});
	
	//Create View
	var firstview = Ti.UI.createView();
	
	//Create Text
	var text = Ti.UI.createView({
		text:"Welkom bij de PJ Info-app. Vul alstublieft uw klas en school in.",
		height:40,
		width:Ti.UI.FILL
	});
	
	//Add Text to View
	firstwindow.add(text);
	
	//Create image for dropdown
	var img = Ti.UI.createImageView({
	    image : "1downarrow.png",
	    height : 20,
	    width  :20,
	    right : 0
	});
	firstwindow.open();
	//Create label for selected item
	var selectedItem = Ti.UI.createLabel({
	    text : "",
	    width : 80,
	    height : 35,
	    top : 0
	});
	 
	//Create dropdown view
	var viewMenu = Ti.UI.createView({
	    borderWidth : 1,
	    borderColor : "blue",
	    height : 35,
	    width : 100,
	    top : 50
	});
	viewMenu.addEventListener('click',function(e){
	    viewContainer.show();
	});
	 
	viewMenu.add(img);
	viewMenu.add(selectedItem);
	
	//Create list of schools
	var options = ["!mpulse","!mpulse Kollum","Dalton Dokkum", "De Brêge","De Dyk","De Foorakker","ISK","Leeuwarder Lyceum","Montessori High School","Stedelijk Gymnasium","YnSicht"];
	
	//Create viewContainer for schools
	var viewContainer = Ti.UI.createScrollView({
	    height : 150,
	    width : 100,
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
	        width : 100
	    });
	    item.addEventListener('click',function(e){
	        viewMenu.children[1].text=this.text;
	        viewContainer.hide();
	    });
	    viewContainer.add(item);
	}
	
	//Add Views to Window
	firstwindow.add(viewMenu);
	firstwindow.add(viewContainer);
	firstwindow.add(firstview);
}