const express = require('express');
const { admin } = require('../config/firebase');
const { authenticate, restrictTo } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticate, restrictTo('Staff'), async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('students').get();
    const students = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const analytics = {
      totalStudents: students.length,
      courses: [...new Set(students.map((s) => s.course))].length,
    };
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;