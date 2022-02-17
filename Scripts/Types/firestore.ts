export interface docReturn {

    data(): any,
    id: string,
    exists: boolean,
}

export interface collectionReturn {

    docs: object,
    exists: boolean,
    metadata: string,
    query: string,
    size: number,
    forEach(index),
}

export interface firebaseDb {
    collection(collectionPath: string): {

      doc(docPath: string): {

        get():Promise<docReturn>,
        set(data),
        delete(),
      },

      get():Promise<collectionReturn>
      add(data),
      where(arg1:any, operand:string, arg2:any),
      orderBy(arg1:string, order:string)
    }
}

