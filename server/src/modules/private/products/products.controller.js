// Importing modules
import ProductDao from "../../../shared/dao/product.dao.js";
import CategoryDao from "../../../shared/dao/category.dao.js";
import UnitDao from "../../../shared/dao/unit.dao.js";
import Conflict from "../../../shared/errors/Conflict.error.js";
import NotFound from "../../../shared/errors/NotFound.error.js";
import Created from "../../../shared/responses/Created.response.js";

// class to handle product operations
class ProductsController {

    constructor() {

        // initializing the daos
        this.productDao = new ProductDao();
        this.categoryDao = new CategoryDao();
        this.unitDao = new UnitDao();

    }

    // create a new product
    createProduct = async (req, res) => {

        const { name, sku, description, categoryId, unitId, price, cost, status } = req.body;
        const organizationId = req.user.organizationId;

        // verifying SKU is unique within organization context
        const existingProduct = await this.productDao.findOne({
            organizationId,
            sku,
            isDeleted: {
                $ne: true
            }
        });

        if (existingProduct) {

            throw new Conflict("Product SKU already exists in your organization.");

        }

        // validating categoryId exists in organization if provided
        if (categoryId) {

            const category = await this.categoryDao.findOne({
                _id: categoryId,
                organizationId
            });

            if (!category) {

                throw new NotFound("Category not found in your organization.");

            }

        }

        // validating unitId exists in organization if provided
        if (unitId) {

            const unit = await this.unitDao.findOne({
                _id: unitId,
                organizationId
            });

            if (!unit) {

                throw new NotFound("Unit not found in your organization.");

            }

        }

        // creating the product using product dao
        const product = await this.productDao.create({
            organizationId,
            name,
            sku,
            description: description || "",
            categoryId: categoryId || undefined,
            unitId: unitId || undefined,
            price: price || 0,
            cost: cost || 0,
            status: status || "active",
            isDeleted: false
        });

        return Created(res, "Product created successfully", product);

    }

    // list products with pagination, sorting, and search
    listProducts = async (req, res) => {

        const organizationId = req.user.organizationId;

        // formulating product filter based on organization isolation and excluding soft deleted products
        const filter = {
            organizationId,
            isDeleted: {
                $ne: true
            }
        };

        // checking if search query is provided
        if (req.query.search) {

            const searchRegex = {
                $regex: req.query.search,
                $options: "i"
            };

            filter.$or = [
                { name: searchRegex },
                { sku: searchRegex }
            ];

        }

        // parsing pagination and sorting parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

        // counting total records matching filter
        const total = await this.productDao.Model.countDocuments(filter);

        // fetching products using product dao
        const products = await this.productDao.find(filter, {
            sort: { [sortBy]: sortOrder },
            limit,
            skip
        });

        // constructing pagination metadata
        const pages = Math.ceil(total / limit);

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Products retrieved successfully",
            data: products,
            pagination: {
                page,
                limit,
                total,
                pages
            }
        });

    }

}

export default ProductsController;
