//test = parseInt(prompt(' Entrer theme (1,2,3) '));
theme = 1;
sonMenu = false;
retourSonMenu = false;
ecart = /*(ecartHautBas/3) + (ecartHautBas/2)*/ 0 ;
niv = 1; 
scrFacile = 0; 
scrMoy = 26; 
scrDiff = 16;

/// ====== HIDE TOUT LES BOUTTON === ///
$('#butPlay').hide();
$('#butMllS').hide();
$('#butThemes').hide();
$('#morning').hide();
$('#sunset').hide();
$('#night').hide();
$('#retourTheme').hide();
$('#retourNiveau').hide();
$('#retourScore').hide();
$('#retourMenu').hide();
$('#on').hide();
$('#off').hide();
$('#onMenu').hide();
$('#facile').hide();
$('#moyen').hide();
$('#difficile').hide();
$('.poppup').hide();
$('#facScr').hide();
$('#moyScr').hide();
$('#diffScr').hide();

/////// ====== DECLARATION CANVAS ===== ///////

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

    // FOND
const img1 = new Image();
img1.src = 'morning.jpg';
const img6 = new Image();
img6.src = 'sunset.png';
const img7 = new Image();
img7.src = 'night.png'; // sunset.png  night.png  morning.jpg

    // FLOPPY
const img2 = new Image();
img2.src = 'troisFloop.png';

    // TUYAUX 
const img3 = new Image();
img3.src = 'tuyau.png';
const img4 = new Image();
img4.src = 'inverse.png';

    // TITRE
const img5 = new Image();
img5.src = 'tit.png';


///// ====== SCORE , AUTRE ELEMENT UTILE DU JEU  ===== /////

let i = 0 ,
    MllrScr = 0, // meilleurs score
    txtMllrScr = 'Meilleur score : ' ,
    txtJouer = 'Cliquez pour jouer ',
    ActlScr = 0, // score actuel
    tuyaux  = [],
    vol , hVol ;

///// ====== QUELQUE REGLAGE UTILE ====== /////

let gameStart =  false ; // milalao ve sa tsy ?
gravite = .5; //.5    .7
vitesse = 11;      // 11    17  
const tailleLarg = 75.333333333333333333333333333333;
const tailleHtr = 53;
saut = -11.8; // 11.8      12.0
const canvasSurCinq = (canvas.width / 5) ; // 1/5 largueur any canvas

///// ======= renitialisation des reglage ======= /////

function renitial(){
    gravite = .5;
    vitesse = 11; 
    saut = -11.8;
}

//// ====== REGLAGE TUYAUX ====== //////

const tuyauxLarg = 100 ,
      tuyauxEcart = 375,
      ecartHautBas = (tuyauxEcart / 2 ) + ((tuyauxEcart / 2 )/2),
      tuyauxLocalis = ()  => ( Math.random() * ((canvas.height - (tuyauxEcart + tuyauxLarg)) -
       tuyauxLarg)) + tuyauxLarg ;

//// ====== RETOUR A 0 ==== ////

function rtrZ (){
    ActlScr = 0;
    vol = saut ;
    hVol = (canvas.height / 2) - (tailleHtr / 2 );

    tuyaux = Array(3).fill().map((a,j) => [canvas.width + (j * (tuyauxEcart + tuyauxLarg)) , tuyauxLocalis()]);
    //console.log(tuyaux);
}


//// ==== ANIMATION ===== ////

