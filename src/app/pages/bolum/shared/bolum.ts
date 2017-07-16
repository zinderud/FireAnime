export class Bolum {
  constructor(
    public $key: string,
    public bolum_acıklama: string,
    public kitapId: string,
    public sayfa: string,
    public tags: string,
    public url: string
  ) {}

  static fromJson({ $key, bolum_acıklama, kitapId, sayfa, tags, url }): Bolum {
    return new Bolum($key, bolum_acıklama, kitapId, sayfa, tags, url);
  }
  static fromJsonList(array): Bolum[] {
    return array.map(Bolum.fromJson);
  }
}

/*   "bolum_acıklama" : "mesnevi bolum1 acıklama",
      "kitapId" : "-KpA-g0VehCkbR7RJkqb",
      "sayfa" : "2:49",
      "tags" : "bol1",
      "url" : "bolum1" */
