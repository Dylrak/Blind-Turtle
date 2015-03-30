var selectedschool = Ti.App.Properties.getString('selectedschool');
if(selectedschool == 'Dalton Dokkum'){
	createwindows('http://www3.pj.nl/dok_info_leerlingen/','http://www3.pj.nl/infoschermdokkum/');
}else if(selectedschool == 'De Dyk'){
	createwindows('http://www3.pj.nl/dyk_info_leerlingen/','http://www3.pj.nl/infoschermdedyk');
}else if(selectedschool == 'De Foorakker'){
	createwindows('http://www3.pj.nl/anna_info_leerlingen/','http://www3.pj.nl/infoschermfoorakker');
}else if(selectedschool == 'Leeuwarder Lyceum'){
	createwindows('http://www3.pj.nl/lyc_info_leerlingen/','http://www3.pj.nl/infoschermlyceum');
}else if(selectedschool == 'Montessori High School'){
	createwindows('http://www3.pj.nl/mon_info_leerlingen/','http://www3.pj.nl/infoschermmontessori');
}else if(selectedschool == 'Stedelijk Gymnasium'){
	createwindows('http://www3.pj.nl/gym_info_leerlingen/','http://www3.pj.nl/infoschermgymnasium');
}else{
	selectschool();
}

function selectschool(){
	var selectionwin = Titanium.UI.createWindow({
		backgroundColor:'white',
		height:'100%',
		exitOnClose:true
	});
	
	var selectionactionbar = Titanium.UI.createView({
		backgroundColor:'#dc006d',
		top:0,
		height:'10%'
	});
	
	var selectiontitlelabel = Titanium.UI.createLabel({
		text:'School selecteren',
		textAlign:'Titanium.UI.TEXT_ALIGNMENT_CENTER',
		color:'#fff',
		font:{fontSize:24}
	});
	
	selectionactionbar.add(selectiontitlelabel);
	
	var pjlogo = Titanium.UI.createImageView({
		image:'pjlogo.png',
		top:'17%',
		height:150,
		width:150
	});
	
	var selectionsetschoolbutton = Titanium.UI.createButton({
		title:'Kies je school...',
		top:'50%',
		height:'10%',
		width:'80%',
		backgroundColor:'#b0b0b0',
		backgroundSelectedColor:'#d0d0d0',
		color:'#003c6d'
	});
	
	var confirmbutton = Titanium.UI.createButton({
		title:'Bevestigen',
		height:60,
		width:150,
		bottom:'10%',
		backgroundColor:'#003c6d',
		backgroundSelectedColor:'#98afc7'
	});
	
	var schools = ['!mpulse Kollum', 'Dalton Dokkum', 'De Dyk', 'De Foorakker', 'Leeuwarder Lyceum', 'Montessori High School', 'Stedelijk Gymnasium'];
	
	selectionsetschoolbutton.addEventListener('click',function(){
		var schooloptions = {
		title:'School selecteren',
		options:schools
		};
		var setschool = Titanium.UI.createOptionDialog(schooloptions);
		setschool.show();
		setschool.addEventListener('click', onSelectOptionDialog);
		function onSelectOptionDialog(event){
		    var selectedIndex = event.source.selectedIndex;
		    if(schools[selectedIndex] != null){
		    	selectionwin.remove(selectionsetschoolbutton);
			    selectionsetschoolbutton.title = schools[selectedIndex];
			    selectedschool = schools[selectedIndex];
			    if(selectedschool == '!mpulse Kollum'){
			    	confirmbutton.addEventListener('click',function(){
			    		createwindows('http://www3.pj.nl/kol_info_leerlingen/','http://www3.pj.nl/infoschermkollum');
			    	});
			    }else if(selectedschool == 'Dalton Dokkum'){
			    	confirmbutton.addEventListener('click',function(){
			    		createwindows('http://www3.pj.nl/dok_info_leerlingen/','http://www3.pj.nl/infoschermdokkum/');
			    	});
			    }else if(selectedschool == 'De Dyk'){
			    	confirmbutton.addEventListener('click',function(){
			    		createwindows('http://www3.pj.nl/dyk_info_leerlingen/','http://www3.pj.nl/infoschermdedyk');
			    	});
			    }else if(selectedschool == 'De Foorakker'){
			    	confirmbutton.addEventListener('click',function(){
			    		createwindows('http://www3.pj.nl/anna_info_leerlingen/','http://www3.pj.nl/infoschermfoorakker');
			    	});
			    }else if(selectedschool == 'Leeuwarder Lyceum'){
			    	confirmbutton.addEventListener('click',function(){
			    		createwindows('http://www3.pj.nl/lyc_info_leerlingen/','http://www3.pj.nl/infoschermlyceum');
			    	});
			    }else if(selectedschool == 'Montessori High School'){
			    	confirmbutton.addEventListener('click',function(){
			    		createwindows('http://www3.pj.nl/mon_info_leerlingen/','http://www3.pj.nl/infoschermmontessori');
			    	});
			    }else if(selectedschool == 'Stedelijk Gymnasium'){
			    	confirmbutton.addEventListener('click',function(){
			    		createwindows('http://www3.pj.nl/gym_info_leerlingen/','http://www3.pj.nl/infoschermgymnasium');
			    	});
			    }
			    Ti.App.Properties.setString('selectedschool',schools[selectedIndex]);
			    selectionwin.add(selectionsetschoolbutton);
		    }
		}
	});
	
	Ti.Gesture.addEventListener('orientationchange', function(e){
		if(e.source.isPortrait()) {
			selectionactionbar.applyProperties({
				height:'10%'
			});
			selectionsetschoolbutton.applyProperties({
				height:'10%'
			});
			pjlogo.applyProperties({
				height:150,
				width:150
			});
		}else if(e.source.isLandscape()){
			selectionactionbar.applyProperties({
				height:'15%'
			});
			selectionsetschoolbutton.applyProperties({
				height:'15%'
			});
			pjlogo.applyProperties({
				height:100,
				width:100
			});
		};
	});
	
	var selectionscreenwidth = Ti.Platform.displayCaps.platformWidth;
	var selectionscreenheight = Ti.Platform.displayCaps.platformHeight;
	
	if(selectionscreenwidth > selectionscreenheight){
		selectionactionbar.applyProperties({
			height:'15%'
		});
		selectionsetschoolbutton.applyProperties({
			height:'15%'
		});
		pjlogo.applyProperties({
			height:100,
			width:100
		});
	}
	
	selectionactionbar.add(selectiontitlelabel);
	
	selectionwin.add(selectionactionbar);
	selectionwin.add(pjlogo);
	selectionwin.add(selectionsetschoolbutton);
	selectionwin.add(confirmbutton);
	
	selectionwin.open();
}

