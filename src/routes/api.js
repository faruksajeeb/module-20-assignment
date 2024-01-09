const express = require('express');
const router = express.Router();
const SalesReportController = require("../controllers/SalesReportController");

router.get('sales/total-revenue',SalesReportController.totalRevenue)
router.get('sales/quantity-by-product',SalesReportController.quantityByProduct)
router.get('sales/top-products',SalesReportController.topProducts)
router.get('sales/average-price',SalesReportController.averagePrice)
router.get('sales/revenue-by-month',SalesReportController.revenueByMonth)
router.get('sales/highest-quantity-sold',SalesReportController.highestQuantitySold)
router.get('sales/department-salary-expense',SalesReportController.departmentSalaryExpense)

module.exports = router;