namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }
  const letterReg = /^[A-Za-z]+\s\w+$/
  const numberReg = /^[0-9]+$/

  export class LetterValidator implements StringValidator {
    isAcceptable(s: string) {
      return letterReg.test(s)
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberReg.test(s)
    }
  }
}

const str = ['Hello World', '911', '54101']

let validates: { [s: string]: Validation.StringValidator } = {}
validates['Zip code'] = new Validation.ZipCodeValidator()
validates['Letter only'] = new Validation.LetterValidator()

for (let s of str) {
  for (let name in validates) {
    validates[name].isAcceptable(s)
    console.log(
      `"${s}" - ${
        validates[name].isAcceptable(s) ? 'matches' : 'does not match'
      } ${name}`,
    )
  }
}


namespace Shapes {
  export namespace Polygons {
    export class Square {}
    export class Trangle {}
  }
}

import polygons = Shapes.Polygons
let sq = new polygons.Square()