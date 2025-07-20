import mongoose from 'mongoose';

const uri = 'mongodb://localhost:27017/lookup-example';
await mongoose.connect(uri);

const courseSchema = new mongoose.Schema({
    title: String
});
const studentSchema = new mongoose.Schema({
    name: String,
    courseIds: [mongoose.Schema.Types.ObjectId]
});

const Course = mongoose.model('Course', courseSchema);
const Student = mongoose.model('Student', studentSchema);

await Course.deleteMany();
await Student.deleteMany();

const course1 = await Course.create({ title: 'Math' });
const course2 = await Course.create({ title: 'Physics' });
const course3 = await Course.create({ title: 'History' });

await Student.insertMany([
    { name: 'Alice', courseIds: [course1._id, course2._id] },
    { name: 'Bob', courseIds: [course2._id] },
    { name: 'Charlie', courseIds: [] }
]);

const result = await Student.aggregate([
    {

        $lookup: {
            from: 'courses',
            localField: 'courseIds',
            foreignField: '_id',
            as: 'enrolledCourses'
        },

    },
    {
        $project: {
            name: 1,
            enrolledCourses: 1
        }
    }
]);

console.log(JSON.stringify(result, null, 2));
await mongoose.disconnect();
