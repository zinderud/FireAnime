 ng build --target=production --environment=prod
npm run  sw


 firebase deploy



/*     ,  "./assets/sass/main.scss",
         "./assets/sass/noscript.scss",
        "styles.scss" */



| method   | purpose            |
| ---------|--------------------|
| `orderByChild` | Specify a child to order by. |
| `orderByKey` | Boolean to order by Firebase Database keys. |
| `orderByValue` | Specify a value to order by. |
| ~~`orderByPriority`~~<sup>1</sup> | Boolean to order by Firebase Database priority.|
| `equalTo`<sup>2</sup> | Limit list to items that contain certain value. |
| `limitToFirst` | Sets the maximum number of items to return from the beginning of the ordered list of results. |
| `limitToLast` | Sets the maximum number of items to return from the end of the ordered list of results. |
| `startAt`<sup>2</sup> | Return items greater than or equal to the specified key or value, depending on the order-by method chosen. |