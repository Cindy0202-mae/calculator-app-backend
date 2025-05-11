const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add input validation middleware
exports.validateCalculation = (req, res, next) => {
  const { operation, operand1, operand2 } = req.body;

  if (!['+', '-', '*', '/'].includes(operation)) {
    return res.status(400).json({ error: 'Invalid operation' });
  }

  if (isNaN(parseFloat(operand1))) {
    return res.status(400).json({ error: 'operand1 must be a number' });
  }

  if (operation !== '!' && isNaN(parseFloat(operand2))) {
    return res.status(400).json({ error: 'operand2 must be a number' });
  }

  next();
};

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
        if (num2 === 0) throw new Error('Division by zero');
        result = num1 / num2;
        break;
      default:
        throw new Error('Unsupported operation');
    }

    //Save to database
    const calculation = await prisma.calculation.create({
      data: {
        operation,
        operand1: num1.toString(),
        operand2: num2.toString(),
        result: result.toString(),
      }
    });

    res.json({
      success: true,
      result: calculation.result,
      calculation
    });
  } catch (error) {
    cpnsole.error('Calculation error:', error);
    res.status(400).json({
      error: error.message,
      details: 'Check your input values'
    });
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
