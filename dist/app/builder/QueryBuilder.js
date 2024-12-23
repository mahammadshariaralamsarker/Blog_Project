"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // Search functionality
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    // Filters out special fields and applies remaining filters
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);
        // Apply filtering if specific keys are provided
        if (this.query.filter) {
            queryObj.authorId = this.query.filter;
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    // Sorting functionality with sortBy and sortOrder
    sort() {
        var _a, _b;
        const sortBy = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || 'createdAt';
        const sortOrder = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === 'desc' ? '-' : '';
        const sort = `${sortOrder}${sortBy}`; // e.g., '-createdAt'
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    // Select specific fields
    fields() {
        var _a, _b, _c, _d;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '';
        this.modelQuery = (_d = this === null || this === void 0 ? void 0 : this.modelQuery) === null || _d === void 0 ? void 0 : _d.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
