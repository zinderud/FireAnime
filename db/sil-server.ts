
import {environment} from "./../src/environments/environment";
import {initializeApp, auth,database} from 'firebase';
var Queue = require('firebase-queue');


console.log('Running  server ...');

initializeApp(environment.firebaseConfig);

auth()
    .signInWithEmailAndPassword('test@test.com', 'test@test.com')
    .then(runConsumer)
    .catch(onError);

function onError(err) {
    console.error("Could not login", err);
    process.exit();
}


function runConsumer() {

    console.log("Running consumer ...");

    const bolumlerRef = database().ref("bolumler");
    const KitapHerBolum = database().ref("KitapHerBolum");

    const queueRef = database().ref('queue');


    const queue = new Queue(queueRef, function(data, progress, resolve, reject) {

        console.log('received delete request ...',data);

        const deleteBolumPromise = bolumlerRef.child(data.bolumId).remove();

        const deleteKitapHerBolumPromise =
            KitapHerBolum.child(`${data.kitapId}/${data.bolumId}`).remove();

        Promise.all([deleteBolumPromise, deleteKitapHerBolumPromise])
            .then(
                () => {
                    console.log("bolum deleted");
                    resolve();
                }
            )
            .catch(() => {
            console.log("bolum deletion in error");
            reject();
        });


    });


}














