// nao nao
// Existe um type para o Express meio Global!
// esse arquivo vai "anexar" um item a mais no "Request"
declare namespace Express {
  interface Request {
    user: {
      uuid: string,
      name?: string,
    },
  }
}
