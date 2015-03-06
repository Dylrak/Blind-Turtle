function getHTML(URL) {
var client = Ti.Network.createHTTPClient({
	onload: function(){
		Ti.API.info("Received HTML!");
	        Return; this.responseText;
	},
	onerror: function(e){
		Ti.API.debug(e.error);
		alert('Internetverbinding mislukt. Probeer het later opnieuw.');
	},
	timeout : 5000
});
client.open("GET", URL);
client.send();
}

function loadschedule(){
	var subst = 1;
	var tables = [];
	// EDIT THIS!
	var schoollink = 'gym';
	var link = 'http://www3.pj.nl/' + schoollink + '_info_leerlingen/subst_00';
	while (1) {
		parselink = link + subst + '.htm';
		var html = getHTML(parselink);
		var paginas = html.match(/Pagina (\d) \/ (\d)/);
		if ((paginas[1]!== null && paginas[1] <= paginas[2]) || subst == 1){
			tables = tables.concat(html.match(/(<tr.*<\/tr>)/mg));
			subst = subst + 1;
		} 
		if (paginas[1] == paginas[2]){
			break;
		}
	}
	var dschedule = Titanium.Filesystem.getFile('schedulechanges.html');
	var template = Titanium.Filesystem.getFile('schedulechangestemplate.html');
	dschedule.write(template.read() + tables + '</center></body></html>');
}

var win = Titanium.UI.createWindow({
	backgroundColor: 'white',
	exitOnClose: true
});

var mainview = Titanium.UI.createView({
	height:'81%',
	top:'10%'
});

win.add(mainview);

// Enable when function works
// loadschedule();

var webview1 = Titanium.UI.createWebView({
	// Change to url:'schedulechanges.html' when function works
	url:'http://www3.pj.nl/gym_info_leerlingen/'
});

var webview1EventListener = function(){
	webview1.reload();
};
	
mainview.add(webview1);

var webview2 = Titanium.UI.createWebView({
	url:'http://www3.pj.nl/infoschermgymnasium/'
});

var webview2EventListener = function(){
	webview2.reload();
};

var actionbar = Titanium.UI.createView({
	backgroundColor:'#dc006d',
	top:0,
	height:'10%'
});

var titlelabel = Titanium.UI.createLabel({
	text:'PJ Info',
	textAlign:'Titanium.UI.TEXT_ALIGNMENT_CENTER',
	color:'#fff',
	font:{fontSize:24}
});

actionbar.add(titlelabel);

var settingsbutton = Titanium.UI.createImageView({
	image:'settings.png',
	height:'80%',
	left:'3%'
});

var settingsactionbar = Titanium.UI.createView({
	backgroundColor:'#dc006d',
	top:0,
	height:'10%'
});

