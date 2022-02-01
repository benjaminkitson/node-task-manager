// function doCallback(name, func) {
//   setTimeout(() => {
//     if (name !== "Ben") {
//       return func("Incorrect name!")
//     }

//     func(undefined, "Hello Ben!")
//   }, 1000)
// }

// doCallback("Ben", (error, result) => {
//   console.log(error ? error : result)
// })


function doubleTwoOrThree(x) {
  const doPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x === 2 || x === 3) {
        resolve(2 * x)
      }
      reject("Gots to be 2 or 3")
    }, 1000)
  })

  return doPromise
}

function halfFour(y) {
  const doMorePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (y === 4) {
        resolve(y / 2)
      }
      reject("Should have been 4")
    }, 1000)
  })

  return doMorePromise
}

doubleTwoOrThree(1)
  .then((result) => {
    console.log(result)
    return halfFour(result)
  }).then((result2) => {
    console.log(result2)
  }).catch((error) => {
    console.log(error)
  })
