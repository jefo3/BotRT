function evaluate (text: string) : boolean{
  const patterns = /[#+]|onlyfans/i
  const regexp = new RegExp(patterns);

  return regexp.test(text)
}

export default {
  evaluate
};
