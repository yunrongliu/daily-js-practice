// 泛型
// function identity<T> (arg: Array<T>) : Array<T> {
//   console.log(arg.length)
//   return arg
// }

// let output = identity([1,2])

// console.log(output)

// 泛型接口
// interface genericInterface<T> {
//   (arg: T) : T
// }

// function identity<T> (arg: T) : T {

//   return arg
// }

// let myInterfaceFunc : genericInterface<number> = identity

// let res = myInterfaceFunc(1)

// console.log(res)

// 泛型约束
// interface lengthwise {
//   length: number
// }

// function loggingGeneric <T extends lengthwise> (arg: T) : T {

//   return arg
// }

// console.log(  loggingGeneric({length: 1})  )
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  numLegs: 6
  keeper: BeeKeeper;
}

class Lion extends Animal {
  numLegs: 4
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!