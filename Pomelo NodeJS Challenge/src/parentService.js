var fs = require('fs');
const ParentData = require('./models/parent');

//Function is to read the data from input.txt and convert the JSON data to array and map based on parent id.
exports.processChildMapping = async function (pageNumber) {
    try {
        let fileData = fs.readFileSync('./input.txt', 'utf8');
        let parentData = new Object();
        let pageLimit = process.env.PageLimit;
        if (fileData) {
            let parents = [];
            fileData = Object.values(JSON.parse(fileData));
            let level = fileData.length;

            for (let index = 0; index < level; index++) {
                const element = fileData[index];
                for (let l = 0; l < element.length; l++) {
                    const e = new ParentData(element[l]);
                    parents.push(e);
                }
            }
            parentData.pageLimit = pageLimit;
            parentData.pageNumber = pageNumber;
            parentData.totalRecords = parents.length;

            parents = this.PaginationFunction(pageLimit, pageNumber, parents);
            parentData.parents = parents;

            return parentData;
        } else {
            throw "File Not Found";
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.PaginationFunction = function (page_limit, page_no, dataList) {
    let skipSize = page_limit * (page_no - 1)
    // Apply Pagination
    if (page_limit > dataList.length) {
        page_limit = dataList.length
    }
    dataList = dataList.splice(skipSize, page_limit)
    return dataList;
}