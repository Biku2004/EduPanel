const express = require('express');
const { admin } = require('../config/firebase');
const { authenticate, restrictTo } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticate, restrictTo('Staff'), async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('students').get();
    const students = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.post('/', authenticate, restrictTo('Staff'), async (req, res) => {
  const { name, email, course, enrollmentYear } = req.body;
  if (!name || !email || !course || !enrollmentYear) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const docRef = await admin.firestore().collection('students').add({
      name,
      email,
      course,
      enrollmentYear,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ id: docRef.id, name, email, course, enrollmentYear });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

router.put('/:id', authenticate, restrictTo('Staff'), async (req, res) => {
  const { id } = req.params;
  const { name, email, course, enrollmentYear } = req.body;
  if (!name || !email || !course || !enrollmentYear) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const docRef = admin.firestore().collection('students').doc(id);
    await docRef.update({ name, email, course, enrollmentYear, updatedAt: new Date().toISOString() });
    res.status(200).json({ id, name, email, course, enrollmentYear });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

router.delete('/:id', authenticate, restrictTo('Staff'), async (req, res) => {
  const { id } = req.params;
  try {
    await admin.firestore().collection('students').doc(id).delete();
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

module.exports = router;