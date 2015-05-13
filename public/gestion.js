	//fonction de base================================================================

	function idp(ident) {
		return document.getElementById(ident);
	};


	//gestion de date=================================================================

	var date = new Date();
	var mois = date.getMonth();
	var annee = date.getFullYear();

	moislgt = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 
	moistxt = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];

	function bisextile() {
		if (annee % 4 == 0) {
		moislgt[1] = 29; 
		} else {
		moislgt[1] = 28; 
		};
	};
	bisextile();


	//génération html à l'ouverture et fonction de création des cases===============================================================

	var contenu = "";
		for (i = 0; i < 37; i++) {
			contenu += "<div id='c"+i.toString()+"' class='case'><p id='p"+i.toString()+"'></p><div id='l"+i.toString()+"'></div></div>";
		};
	idp("content").innerHTML = contenu;
	idp("mois").innerHTML = moistxt[mois];
	idp("annee").innerHTML = annee;

function caseCreator() {
	for (i = 0; i < 37; i++) {
		idp("p"+i+"").innerHTML = "";
	};
	for (i = 0; i < moislgt[mois]; i++) {
		date.setDate(1);
		date.setMonth(mois);
		date.setYear(annee);
		var firstday = date.getDay();
		if (firstday == 0) {
			firstday = 7;
		};
		var numcase = i+date.getDay();
		idp("p"+numcase+"").innerHTML = i+1+"";
		date = new Date();
	};
};
caseCreator();



	//Navigation par click=============================================================

function moisSuivant(){
	bisextile();
	if (mois != 11){
		mois ++;
		idp("mois").innerHTML = moistxt[mois];
	} else {
		mois = 0; 
		annee ++;
		idp("mois").innerHTML = moistxt[mois];
		idp("annee").innerHTML = annee+"";
	};
	caseCreator();
	editCase();
};

function moisPrecedent(){
	bisextile();
	if (mois != 0){
		mois --;
		idp("mois").innerHTML = moistxt[mois];
	} else {
		mois = 11;
	    annee--;
	    idp("mois").innerHTML = moistxt[mois];
	    idp("annee").innerHTML = annee+"";
	};
	caseCreator();
	editCase();
};

function anneeSuivante(){
		bisextile();
	    annee++;
	    idp("annee").innerHTML = annee+"";
	    caseCreator();
	    editCase();
};

function anneePrecedente(){
		bisextile();
	    annee--;
	    idp("annee").innerHTML = annee+"";
	  	caseCreator();
	  	editCase()
};


	//formulaire d'ajout==============================================================

var casecalendrier = document.getElementsByClassName("case");

for (i=0;i<casecalendrier.length;i++) {
casecalendrier[i].addEventListener("click",function () {ouvrirAdder(this.id)});
};

function ouvrirAdder(ident) {
	idp("zoneinput").innerHTML = "<form method='POST' action='/addtask'><input id='Tache' name='task'><input id='Date' name='date' value='"+ident+"|"+mois.toString()+"|"+annee.toString()+"'><button type='submit' onclick='ajouterTexte('"+ident+"')'>Ajouter tâche</button></form>";
};

	//distribution des tâches dans les cases========================================
function editCase() {
	for (i=0;i<37;i++) {
		idp("l"+i.toString()).innerHTML = "";
	};
	for (i=0;i<datetask.length;i++) {
		var paradate = datetask[i].split("|");
		if (paradate[1] == mois && paradate[2] == annee) {
			idp("l"+paradate[0].substring(1,3)).innerHTML = task[i];
		};
	};
};
editCase();