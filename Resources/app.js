function loadRooster() {
	var subst = 1;
	var prevdate;
	var tables = [];
	//edit this:
	var schoollink = 'gym';
	var link = 'http://www3.pj.nl/' + schoollink + '_info_leerlingen/subst_00';
	while 1 {
		parselink = link + subst + '.htm';
		var html = $($.parseHTML(parselink, document, false));
		date = html.match(/\d{2}-\d{2}-\d{4}/);
		if (prevdate == date || subst = 1){
			tables = tables.concat(html.match(/(<tr.*<\/tr>)/mg));
			subst = subst + 1;
			prevdate = date;
		} else {
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

loadRooster();
var webview1 = Titanium.UI.createWebView({
	url:'schedulechanges.html'
});

mainview.add(webview1);

var webview2 = Titanium.UI.createWebView({
	url:'http://www3.pj.nl/infoschermgymnasium/'
});

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
	
	var titlelabel = Titanium.UI.createLabel({
		text:'Instellingen',
		textAlign:'Titanium.UI.TEXT_ALIGNMENT_CENTER',
		color:'#fff',
		font:{fontSize:28}
	});
	
	actionbar.add(titlelabel);
	
	settingswin.add(actionbar);
	settingswin.open();
});

actionbar.add(settingsbutton);

var refreshbutton = Titanium.UI.createImageView({
	image:'refresh.png',
	height:'60%',
	right:'5%'
});

refreshbutton.addEventListener('click',function(){
	loadRooster();
	webview1.reload();
	webview2.reload();
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
	
	mainview.remove(webview2);
	mainview.add(webview1);
});
label2.addEventListener('click',function(){
	label1.color = '#fff';
	label1.backgroundColor = '#003c6d';
	
	label2.color = '#003c6d';
	label2.backgroundColor = '#fff';
	
	imageview.backgroundColor = '#003c6d';
	
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
	
	gwbutton.addEventListener('click',function(e)
	{
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
