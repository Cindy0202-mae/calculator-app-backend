const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add input validation middleware
exports.validateCalculation = (req, res, next) => {
  const { operation, operand1, operand2 } = req.body;

  if (!['+', '-', '*', '/'].includes(operation)) {
    return res.status(400).json({ error: 'Invalid operation' });
  }

  if (isNaN(Number(operand1))) {
    return res.status(400).json({ error: 'operand1 must be a number' });
  }

  if (isNaN(Number(operand2))) {
    return res.status(400).json({ error: 'operand2 must be a number' });
  }

  // Convert to numbers
  req.body.operand1 = Number(operand1);
  req.body.operand2 = Number(operand2);

  next();
};

exports.calculate = async (req, res) => {
  try {
    const { operation, operand1, operand2 } = req.body;
     // Validate input types
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
      return res.status(400).json({
        error: 'Operands must be numbers',
        received: { operand1, operand2 },
        result: null
      });
    }

    let result;
    switch (operation) {
      case '+': result = operand1 + operand2; break;
      case '-': result = operand1 - operand2; break;
      case '*': result = operand1 * operand2; break;
      case '/':
        if (operand2 === 0) {
          return res.status(400).json({
            error: 'Division by zero',
            result: 'Undefined'
          });
        }
        result = operand1 / operand2;
        break;
      default:
        return res.status(400).json({
          error: `Invalid operation: ${operation}`,
          result: null
        });
    }

    // Save to database
    const calculation = await prisma.calculation.create({
      data: {
        operation,
        operand1: operand1.toString(),
        operand2: operand2.toString(),
        result: result.toString(),
      }
    });

    res.json({
      success: true,
      result: calculation.result,
      calculation
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      result: 'Error'
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
