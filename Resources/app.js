function getHTML(URL) {
var client = Ti.Network.createHTTPClient({
	onload: function() {
		Ti.API.info("Received HTML!");
	        Return this.responseText;
	},
	onerror: function(e) {
		Ti.API.debug(e.error);
		alert('Internetverbinding mislukt. Probeer het later opnieuw.');
	},
	timeout : 5000
});
client.open("GET", URL)
client.send();
}
function loadschedule() {
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
	height:'72.5%',
	top:'15%'
});

win.add(mainview);

// Function doesn't work yet
// loadschedule();

var webview1 = Titanium.UI.createWebView({
	// Change when function works
	// url:'schedulechanges.html'
	url:'http://www3.pj.nl/gym_info_leerlingen/'
});

var webview1EventListener = function() {
	webview1.reload();
};
	
mainview.add(webview1);

var webview2 = Titanium.UI.createWebView({
	url:'http://www3.pj.nl/infoschermgymnasium/'
});

var webview2EventListener = function() {
	webview2.reload();
};

var actionbar = Titanium.UI.createView({
	backgroundColor:'#dc006d',
	top:0,
	height:'15%'
});

var titlelabel = Titanium.UI.createLabel({
	text:'PJ Info',
	textAlign:'Titanium.UI.TEXT_ALIGNMENT_CENTER',
	color:'#fff',
	font:{fontSize:28}
});

actionbar.add(titlelabel);

var settingsbutton = Titanium.UI.createImageView({
	image:'settings.png',
	height:'60%',
	left:'5%'
});

settingsbutton.addEventListener('click',function(){
	var settingswin = Titanium.UI.createWindow({
		backgroundColor:'#fff'
	});
	
	var actionbar = Titanium.UI.createView({
		backgroundColor:'#dc006d',
		top:0,
		height:'15%'
	});
	
	var backbutton = Titanium.UI.createImageView({
		image:'back.png',
		height:'60%',
		left:'5%'
	});
	
	backbutton.addEventListener('click',function(e){
		settingswin.close();
	});
	
	actionbar.add(backbutton);
	
	var titlelabel = Titanium.UI.createLabel({
		text:'Instellingen',
		textAlign:'Titanium.UI.TEXT_ALIGNMENT_CENTER',
		color:'#fff',
		font:{fontSize:28}
	});
		
	var setschoolbutton = Titanium.UI.createButton({
		title:'Kies je school...',
		top:'40%',
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
	
	var setclasstextfield = Titanium.UI.createTextField({
		hintText:'Typ je klas...',
		width:150,
		top:'65%',
		color:'#003c6d'
	});
	
	actionbar.add(titlelabel);
	
	settingswin.add(actionbar);
	settingswin.add(setschoolbutton);
	settingswin.add(setclasstextfield);
	settingswin.open();
});

actionbar.add(settingsbutton);

var refreshbutton = Titanium.UI.createImageView({
	image:'refresh.png',
	height:'60%',
	right:'5%'
});

actionbar.add(refreshbutton);
win.add(actionbar);

var tabsview = Titanium.UI.createView({
	bottom:0,
	height:'15%',
	left:0,
	right:0
});

win.add(tabsview);

var label1 = Titanium.UI.createLabel({
	text:'Roosterwijzigingen',
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	top:'15%',
	bottom:0,
	left:0,
	width:'43%',
	color:'#003c6d',
	backgroundColor:'#fff'
});

var label2 = Titanium.UI.createLabel({
	text:'Mededelingen',
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	top:'15%',
	bottom:0,
	left:'44%',
	width:'34%',
	color:'#fff',
	backgroundColor:'#003c6d'
});

var imageview = Titanium.UI.createView({
	top:'15%',
	bottom:0,
	left:'79%',
	height:'85%',
	width:'21%',
	backgroundColor:'#003c6d'
});

var image = Titanium.UI.createImageView({
	image:'stentor.png'
});

imageview.add(image);

var divisionborder1 = Ti.UI.createView({
    backgroundColor:'#dc006d',
    top:'15%',
    bottom:0,
    width:'1%',
    left:'43%',
    right:'55%'
});

var divisionborder2 = Ti.UI.createView({
    backgroundColor:'#dc006d',
    top:'15%',
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
    	height:'72.5%',
    	top:'15%'
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
