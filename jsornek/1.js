const kisi = [
    { ad: "ali", soyad: "kara", yas: 23 },
    { ad: "veli", soyad: "dere", yas: 21 },
    { ad: "cem", soyad: "ek", yas: 53 },
];

const soyadbir=kisi.map( (x)=>{
    x.ad="ali"
 return   console.log(`ad:${x.ad} soyad:${x.soyad}`)
})
 

