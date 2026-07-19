// Importing modules
import OrganizationDao from "../../../shared/dao/organization.dao.js";
import EmployeeDao from "../../../shared/dao/employee.dao.js";
import RoleDao from "../../../shared/dao/role.dao.js";
import PermissionDao from "../../../shared/dao/permission.dao.js";
import RolePermissionDao from "../../../shared/dao/rolePermission.dao.js";
import RolePermission from "../../../shared/models/rolePermission.model.js";
import EmployeeRoleDao from "../../../shared/dao/employeeRole.dao.js";
import UserDao from "../../../shared/dao/user.dao.js";
import SessionDao from "../../../shared/dao/session.dao.js";
import AccountDao from "../../../shared/dao/account.dao.js";

import createSession from "../../../shared/utils/createSession.util.js";

import Created from "../../../shared/responses/Created.response.js";
import Ok from "../../../shared/responses/Ok.response.js";

import Conflict from "../../../shared/errors/Conflict.error.js";
import NotFound from "../../../shared/errors/NotFound.error.js";
import Forbidden from "../../../shared/errors/Forbidden.error.js";

// class to handle organization operations
class OrganizationController {

    constructor() {

        // initializing the organization dao
        this.orgDao = new OrganizationDao();

        // initializing the employee dao
        this.employeeDao = new EmployeeDao();

        // initializing the role dao
        this.roleDao = new RoleDao();

        // initializing the permission dao
        this.permissionDao = new PermissionDao();

        // initializing the role permission dao
        this.rolePermissionDao = new RolePermissionDao();

        // initializing the employee role dao
        this.employeeRoleDao = new EmployeeRoleDao();

        // initializing the user dao
        this.userDao = new UserDao();

        // initializing the session dao
        this.sessionDao = new SessionDao();

        // initializing the account dao
        this.accountDao = new AccountDao();

    }

