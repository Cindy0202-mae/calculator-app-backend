const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.calculate = async (req, res) => {
  try {
    const { operation, operand1, operand2 } = req.body;
    // Calculation logic
    const num1 = parseFloat(operand1);
    const num2 = operand2 ? parseFloat(operand2) : 0;

    switch (operation) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/':
        if (num2 === 0) {
          return res.status(400).json({ error: 'Division by zero is not allowed' });
        }
        result = num1 / num2;
        break;
    }

    if (isNaN(result)) throw new Error('Invalid calculation');

    //Save to database
    const calculation = await prisma.calculation.create({
      data: {
        operation,
        operand1: operand1.toString(),
        operand2: operand2?.toString(),
        result: result.toString(),
      }
    });

    res.json(calculation);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await prisma.calculation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

exports.deleteHistoryItem = async (req, res) => {
  try {
    await prisma.calculation.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete history' });
  }
};
