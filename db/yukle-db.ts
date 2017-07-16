import {database, initializeApp} from "firebase";
import {environment} from "./../src/environments/environment";
import {dbData} from "./db-data";


console.log(' Firebase database yukleniyor ... ');

initializeApp(environment.firebaseConfig);


const kitaplarRef = database().ref('kitaplar');
dbData.kitaplar.forEach( kitap => {

  console.log('add kitap', kitap.url);

  const kitapRef = kitaplarRef.push({
      url: kitap.url,
      yazar: kitap.yazar,
      acıklama: kitap.acıklama 
  });



/* 
veritabanında yapmak istediğimiz 
"kitaplar" : {
    "-Kp7p-YCh97CuRmSrzKv" : {
      "acıklama" : "İkbal'in olgunluk dönemi eserlerinden olan Cavitname, bu büyük düşünüründüşünce silsilesinin devamı ve en önemli dönüm noktası durumundadır.",
      "url" : "cavidname",
      "yazar" : "Muhammed ikbal"
    },
    "-Kp7p-YLKAafgquZvqQX" : {
      "acıklama" : "Mevlananın 6 ciltten oluşan ....",
      "url" : "mesnevi",
      "yazar" : "Mevlana"
    }
  } */

  const bolumlerRef = database().ref('bolumler');
  let KitapKeyHerBolum = [];

  kitap.bolumler.forEach((bolum:any) =>  {

    console.log('adding bolum ', bolum.url);

    KitapKeyHerBolum.push(bolumlerRef.push({
        sayfa: bolum.sayfa,
        tags: bolum.tags,
        bolum_acıklama: bolum.bolum_acıklama, 
      }).key);

  });
/*  "bolumler" : {
    "-Kp7p-YH8StTIcPP9G4Y" : {
      "bolum_acıklama" : "cavidname bolum1 acıklama",
      "sayfa" : "2:49",
      "tags" : "bol1"
    },
    "-Kp7p-YJpbELBSFtDhou" : {
      "bolum_acıklama" : "cavidname bolum2 acıklama",
      "sayfa" : "22:49",
      "tags" : "bol2"
    },
    "-Kp7p-YMgF0ito4PdO9i" : {
      "bolum_acıklama" : "mesnevi bolum1 acıklama",
      "sayfa" : "2:49",
      "tags" : "bol1"
    },
    "-Kp7p-YNAftMpeVwD_ge" : {
      "bolum_acıklama" : "mesnevi bolum2 acıklama",
      "sayfa" : "22:49",
      "tags" : "bol2"
    }
  }, */

  const association = database().ref('KitapHerBolum');

  const KitapHerBolum = association.child(kitapRef.key);

  KitapKeyHerBolum.forEach(bolumKey => {
    const KitapBolumAssociation = KitapHerBolum.child(bolumKey);

    KitapBolumAssociation.set(true);
  });

/*    "KitapHerBolum" : {
    "-Kp7p-YCh97CuRmSrzKv" : {
      "-Kp7p-YH8StTIcPP9G4Y" : true,
      "-Kp7p-YJpbELBSFtDhou" : true
    },
    "-Kp7p-YLKAafgquZvqQX" : {
      "-Kp7p-YMgF0ito4PdO9i" : true,
      "-Kp7p-YNAftMpeVwD_ge" : true
    }
  }, */

});









