import mongoose from "mongoose";

const url = "mongodb://localhost:27017/mongoose";
await mongoose.connect(url);
console.log("Connected to MongoDB");

const employeeSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  department: String
});

const Employee = mongoose.model("Employee", employeeSchema);

const employees = [
  { name: "Alice", skills: ["JavaScript", "React"], department: "Engineering" },
  { name: "Charlie", skills: ["Java", "Spring"], department: "Engineering" },
  { name: "David", department: "Design" },
];

await Employee.deleteMany({});
await Employee.insertMany(employees);

const result = await Employee.aggregate([
  {
    $unwind: {
      path: "$skills",
      includeArrayIndex: "skillIndex",
      preserveNullAndEmptyArrays: true
    }
  }
]);

console.log(result);