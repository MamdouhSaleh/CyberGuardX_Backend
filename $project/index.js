import mongoose from 'mongoose';
const { Schema } = mongoose;

await mongoose.connect('mongodb://localhost:27017/agg-demo');

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  salary: Number,
  joinedAt: Date,
  roles: [String]
});

const Employee = mongoose.model('Employee', employeeSchema);
await Employee.deleteMany({}); 
await Employee.create({
  firstName: 'john',
  lastName: 'doe',
  age: 51,
  salary: 5000,
  joinedAt: new Date('2020-06-15'),
  roles: ['developer', 'team lead', 'mentor']
});
await Employee.create({
  firstName: 'jane',
  lastName: 'doe',
  age: 35,
  salary: 6000,
  joinedAt: new Date('2021-01-20'),
  roles: ['developer', 'team lead']
});

const result = await Employee.aggregate([
  {
    $project: {
      _id: 0,                           
      fullName: {                      
        $concat: [
          { $toUpper: "$firstName" },
          " ",
          { $toUpper: "$lastName" }
        ]
      },
      age: 1,                           
      salaryWithBonus: {               
        $add: ["$salary", { $multiply: ["$salary", 0.1] }]
      },
      netSalary: {                     
        $subtract: ["$salary", { $divide: ["$salary", 10] }]
      },
      isSenior: {                      
        $gte: ["$age", 50]
      },
      roleAtSecondPosition: {          
        $arrayElemAt: ["$roles", 1]
      },
      joinedYearMonth: {               
        $dateToString: { format: "%Y-%m", date: "$joinedAt" }
      },
      experienceLevel: {               
        $cond: {
          if: { $lte: ["$age", 30] },
          then: "Junior",
          else: {
            $cond: {
              if: { $lte: ["$age", 50] },
              then: "Mid",
              else: "Senior"
            }
          }
        }
      }
    }
  }
]);

console.log(JSON.stringify(result, null, 2));

