  //reference only

  // const tasks = db.collection('tasks')

  // db.collection('tasks').insertOne({
  //   name: "Ben",
  //   age: 26
  // }, (error, result) => {
  //   if (error) {
  //     return console.log("User creation failed.")
  //   }

  //   console.log(result)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     title: "laundry",
  //     completed: false
  //   },{
  //     title: "running",
  //     completed: false
  //   },{
  //     title: "coding",
  //     completed: false
  //   }]).then((result) => {
  //     console.log(result)
  //   }).catch((error) => {
  //     console.log(error)
  //   })

  // tasks.findOne(
  //   {
  //     title: "laundry",
  //     completed: true
  //   }, (error, result) => {
  //   console.log(error ? error : result)
  // });

  // tasks.find({completed: false}).toArray((error, result) => {
  //   console.log(error? error : result)
  // })

  // tasks.updateOne({
  //   title: "poop",
  // } , {
  //   $set: {
  //     title: "more testyboi",
  //     completed: true,
  //     other: "stinky"
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // tasks.deleteOne({
  //   completed: true
  // }, (error, result) => {
  //   if (error) {
  //     return console.log("delete failed")
  //   }

  //   console.log(result)
  // })
