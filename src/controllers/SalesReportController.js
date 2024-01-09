const Sales = require('../models/SalesModel'); // Import your Mongoose model


exports.totalRevenue = async(req,res)=>{
	try {
    const totalRevenue = await Sales.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } } } }
    ]);
    res.json({ totalRevenue: totalRevenue[0].totalRevenue });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.quantityByProduct = async(req,res)=>{
	try {
    const quantityByProduct = await Sales.aggregate([
      { $group: { _id: '$product', totalQuantity: { $sum: '$quantity' } } }
    ]);
    res.json(quantityByProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.topProducts = async(req,res)=>{
	try {
    const topProducts = await Sales.aggregate([
      { $group: { _id: '$product', totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } } } },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 }
    ]);
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.averagePrice = async(req,res)=>{
	try {
    const averagePrice = await Sales.aggregate([
      { $group: { _id: null, averagePrice: { $avg: '$price' } } }
    ]);
    res.json({ averagePrice: averagePrice[0].averagePrice });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.revenueByMonth = async(req,res)=>{
	try {
    const revenueByMonth = await Sales.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }
        }
      }
    ]);
    res.json(revenueByMonth);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.highestQuantitySold = async(req,res)=>{
	try {
    const highestQuantitySold = await Sales.findOne({}, {}, { sort: { quantity: -1 } });
    res.json(highestQuantitySold);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.departmentSalaryExpense = async(req,res)=>{
	try {
    const departmentSalaryExpense = await Sales.aggregate([
      { $group: { _id: '$department', totalSalaryExpense: { $sum: '$salary' } } }
    ]);
    res.json(departmentSalaryExpense);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}