function createwindows(schedulechangesurl,infoscreenurl){
	var win = Titanium.UI.createWindow({
		backgroundColor:'white',
		exitOnClose:true
	});
	
	var mainview = Titanium.UI.createView({
		top:'10%',
		height:'82%'
	});
	
	win.add(mainview);
	
	var webview1 = Titanium.UI.createWebView({
		url:schedulechangesurl
	});
		
	mainview.add(webview1);
	
	var webview2 = Titanium.UI.createWebView({
		url:infoscreenurl
	});
	
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
		height:'100%',
		left:'2%',
		opacity:'1.0'
	});
	
	actionbar.add(settingsbutton);
	
	var settingsactionbar = Titanium.UI.createView({
		backgroundColor:'#dc006d',
		top:0,
		height:'10%'
	});
	
	var osname = Titanium.Platform.osname;
	
	if(osname == 'iphone' || osname == 'ipad'){
		var backbutton = Titanium.UI.createImageView({
			image:'back.png',
			height:'100%',
			left:'2%',
			opacity:'1.0'
		});
		backbutton.addEventListener('click',function(){
			setTimeout(function(){
			   backbutton.opacity = '1.0';
			},100);
			backbutton.opacity = '0.3';
		});
	}
	
	var setschoolbutton = Titanium.UI.createButton({
		title:'Verander je school...',
		top:'50%',
		height:'10%',
		width:'80%',
		backgroundColor:'#b0b0b0',
		backgroundSelectedColor:'#d0d0d0',
		color:'#003c6d'
	});
	
	settingsbutton.addEventListener('click',function(){
		setTimeout(function(){
			settingsbutton.opacity = '1.0';
		},100);
		settingsbutton.opacity = '0.3';
		
		var settingswin = Titanium.UI.createWindow({
			backgroundColor:'#fff'
		});
		
		var titlelabel = Titanium.UI.createLabel({
			text:'Instellingen',
			textAlign:'Titanium.UI.TEXT_ALIGNMENT_CENTER',
			color:'#fff',
			font:{fontSize:24}
		});
		
		if(osname == 'iphone' || osname == 'ipad'){
			backbutton.addEventListener('click',function(){
				settingswin.close();
			});
			settingsactionbar.add(backbutton);
		}
		
		var savebutton = Titanium.UI.createButton({
			title:'Opslaan',
			height:60,
			width:150,
			bottom:'10%',			backgroundColor:'#003c6d',
			backgroundSelectedColor:'#98afc7'
		});
		
		var schools = ['!mpulse Kollum', 'Dalton Dokkum', 'De Dyk', 'De Foorakker', 'Leeuwarder Lyceum', 'Montessori High School', 'Stedelijk Gymnasium'];
		
		setschoolbutton.addEventListener('click',function(){
			var schooloptions = {
			title:'School selecteren',
			options:schools
			};
			var setschool = Titanium.UI.createOptionDialog(schooloptions);
			setschool.show();
			setschool.addEventListener('click', onSelectOptionDialog);
			function onSelectOptionDialog(event){
			    var selectedIndex = event.source.selectedIndex;
			    if (schools[selectedIndex] != null) {
			    	settingswin.remove(setschoolbutton);
				    setschoolbutton.title = schools[selectedIndex];
				    selectedschool = schools[selectedIndex];
				    if(selectedschool == '!mpulse Kollum'){
				    	savebutton.addEventListener('click',function(){
				    		createwindows('http://www3.pj.nl/kol_info_leerlingen/','http://www3.pj.nl/infoschermkollum');
				    	});
				    }else if(selectedschool == 'Dalton Dokkum'){
				    	savebutton.addEventListener('click',function(){
				    		createwindows('http://www3.pj.nl/dok_info_leerlingen/','http://www3.pj.nl/infoschermdokkum');
				    	});
				    }else if(selectedschool == 'De Dyk'){
				    	savebutton.addEventListener('click',function(){
				    		createwindows('http://www3.pj.nl/dyk_info_leerlingen/','http://www3.pj.nl/infoschermdedyk');
				    	});
				    }else if(selectedschool == 'De Foorakker'){
				    	savebutton.addEventListener('click',function(){
				    		createwindows('http://www3.pj.nl/anna_info_leerlingen/','http://www3.pj.nl/infoschermfoorakker');
				    	});
				    }else if(selectedschool == 'Leeuwarder Lyceum'){
				    	savebutton.addEventListener('click',function(){
				    		createwindows('http://www3.pj.nl/lyc_info_leerlingen/','http://www3.pj.nl/infoschermlyceum');
				    	});
				    }else if(selectedschool == 'Montessori High School'){
				    	savebutton.addEventListener('click',function(){
				    		createwindows('http://www3.pj.nl/mon_info_leerlingen/','http://www3.pj.nl/infoschermmontessori');
				    	});
				    }else if(selectedschool == 'Stedelijk Gymnasium'){
				    	savebutton.addEventListener('click',function(){
				    		createwindows('http://www3.pj.nl/gym_info_leerlingen/','http://www3.pj.nl/infoschermgymnasium');
				    	});
				    }
				    Ti.App.Properties.setString('selectedschool',schools[selectedIndex]);
				    settingswin.add(setschoolbutton);
			    }
			}
		});
		
		Ti.Gesture.addEventListener('orientationchange', function(e){
			if(e.source.isPortrait()) {
				settingsactionbar.applyProperties({
					height:'10%'
				});
				setschoolbutton.applyProperties({
					height:'10%'
				});
			} else if(e.source.isLandscape()) {
				settingsactionbar.applyProperties({
					height:'15%'
				});
				setschoolbutton.applyProperties({
					height:'15%'
				});
			};
		});
	
		settingsactionbar.add(titlelabel);
		
		settingswin.add(settingsactionbar);
		settingswin.add(setschoolbutton);
		settingswin.add(savebutton);
		settingswin.open();
	});
	actionbar.add(settingsbutton);
	
	var refreshbutton = Titanium.UI.createImageView({
		image:'refresh.png',
		height:'100%',
		right:'2%',
		opacity:'1.0'
	});
	
	refreshbutton.addEventListener('click',function(){
		setTimeout(function(){
			refreshbutton.opacity = '1.0';
		},100);
		refreshbutton.opacity = '0.3';
		webview1.reload();
		webview2.reload();
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
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
		top:'10%',
		bottom:0,
		left:0,
		width:'49%',
		color:'#003c6d',
		backgroundColor:'#fff'
	});
	
	var label2 = Titanium.UI.createLabel({
		text:'Mededelingen',
		textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
		top:'10%',
		bottom:0,
		left:'51%',
		width:'49%',
		color:'#fff',
		backgroundColor:'#003c6d'
	});
	
	var divisionborder1 = Titanium.UI.createView({
	    backgroundColor:'#dc006d',
	    top:'10%',
	    bottom:0,
	    width:'2%',
	    left:'49%',
	    right:'49%'
	});
		
	var imageview = Titanium.UI.createView({
		top:'10%',
		bottom:0,
		left:'79%',
		height:'90%',
		width:'21%',
		backgroundColor:'#003c6d'
	});
	
	var selectedschool = Ti.App.Properties.getString('selectedschool');
	if(selectedschool == 'Stedelijk Gymnasium'){
		
		imageview.addEventListener ('click', function (){
			setTimeout(function(){
		   		imageview.backgroundColor = '#dc006d';
			},100);
			imageview.backgroundColor = '#fff';
			var dialog = Titanium.UI.createAlertDialog ({
				title:'Stentor',
				message:'Gevleugelde woorden insturen?',
				buttonNames:['Ja','Nee'],
				cancel:1
			});
			dialog.addEventListener ('click', function (e){
					Titanium.API.info ('e = ' + JSON.stringify(e));
					if (e.cancel === e.index || e.cancel === true) {
						return 1;
					}
					var emailDialog = Titanium.UI.createEmailDialog();
					emailDialog.subject = "Gevleugelde Woorden via PJ Info";
					emailDialog.toRecipients = ['mennohellinga@zoho.com'];	// CHANGE BEFORE RELEASE!
					emailDialog.open();
					return 0;
			});
			dialog.show();
		});
		
		var image = Titanium.UI.createImageView({
			image:'stentor.png'
		});
		
		imageview.add(image);
		
		label1.applyProperties({
			width:'39%'
		});
		
		label2.applyProperties({
			width:'38%',
			left:'40%'
		});
		
		divisionborder1.applyProperties({
			width:'1%',
		    left:'39%',
		    right:'60%'
		});
		
		var divisionborder2 = Titanium.UI.createView({
		    backgroundColor:'#dc006d',
		    top:'10%',
		    bottom:0,
		    width:'1%',
		    left:'78%',
		    right:'21%'
		});
		
		tabsview.add(divisionborder2);
		
		tabsview.add(imageview);
	}
	
	tabsview.add(divisionborder1);
	
	tabsview.add(label1);
	tabsview.add(label2);
	
	win.open();
	
	var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
 
	if(screenwidth > screenheight){
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
		divisionborder1.applyProperties({
			top:'15%'
		});
		if(osname == 'Stedelijk Gymnasium'){
			divisionborder2.applyProperties({
				top:'15%'
			});
			imageview.applyProperties({
				height:'85%'
			});
		}
		settingsbutton.addEventListener('click',function(e){
			settingsactionbar.applyProperties({
				height:'15%'
			});
			setschoolbutton.applyProperties({
				height:'15%'
			});
		});
	}
	
	Ti.Gesture.addEventListener('orientationchange', function(e){
		if(e.source.isPortrait()){
			mainview.applyProperties({
				height:'82%',
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
			divisionborder1.applyProperties({
				top:'10%'
			});
			if(osname == 'Stedelijk Gymnasium'){
				divisionborder2.applyProperties({
					top:'10%'
				});
				imageview.applyProperties({
					height:'90%'
				});
			}
			settingsbutton.addEventListener('click',function(e){
				settingsactionbar.applyProperties({
					height:'10%'
				});
				setschoolbutton.applyProperties({
					height:'10%'
				});
			});
		}else if(e.source.isLandscape()){
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
			divisionborder1.applyProperties({
				top:'15%'
			});
			if(osname == 'Stedelijk Gymnasium'){
				divisionborder2.applyProperties({
					top:'15%'
				});
				imageview.applyProperties({
					height:'85%'
				});
			}
			settingsbutton.addEventListener('click',function(e){
				settingsactionbar.applyProperties({
					height:'15%'
				});
				setschoolbutton.applyProperties({
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
		
		mainview.remove(webview2);
		mainview.add(webview1);
	});
	label2.addEventListener('click',function(){
		label1.color = '#fff';
		label1.backgroundColor = '#003c6d';
		
		label2.color = '#003c6d';
		label2.backgroundColor = '#fff';
		
		mainview.remove(webview1);
		mainview.add(webview2);
	});
}
	