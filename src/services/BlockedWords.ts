function evaluate (texto: string){
  const patterns = /[#+]|onlyfans/i
  const regexp = new RegExp(patterns);

  return regexp.test(texto)
}

export default {
  evaluate
};