function render  (){
    i ++;

    
    //ctx.drawImage(img,x,y,lrg,htr)
    ctx.imageSmoothingEnabled = false;
    ///// ======= FOND ==== /////
    switch (theme){
        case 1 :
            ctx.drawImage(img1, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width) + canvas.width, 0 ,canvas.width, canvas.height);
            ctx.drawImage(img1, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width), 0 ,canvas.width, canvas.height);
            break; 
        case 2 :
            ctx.drawImage(img6, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width) + canvas.width, 0 ,canvas.width, canvas.height);
            ctx.drawImage(img6, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width), 0 ,canvas.width, canvas.height);
            break;
        case 3 :
            ctx.drawImage(img7, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width) + canvas.width, 0 ,canvas.width, canvas.height);
            ctx.drawImage(img7, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width), 0 ,canvas.width, canvas.height);
            break;
        default :
            ctx.drawImage(img1, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width) + canvas.width, 0 ,canvas.width, canvas.height);
            ctx.drawImage(img1, 0 , 0 , canvas.width , canvas.height ,
                - ((i * ((vitesse / 2 )+(vitesse / 3))) % canvas.width), 0 ,canvas.width, canvas.height);    
            break;
    }
    
        
    /////// ======= CONDITION POUR JOUER ===== ///////

    if (gameStart){

        canvas.onclick = () => {
            vol = saut;
            $('#saut').get(0).play();
        };
        window.onkeypress = () => {
            vol = saut;
            $('#saut').get(0).play();
        };
        ///// ====== FLOPPY ====== //////
        ctx.drawImage(img2 , Math.floor((i % 9) / 3) * tailleLarg , 0 , tailleLarg , tailleHtr ,
        canvasSurCinq, hVol , tailleLarg , tailleHtr );
        vol += gravite ;
        hVol = Math.min(hVol + vol , canvas.height - tailleHtr);
    }
    else {
        ///// ====== TITRE ====== //////
        ctx.drawImage(img5,0,0,1000,200,(canvas.width / 2)-(750/2),canvas.height / 20,750,150);


        ///// ====== FLOPPY ====== //////
        hVol = (canvas.height / 2 ) - (tailleHtr / 2 );
        ctx.drawImage(img2 , Math.floor((i % 9) / 3) * tailleLarg , 0 , tailleLarg , tailleHtr , (canvas.width / 2) - (tailleLarg / 2) ,
            hVol , tailleLarg , tailleHtr );


            $('#saut').get(0).pause();


        ///// ===== TEXTE SCORE ===== /////
        //ctx.fillText('Meilleur score : '+ MllrScr , (canvas.width / 2 ) - ((txtMllrScr.length * 20)/2), (canvas.height / 2) / 2);
        //ctx.fillText('Cliquez pour jouer ', (canvas.width / 2 ) - ((txtMllrScr.length * 20)/2),
        //(canvas.height / 2) + ((canvas.height / 2) / 2) );
        //ctx.font = "bold 30px courier";

    }


    ///// ==== CONDITION POUR TUYAUX ====== //////

    if(gameStart) {
        tuyaux.map( tuyau => {
            tuyau[0] -= vitesse ;

            //// ===== IMPORTE TUYAUX ====== ////
            ctx.drawImage(img4, 0 , 500 - tuyau[1], tuyauxLarg , tuyau[1] , tuyau[0] , 0 , tuyauxLarg +20/*+ 30*/, tuyau [1]  );
            ctx.drawImage(img3, 0 , 0 , tuyauxLarg , (canvas.height /2 ) - tuyau[1] + tuyauxEcart,
                tuyau[0] , ecart + tuyau[1] /*+ (tuyauxEcart/2)*//*(ecartHautBas/3) + (ecartHautBas/2)*/, tuyauxLarg + 20 , (canvas.height/2) - tuyau[1] + tuyauxEcart )
            //console.log(tuyau[1])

            if(tuyau[0] <= -tuyauxLarg){
                ActlScr ++;
                if (niv = 1){
                    scrFacile = Math.max(scrFacile,ActlScr);
                }
                if (niv = 2){
                    scrMoy = Math.max(scrMoy,ActlScr);
                }
                if (niv = 3){
                    scrDiff = Math.max(scrDiff,ActlScr);
                }
                tuyaux = [...tuyaux.slice(1) , [tuyaux[tuyaux.length - 1][0]+ tuyauxEcart + tuyauxLarg
                    , tuyauxLocalis()]];

            }

            //// ==== CONDITION GAME OVER ==== //////
            if ([tuyau[0] <= canvasSurCinq + tailleLarg  ,
                 tuyau[0] + tuyauxLarg >= canvasSurCinq, 
                 tuyau[1] > hVol || tuyau[1] + ecart < hVol + tailleHtr ///*tuyau[1] + (tuyauxEcart/2)*/
                ].every(elem => elem))
            {
                    $('#butPlay').show();
                    $('#butMllS').show();
                    $('#butThemes').show();
                    $('#retourMenu').show();
                    $('#saut').get(0).pause();
                    if(sonMenu){
                        $('#on').show();      
                    }
                    else{
                        $('#off').show();
                    }
                    $('#facScr').hide();
                    $('#moyScr').hide();
                    $('#diffScr').hide();
                    $('#meilleurSrc').show();
                    gameStart = false ;
                    rtrZ();
                    renitial();

            }

                // ===== TEXTE SCORES ===== //
/*
            if (niv = 1){
                $('#nivScr').text('Meilleur : ' + scrFacile);
            }
            if (niv = 2){
                $('#nivScr').text('Meilleur : ' + scrMoy);
            }
            if (niv = 3){
                $('#nivScr').text('Meilleur : ' + scrDiff);
            }*/
        })
    }
        ////// ===== SORATRA SCORE ====== ////
        $('#facScr').text('Meilleur : ' + scrFacile);
        $('#moyScr').text('Meilleur : ' + scrMoy);
        $('#diffScr').text('Meilleur : ' + scrDiff);
    MllrScr = Math.max(scrFacile,scrMoy,scrDiff);
/*document.getElementById('meilleurSrc').innerHTML = */$('#meilleurSrc').text('Meilleur : ' + MllrScr);
    document.getElementById('scoreActl').innerHTML = 'Actuel : ' + ActlScr;
    window.requestAnimationFrame(render);

}

rtrZ();
img3.onload = render ;


////// ====== SON ======= //////
$('#off').click(function(){
    $('#off').hide();
    $('#on').show();
    $('#son').get(0).play();
    $('#son').prop("volume", 0.2);
    retourSonMenu = true;
    sonMenu = true;
});

$('#on').click(function(){
    $('#on').hide();
    $('#off').show();
    $('#son').get(0).pause();
    retourSonMenu = false;
    sonMenu = false;
});