settingsbutton.addEventListener('click',function(){
	var settingswin = Titanium.UI.createWindow({
		backgroundColor:'#fff'
	});
	
	var backbutton = Titanium.UI.createImageView({
		image:'back.png',
		height:'80%',
		left:'3%'
	});
	
	backbutton.addEventListener('click',function(e){
		settingswin.close();
	});
	
	settingsactionbar.add(backbutton);
	
	var titlelabel = Titanium.UI.createLabel({
		text:'Instellingen',
		textAlign:'Titanium.UI.TEXT_ALIGNMENT_CENTER',
		color:'#fff',
		font:{fontSize:24}
	});
		
	var setschoolbutton = Titanium.UI.createButton({
		title:'Kies je school...',
		top:'35%',
		height:60,
		width:150,
		borderWidth:2,
		borderColor:'#003c6d',
		backgroundColor:'#fff',
		color:'#003c6d'
	});
	
	var schools = ['!mpulse', '!mpulse Kollum', 'Dalton Dokkum', 'De Brêge', 'De Dyk', 'De Foorakker',
	'ISK', 'Leeuwarder Lyceum', 'Montessori High School', 'Stedelijk Gymnasium', 'YnSicht'];
	
	setschoolbutton.addEventListener('click',function(){
		var schooloptions = {
		title:'School selecteren',
		options:schools
		};
		var setschool = Ti.UI.createOptionDialog(schooloptions);
		setschool.show();
		setschool.addEventListener('click', onSelectOptionDialog);
		function onSelectOptionDialog(event){
		    var selectedIndex = event.source.selectedIndex;
		    if (schools[selectedIndex] != null) {
		    	settingswin.remove(setschoolbutton);
			    setschoolbutton.title=schools[selectedIndex];
			    settingswin.add(setschoolbutton);
		    }
		}
	});
	
	var years = ['Leerjaar 1', 'Leerjaar 2', 'Leerjaar 3', 'Leerjaar 4', 'Leerjaar 5', 'Leerjaar 6'];
	
	var setyearbutton = Titanium.UI.createButton({
		title:'Kies je leerjaar...',
		top:'65%',
		height:60,
		width:150,
		borderWidth:2,
		borderColor:'#003c6d',
		backgroundColor:'#fff',
		color:'#003c6d'
	});
	
	setyearbutton.addEventListener('click',function(){
		var yearoptions = {
		title:'Leerjaar selecteren',
		options:years
		};
		var setyear = Ti.UI.createOptionDialog(yearoptions);
		setyear.show();
		setyear.addEventListener('click', onSelectOptionDialog);
		function onSelectOptionDialog(event){
		    var selectedIndex = event.source.selectedIndex;
		    if (years[selectedIndex] != null) {
		    	settingswin.remove(setyearbutton);
			    setyearbutton.title=years[selectedIndex];
			    settingswin.add(setyearbutton);
		    }
		}
	});
	
	Ti.Gesture.addEventListener('orientationchange', function(e){
		if(e.source.isPortrait()) {
			settingsactionbar.applyProperties({
				height:'10%'
			});
		} else if(e.source.isLandscape()) {
			settingsactionbar.applyProperties({
				height:'15%'
			});
		};
	});

	settingsactionbar.add(titlelabel);
	
	settingswin.add(settingsactionbar);
	settingswin.add(setschoolbutton);
	settingswin.add(setyearbutton);
	settingswin.open();
});

actionbar.add(settingsbutton);

var refreshbutton = Titanium.UI.createImageView({
	image:'refresh.png',
	height:'80%',
	right:'3%'
});

actionbar.add(refreshbutton);
win.add(actionbar);

var tabsview = Titanium.UI.createView({
	bottom:0,
	height:'10%',
	left:0,
	right:0
});

win.add(tabsview);

var label1 = Titanium.UI.createLabel({
	text:'Roosterwijzigingen',
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	top:'10%',
	bottom:0,
	left:0,
	width:'43%',
	color:'#003c6d',
	backgroundColor:'#fff'
});

var label2 = Titanium.UI.createLabel({
	text:'Mededelingen',
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	top:'10%',
	bottom:0,
	left:'44%',
	width:'34%',
	color:'#fff',
	backgroundColor:'#003c6d'
});

var imageview = Titanium.UI.createView({
	top:'10%',
	bottom:0,
	left:'79%',
	height:'90%',
	width:'21%',
	backgroundColor:'#003c6d'
});

var image = Titanium.UI.createImageView({
	image:'stentor.png'
});

imageview.add(image);

var divisionborder1 = Ti.UI.createView({
    backgroundColor:'#dc006d',
    top:'10%',
    bottom:0,
    width:'1%',
    left:'43%',
    right:'55%'
});

var divisionborder2 = Ti.UI.createView({
    backgroundColor:'#dc006d',
    top:'10%',
    bottom:0,
    width:'1%',
    left:'78%',
    right:'21%'
});

tabsview.add(divisionborder1);
tabsview.add(divisionborder2);

tabsview.add(label1);
tabsview.add(label2);
tabsview.add(imageview);

