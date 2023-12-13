---
series: [Typescript]
type: [ARTICLE, SERIES]
title: Exploring Object-Oriented Programming
publishedAt: 2023-12-16T18:30:00.000Z
tagList: [typescript, javascript, beginners, webdev]
coverImg: "https://hackernoon.imgix.net/images/GyReioOm4SYrQtHDFZYR7Ot7i3w1-xu92ixh.jpeg"
---

Welcome back, coding enthusiasts! In this chapter of our TypeScript saga, we'll delve into the captivating world of Object-Oriented Programming (OOP). Prepare to witness the elegance and power of classes, inheritance, encapsulation, and polymorphism. TypeScript takes OOP to a new level, and we're here to guide you through the journey.

### Classes: Blueprint for Objects

At the heart of OOP lies the concept of classes, the blueprint for creating objects. TypeScript, being a superset of JavaScript, introduces class-based object-oriented programming.

```typescript
class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  makeSound(): void {
    console.log("Some generic sound")
  }
}

const lion = new Animal("Leo")
lion.makeSound() // Output: Some generic sound
```

Here, `Animal` is a class with a constructor and a method. The `lion` object is an instance of the `Animal` class.

### Inheritance: Building on Foundations

Inheritance allows a class to inherit properties and methods from another class. It promotes code reusability and establishes a hierarchy.

```typescript
class Bird extends Animal {
  fly(): void {
    console.log(`${this.name} is flying`)
  }
}

const sparrow = new Bird("Sparrow")
sparrow.makeSound() // Output: Some generic sound
sparrow.fly() // Output: Sparrow is flying
```

The `Bird` class extends the `Animal` class, inheriting its properties and methods. This enables `Bird` to use `makeSound` and introduces a new method, `fly`.

### Encapsulation: Protecting the Core

Encapsulation involves bundling data (properties) and methods that operate on the data into a single unit, i.e., a class. TypeScript supports public, private, and protected access modifiers.

```typescript
class BankAccount {
  private balance: number

  constructor(initialBalance: number) {
    this.balance = initialBalance
  }

  deposit(amount: number): void {
    this.balance += amount
  }

  withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount
    } else {
      console.log("Insufficient funds")
    }
  }

  getBalance(): number {
    return this.balance
  }
}

const account = new BankAccount(1000)
account.deposit(500)
account.withdraw(200)
console.log(account.getBalance()) // Output: 1300
```

In this example, the `balance` property is private, and its value can only be accessed or modified within the `BankAccount` class.

### Polymorphism: Many Forms of Flexibility

Polymorphism allows objects of different types to be treated as objects of a common type. TypeScript supports polymorphism through method overriding.

```typescript
class Shape {
  draw(): void {
    console.log("Drawing a shape")
  }
}

class Circle extends Shape {
  draw(): void {
    console.log("Drawing a circle")
  }
}

class Square extends Shape {
  draw(): void {
    console.log("Drawing a square")
  }
}

function drawShape(shape: Shape): void {
  shape.draw()
}

const circle = new Circle()
const square = new Square()

drawShape(circle) // Output: Drawing a circle
drawShape(square) // Output: Drawing a square
```

The `drawShape` function accepts any object of type `Shape`, allowing it to work with both `Circle` and `Square` objects.

### Conclusion: Mastering the OOP Realm

Congratulations! You've taken a deep dive into Object-Oriented Programming with TypeScript. Classes, inheritance, encapsulation, and polymorphism are now at your fingertips. In the upcoming article, we'll explore advanced TypeScript topics, tying together everything you've learned so far. Get ready for an even more exciting TypeScript adventure! Happy coding!