$('#offMenu').click(function(){
    $('#offMenu').hide();
    $('#onMenu').show();
    $('#son').get(0).play();
    $('#son').prop("volume", 0.2);
    sonMenu = true;
    retourSonMenu = true;

});

$('#onMenu').click(function(){
    $('#onMenu').hide();
    $('#offMenu').show();
    $('#son').get(0).pause();
    sonMenu = false;
    retourSonMenu = false;
});


//// ======== EVENEMENT CLICK ===== //////
    //// ======== BOUTTON PRINCIPAL ======= /////
$('#butJ').click(function(){
    //gameStart = true;
    $('#butJ').hide();

    if (sonMenu){
        $('#onMenu').hide();
        $('#on').show();  
    }
    else {
        $('#offMenu').hide();
        $('#off').show();
    }
    $('#butPlay').show();
    $('#butMllS').show();
    $('#butThemes').show();
    $('#retourMenu').show();

});

///////////////////////////////////////////////////////////////////////////////

////// ====== BOUTTON MENU ======== ///////
    ////// ====== THEMES ======== ///////
$('#butThemes').click(function(){
    $('#butThemes').hide();
    $('#butPlay').hide();
    $('#butMllS').hide();
    $('.poppup').hide();
        // theme //
        $('#morning').show();
        $('#sunset').show();
        $('#night').show();
        // retour
        $('#retourMenu').hide();
        $('#retourTheme').show();

});

    // MATIN
    $('#morning').click(function(){
        theme = 1;
    });
    // AVANT-SOIR
    $('#sunset').click(function(){
        theme = 2;
    });
    // SOIR
    $('#night').click(function(){
        theme = 3;
    });

    /////////////////////////// ====== SCORES ======= //////////////////////////////////

    $('#butMllS').click(function(){
        $('.poppup').show();
        $('#sFa').text('FACILE : ' + scrFacile);
        $('#sMoy').text('MOYEN : ' + scrMoy);
        $('#sDiff').text('DIFFICILE : ' + scrDiff);
    });
    ///// POPUP //////
    $('#cancel').click(function(){
        $('.poppup').hide();
    });
    canvas.onclick = () => { $('.poppup').hide(); }

    ////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

    // retour menu
$('#retourMenu').click(function(){

    if(retourSonMenu){
        $('#on').hide();
        $('#onMenu').show();           
    }
    else{
        $('#off').hide();
        $('#offMenu').show();
    }
    $('#butJ').show();
    $('#butPlay').hide();
    $('#butMllS').hide();
    $('#butThemes').hide();
    $('#retourMenu').hide();
    $('.poppup').hide();
});

    //retour themes
    $('#retourTheme').click(function(){
        $('#butPlay').show();
        $('#butMllS').show();
        $('#butThemes').show();
        $('#retourMenu').show();
        $('#retourTheme').hide();
        $('#morning').hide();
        $('#sunset').hide();
        $('#night').hide();
    });

    //retour NIVEAU
    $('#retourNiveau').click(function(){
        $('#butPlay').show();
        $('#butMllS').show();
        $('#butThemes').show();
        $('#retourMenu').show();
        $('#retourNiveau').hide();
        $('#facile').hide();
        $('#moyen').hide();
        $('#difficile').hide();
    });

    // JOUER 
    $('#butPlay').click(function(){
        $('#retourMenu').hide();
        $('#butPlay').hide();
        $('#butMllS').hide();
        $('#butThemes').hide();
        $('.poppup').hide();
        $('#facile').show();
        $('#moyen').show();
        $('#difficile').show();
        $('#retourNiveau').show();
    });


            /////// ======   NIVEAU BOUTTON   ====== //////
    $('#facile').click(function(){
        $('#facile').hide();
        $('#moyen').hide();
        $('#difficile').hide();
        $('#retourNiveau').hide();
        ecart = (ecartHautBas/3) + (ecartHautBas/2) + ((ecartHautBas/2)/2);
        if (sonMenu){
            $('#on').hide();  
        }
        else {
            $('#off').hide();
        }
        gameStart = true;
        niv = 1;
        // texte score //
        $('#facScr').show();
        $('#meilleurSrc').hide();
    });
    $('#moyen').click(function(){
        $('#facile').hide();
        $('#moyen').hide();
        $('#difficile').hide();
        $('#retourNiveau').hide();
        ecart = (tuyauxEcart/2) ;
        gravite = .6;
        saut = -11.6;
        if (sonMenu){
            $('#on').hide();  
        }
        else {
            $('#off').hide();
        }
        gameStart = true;
        niv = 2;
        // texte score //
        $('#moyScr').show();
        $('#meilleurSrc').hide();
    });
    $('#difficile').click(function(){
        $('#facile').hide();
        $('#moyen').hide();
        $('#difficile').hide();
        $('#retourNiveau').hide();
        ecart = (tuyauxEcart/2);
        gravite = .7; 
        vitesse = 17;      
        saut = -12.0; 
        if (sonMenu){
            $('#on').hide();  
        }
        else {
            $('#off').hide();
        }
        gameStart = true;
        niv = 3;
        // texte score //
        $('#diffScr').show();
        $('#meilleurSrc').hide();
    });


