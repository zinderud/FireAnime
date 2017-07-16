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
    "-KpA-g0NCmo74lPHskwD" : {
      "acıklama" : "İkbal'in olgunluk dönemi eserlerinden olan Cavitname, bu büyük düşünüründüşünce silsilesinin devamı ve en önemli dönüm noktası durumundadır.",
      "url" : "cavidname",
      "yazar" : "Muhammed ikbal"
    },
    "-KpA-g0VehCkbR7RJkqb" : {
      "acıklama" : "Mevlananın 6 ciltten oluşan ....",
      "url" : "mesnevi",
      "yazar" : "Mevlana"
    }
  }*/

  const bolumlerRef = database().ref('bolumler');
  let KitapKeyHerBolum = [];

  kitap.bolumler.forEach((bolum:any) =>  {

    console.log('adding bolum ', bolum.url);

    KitapKeyHerBolum.push(bolumlerRef.push({
        url:bolum.url,
        sayfa: bolum.sayfa,
        tags: bolum.tags,
        bolum_acıklama: bolum.bolum_acıklama, 
        kitapId:kitapRef.key
      }).key);

  });
/*   "bolumler" : {
    "-KpA-g0StnvQUIqAW0nM" : {
      "bolum_acıklama" : "cavidname bolum1 acıklama",
      "kitapId" : "-KpA-g0NCmo74lPHskwD",
      "sayfa" : "2:49",
      "tags" : "bol1",
      "url" : "bolum1"
    },
    "-KpA-g0U-Hcv_tkctKAY" : {
      "bolum_acıklama" : "cavidname bolum2 acıklama",
      "kitapId" : "-KpA-g0NCmo74lPHskwD",
      "sayfa" : "22:49",
      "tags" : "bol2",
      "url" : "bolum2 "
    },
    "-KpA-g0VehCkbR7RJkqc" : {
      "bolum_acıklama" : "mesnevi bolum1 acıklama",
      "kitapId" : "-KpA-g0VehCkbR7RJkqb",
      "sayfa" : "2:49",
      "tags" : "bol1",
      "url" : "bolum1"
    },
    "-KpA-g0W874MpcNB-NSk" : {
      "bolum_acıklama" : "mesnevi bolum2 acıklama",
      "kitapId" : "-KpA-g0VehCkbR7RJkqb",
      "sayfa" : "22:49",
      "tags" : "bol2",
      "url" : "bolum2 "
    }
  }, */

  const association = database().ref('KitapHerBolum');

  const KitapHerBolum = association.child(kitapRef.key);

  KitapKeyHerBolum.forEach(bolumKey => {
    const KitapBolumAssociation = KitapHerBolum.child(bolumKey);

    KitapBolumAssociation.set(true);
  });

  
/*      "KitapHerBolum" : {
    "-KpA-g0NCmo74lPHskwD" : {
      "-KpA-g0StnvQUIqAW0nM" : true,
      "-KpA-g0U-Hcv_tkctKAY" : true
    },
    "-KpA-g0VehCkbR7RJkqb" : {
      "-KpA-g0VehCkbR7RJkqc" : true,
      "-KpA-g0W874MpcNB-NSk" : true
    }
  }, */

});