Ti.Gesture.addEventListener('orientationchange', function(e){
	if(e.source.isPortrait()) {
		mainview.applyProperties({
			height:'81%',
			top:'10%'
		});
		actionbar.applyProperties({
			height:'10%'
		});
		tabsview.applyProperties({
			height:'10%'
		});
		label1.applyProperties({
			top:'10%'
		});
		label2.applyProperties({
			top:'10%'
		});
		imageview.applyProperties({
			height:'90%',
			top:'10%'
		});
		divisionborder1.applyProperties({
			top:'10%'
		});
		divisionborder2.applyProperties({
			top:'10%'
		});
		settingsbutton.addEventListener('click',function(e){
			settingsactionbar.applyProperties({
				height:'10%'
			});
		});
	} else if(e.source.isLandscape()) {
		mainview.applyProperties({
			height:'72.5%',
			top:'15%'
		});
		actionbar.applyProperties({
			height:'15%'
		});
		tabsview.applyProperties({
			height:'15%'
		});
		label1.applyProperties({
			top:'15%'
		});
		label2.applyProperties({
			top:'15%'
		});
		imageview.applyProperties({
			height:'85%',
			top:'15%'
		});
		divisionborder1.applyProperties({
			top:'15%'
		});
		divisionborder2.applyProperties({
			top:'15%'
		});
		settingsbutton.addEventListener('click',function(e){
			settingsactionbar.applyProperties({
				height:'15%'
			});
		});
	};
});

label1.addEventListener('click',function(){
	label1.color = '#003c6d';
	label1.backgroundColor = '#fff';
	
	label2.color = '#fff';
	label2.backgroundColor = '#003c6d';
	
	imageview.backgroundColor = '#003c6d';
	
	refreshbutton.removeEventListener('click',webview2EventListener);
	
	refreshbutton.addEventListener('click',webview1EventListener);
	
	mainview.remove(webview2);
	mainview.add(webview1);
});
label2.addEventListener('click',function(){
	label1.color = '#fff';
	label1.backgroundColor = '#003c6d';
	
	label2.color = '#003c6d';
	label2.backgroundColor = '#fff';
	
	imageview.backgroundColor = '#003c6d';
	
	refreshbutton.removeEventListener('click',webview1EventListener);
	
	refreshbutton.addEventListener('click',webview2EventListener);
	
	mainview.remove(webview1);
	mainview.add(webview2);
});
imageview.addEventListener('click',function(){
	label1.color = '#fff';
	label1.backgroundColor = '#003c6d';
	
	label2.color = '#fff';
	label2.backgroundColor = '#003c6d';
	
	imageview.backgroundColor = '#fff';
	
	mainview.remove(webview1);
	mainview.remove(webview2);
	actionbar.remove(refreshbutton);
	
	var stentorview = Titanium.UI.createView({
    	backgroundColor: '#fff',
    	height:'81%',
    	top:'10%'
	});
	
	var gwbutton = Ti.UI.createButton({
		title:'Gevleugelde Woorden insturen',
		height:70,
		width:170,
		backgroundColor: '#dc006d',
		color: '#fff'
	});
	
	gwbutton.addEventListener('click',function(e){
	   	var emailDialog = Ti.UI.createEmailDialog();
		emailDialog.subject = "Gevleugelde Woorden via PJ Info";
		emailDialog.toRecipients = ['mennohellinga@zoho.com'];	// CHANGE BEFORE RELEASE!
		emailDialog.open();
	});
	
	label1.addEventListener('click',function(){
		actionbar.add(refreshbutton);
		mainview.remove(stentorview);
		mainview.add(webview1);
	});
	label2.addEventListener('click',function(){
		actionbar.add(refreshbutton);
		mainview.remove(stentorview);
		mainview.add(webview2);
	});
	
	stentorview.add(gwbutton);
	mainview.add(stentorview);
});

win.open();
