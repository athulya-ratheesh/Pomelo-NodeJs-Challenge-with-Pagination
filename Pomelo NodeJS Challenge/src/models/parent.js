//map the parent data to the model
function ParentData(data) {       // Accept input data in the constructor
    this.Id = data.id;
    this.Title = data.title;
    this.Level = data.level;
    this.Children = data.children;
    this.ParentId = data.parent_id;
}

module.exports = ParentData; 
