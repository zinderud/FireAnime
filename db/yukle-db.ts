import {database, initializeApp} from "firebase";
import {environment} from "./../src/environments/environment";
import {dbData} from "./db-data";


console.log(' Firebase database yukleniyor ... ');

initializeApp(environment.firebaseConfig);


const kitaplarRef = database().ref('kitaplar');
const bolumlerRef = database().ref('bolumler');



dbData.kitaplar.forEach( kitap => {

  console.log('add kitap', kitap.url);

  const kitapRef = kitaplarRef.push({
      url: kitap.url,
      yazar: kitap.yazar,
      acıklama: kitap.acıklama 
  });

  let KitapKeyHerBolum = [];

  kitap.bolumler.forEach((bolum:any) =>  {

    console.log('adding bolum ', bolum.url);

    KitapKeyHerBolum.push(bolumlerRef.push({
        sayfa: bolum.sayfa,
        tags: bolum.tags,
        bolum_acıklama: bolum.bolum_acıklama, 
      }).key);

  });


  const association = database().ref('KitapHerBolum');

  const KitapHerBolum = association.child(kitapRef.key);

  KitapKeyHerBolum.forEach(bolumKey => {
    const KitapBolumAssociation = KitapHerBolum.child(bolumKey);

    KitapBolumAssociation.set(true);
  });


});









