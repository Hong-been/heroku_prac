const mongoose = require("mongoose");

// Define Schemes
const todoSchema = new mongoose.Schema(
	{
		todoid: {type: Number, required: true, unique: true},
		content: {type: String, required: true},
		completed: {type: String, default: false},
	},
	{
		timestamps: true,
	}
);

todoSchema.statics.create = function (payload) {
	// this === Model
	const todo = new this(payload);
	// return Promise
	return todo.save();
};

// Find All
todoSchema.statics.findAll = function () {
	// return promise
	// V4부터 exec() 필요없음
	return this.find({});
};

// Find One by todoid
todoSchema.statics.findOneByTodoid = function (todoid) {
	return this.findOne({todoid});
};

// Update by todoid
todoSchema.statics.updateByTodoid = function (todoid, payload) {
	// { new: true }: return the modified document rather than the original. defaults to false
	return this.findOneAndUpdate({todoid}, payload, {new: true});
};

// Delete by todoid
todoSchema.statics.deleteByTodoid = function (todoid) {
	return this.remove({todoid});
};

// Create Model & Export
// 실제 collection의 이름은 ‘Todos’로 자동 변환되어 사용된다.
// collection의 이름을 명시적으로 지정하고자 할 때는 schema 생성시 option으로 { collection: 'my-collection-name' } 지정한다.
module.exports = mongoose.model("Todo", todoSchema);
