import { jest } from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import request from "supertest";

// Mock sending mail
jest.unstable_mockModule("../../../shared/utils/sendMail.util.js", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const { default: createApp } = await import("../../../app.js");
const { default: User } = await import("../../../shared/models/user.model.js");
const { default: Organization } = await import("../../../shared/models/organization.model.js");
const { default: Employee } = await import("../../../shared/models/employee.model.js");
const { default: Permission } = await import("../../../shared/models/permission.model.js");
const { default: Vendor } = await import("../../../shared/models/vendor.model.js");
const { default: Product } = await import("../../../shared/models/product.model.js");
const { default: Tax } = await import("../../../shared/models/tax.model.js");
const { default: Purchase } = await import("../../../shared/models/purchase.model.js");

let mongoServer;
let app;
let orgId;
let adminUserToken;
let userWithoutPermToken;

beforeAll(async () => {
    // MongoMemoryReplSet replica set is required for transactions to work
    mongoServer = await MongoMemoryReplSet.create({
        replSet: {
            storageEngine: "wiredTiger"
        }
    });
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    app = createApp();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }

    // Seed permission
    await Permission.create({
        name: "Create Purchases",
        code: "PURCHASES.CREATE",
        module: "purchases"
    });

    // Create Admin User
    const adminUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        isVerified: true
    });

    const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: "admin@example.com", password: "password123" });

    const token = loginRes.body.data.accessToken;

    const onboardRes = await request(app)
        .post("/api/organization")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Test Corp",
            code: "TCORP",
            firstName: "Admin",
            lastName: "User"
        });

    adminUserToken = onboardRes.body.data.accessToken;
    orgId = onboardRes.body.data.organization._id;

    // Create normal user without permissions
    const normalUser = await User.create({
        name: "Normal User",
        email: "normal@example.com",
        password: "password123",
        isVerified: true
    });

    await Employee.create({
        userId: normalUser._id,
        organizationId: orgId,
        employeeCode: "EMP-002",
        firstName: "Normal",
        lastName: "User",
        email: "normal@example.com",
        status: "active"
    });

    const normalLogin = await request(app)
        .post("/api/auth/login")
        .send({ email: "normal@example.com", password: "password123" });

    userWithoutPermToken = normalLogin.body.data.accessToken;
});

describe("Purchases Management Integration Tests", () => {
    let vendor, product, tax;

    beforeEach(async () => {
        vendor = await Vendor.create({ name: "Supplier Inc", organizationId: orgId });
        product = await Product.create({ name: "Widget A", sku: "WDG-A", organizationId: orgId });
        tax = await Tax.create({ name: "GST 10%", rate: 10, code: "GST10", organizationId: orgId });
    });

    describe("POST /api/purchases", () => {
        it("should successfully record a purchase vendor bill with calculations", async () => {
            const res = await request(app)
                .post("/api/purchases")
                .set("Authorization", `Bearer ${adminUserToken}`)
                .send({
                    vendorId: vendor._id,
                    purchaseNumber: "PB-2026-001",
                    purchaseDate: "2026-07-17",
                    items: [
                        {
                            productId: product._id,
                            quantity: 5,
                            unitPrice: 200,
                            taxId: tax._id
                        }
                    ]
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.purchaseNumber).toBe("PB-2026-001");
            expect(res.body.data.status).toBe("billed");
            // calculations: subTotal = 5 * 200 = 1000
            // tax = 1000 * 10% = 100
            // grandTotal = 1100
            expect(res.body.data.subTotal).toBe(1000);
            expect(res.body.data.taxTotal).toBe(100);
            expect(res.body.data.grandTotal).toBe(1100);
            expect(res.body.data.organizationId.toString()).toBe(orgId.toString());
        });

        it("should return conflict if purchase number already exists in same organization", async () => {
            await Purchase.create({
                vendorId: vendor._id,
                purchaseNumber: "PB-2026-001",
                purchaseDate: new Date(),
                subTotal: 100,
                taxTotal: 10,
                grandTotal: 110,
                organizationId: orgId
            });

            const res = await request(app)
                .post("/api/purchases")
                .set("Authorization", `Bearer ${adminUserToken}`)
                .send({
                    vendorId: vendor._id,
                    purchaseNumber: "pb-2026-001", // case-insensitive check
                    purchaseDate: "2026-07-17",
                    items: [
                        {
                            productId: product._id,
                            quantity: 5,
                            unitPrice: 200
                        }
                    ]
                });

            expect(res.status).toBe(409);
        });

        it("should return forbidden if user does not have PURCHASES.CREATE permission", async () => {
            const res = await request(app)
                .post("/api/purchases")
                .set("Authorization", `Bearer ${userWithoutPermToken}`)
                .send({
                    vendorId: vendor._id,
                    purchaseNumber: "PB-2026-001",
                    purchaseDate: "2026-07-17",
                    items: [
                        {
                            productId: product._id,
                            quantity: 5,
                            unitPrice: 200
                        }
                    ]
                });

            expect(res.status).toBe(403);
        });
    });

});