    // onboard a new organization
    onboard = async (req, res) => {

        const { name, code, address, logo, businessType, industry, phone, firstName, lastName } = req.body;
        const userId = req.user._id;

        // if user already has an organization, skip creation and just return session
        if (req.user.organizationId) {
            const user = await this.userDao.findUserById(userId);
            const { sanitizedUser, accessToken } = await createSession(user, res, this.sessionDao);
            return Created(res, "Organization already exists", { user: sanitizedUser, organization: req.user.organizationId, accessToken });
        }

        // checking if organization code already exists for THIS user
        const existingOrg = await this.orgDao.findOne({ code: code.toUpperCase() });

        if (existingOrg) {

            throw new Conflict("Organization code already exists");

        }

        // creating organization using the organization dao
        const organization = await this.orgDao.create({
            name,
            code: code.toUpperCase(),
            address,
            logo,
            businessType,
            industry,
            phone,
            status: "active"
        });

        const orgId = organization._id;

        // seeding all default data in parallel using insertMany for bulk operations
        const [
            createdRoles
        ] = await Promise.all([
            // bulk create roles
            this.roleDao.Model.insertMany([
                { organizationId: orgId, name: "Administrator", code: "ADMIN", description: "Full system administrator access" },
                { organizationId: orgId, name: "Accountant", code: "ACCOUNTANT", description: "Financial transactions and bookkeeping access" },
                { organizationId: orgId, name: "Employee", code: "EMPLOYEE", description: "Basic employee access" }
            ]),
            // bulk create default accounts
            process.env.NODE_ENV !== "test" ? this.accountDao.Model.insertMany([
                { organizationId: orgId, name: "Cash on Hand", code: "CASH", type: "asset", status: "active" },
                { organizationId: orgId, name: "Bank Account", code: "BANK", type: "asset", status: "active" },
                { organizationId: orgId, name: "Accounts Receivable", code: "ACCOUNTS_RECEIVABLE", type: "asset", status: "active" },
                { organizationId: orgId, name: "Accounts Payable", code: "ACCOUNTS_PAYABLE", type: "liability", status: "active" },
                { organizationId: orgId, name: "Tax Payable", code: "TAX_PAYABLE", type: "liability", status: "active" },
                { organizationId: orgId, name: "Owner Capital", code: "OWNER_CAPITAL", type: "equity", status: "active" },
                { organizationId: orgId, name: "Sales Revenue", code: "SALES_REVENUE", type: "revenue", status: "active" },
                { organizationId: orgId, name: "Operating Expenses", code: "OPERATING_EXPENSES", type: "expense", status: "active" }
            ]) : Promise.resolve()
        ]);

        // map role codes to their _id for permission binding
        const roleMap = {};
        createdRoles.forEach((r) => { roleMap[r.code] = r._id; });

        // fetch all permissions once
        const allPermissions = await this.permissionDao.find({});

        // build admin permissions (all)
        const adminPerms = allPermissions.map((p) => ({ roleId: roleMap["ADMIN"], permissionId: p._id }));

        // build accountant permissions
        const accountantCodes = new Set([
            "ACCOUNTS.VIEW", "ACCOUNTS.CREATE", "ACCOUNTS.UPDATE",
            "BANKACCOUNTS.VIEW", "BANKACCOUNTS.CREATE", "BANKACCOUNTS.UPDATE",
            "BANKTRANSACTIONS.VIEW", "BANKTRANSACTIONS.CREATE",
            "BUDGETS.VIEW", "BUDGETS.CREATE", "BUDGETS.UPDATE",
            "COSTCENTERS.VIEW", "COSTCENTERS.CREATE",
            "CURRENCIES.VIEW", "EXCHANGERATES.VIEW",
            "CUSTOMERS.VIEW", "VENDORS.VIEW",
            "EXPENSES.VIEW", "EXPENSES.CREATE", "EXPENSES.UPDATE",
            "INCOMES.VIEW", "INCOMES.CREATE", "INCOMES.UPDATE",
            "FINANCIALYEARS.VIEW",
            "INVOICES.VIEW", "INVOICES.CREATE", "INVOICES.UPDATE",
            "PAYMENTS.VIEW", "PAYMENTS.CREATE", "PAYMENTS.UPDATE",
            "RECEIPTS.VIEW", "RECEIPTS.CREATE", "RECEIPTS.UPDATE",
            "JOURNALENTRIES.VIEW", "JOURNALENTRIES.CREATE", "JOURNALENTRIES.UPDATE",
            "LEDGER.VIEW",
            "OPENINGBALANCES.VIEW", "OPENINGBALANCES.CREATE",
            "REPORTS.VIEW",
            "VOUCHERTYPES.VIEW", "VOUCHERTYPES.CREATE",
            "TAXES.VIEW"
        ]);
        const accountantPerms = allPermissions
            .filter((p) => accountantCodes.has(p.code))
            .map((p) => ({ roleId: roleMap["ACCOUNTANT"], permissionId: p._id }));

        // build employee permissions
        const employeeCodes = new Set(["INVOICES.VIEW", "CUSTOMERS.VIEW", "VENDORS.VIEW", "PRODUCTS.VIEW"]);
        const employeePerms = allPermissions
            .filter((p) => employeeCodes.has(p.code))
            .map((p) => ({ roleId: roleMap["EMPLOYEE"], permissionId: p._id }));

        // bulk insert all role-permissions + create employee + assign role in parallel
        const [
            employee
        ] = await Promise.all([
            // create employee profile
            this.employeeDao.create({
                userId,
                organizationId: orgId,
                employeeCode: "EMP-001",
                firstName,
                lastName,
                email: req.user.email,
                status: "active"
            }),
            // bulk insert all role-permissions at once
            RolePermission.insertMany([...adminPerms, ...accountantPerms, ...employeePerms])
        ]);

        // assign ADMIN role to employee
        await this.employeeRoleDao.create({ employeeId: employee._id, roleId: roleMap["ADMIN"] });

        // re-generate session with full organization context
        const user = await this.userDao.findUserById(userId);
        const { sanitizedUser, accessToken } = await createSession(user, res, this.sessionDao);

        // returning the onboarded organization with session data
        return Created(res, "Organization onboarded successfully", {
            user: sanitizedUser,
            organization,
            employee,
            accessToken
        });

    }

    // get organization details
    getDetails = async (req, res) => {

        const organizationId = req.user.organizationId;

        // verifying user is associated with an organization
        if (!organizationId) {

            throw new Forbidden("User is not associated with any organization.");

        }

        // finding organization using organization dao
        const organization = await this.orgDao.findById(organizationId);

        if (!organization) {

            throw new NotFound("Organization not found.");

        }

        // returning the organization details
        return Ok(res, "Organization details retrieved successfully", organization);

    }

}

export default OrganizationController;
